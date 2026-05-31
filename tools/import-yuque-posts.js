#!/usr/bin/env node
'use strict';

const crypto = require('crypto');
const fs = require('fs');
const fsp = fs.promises;
const http = require('http');
const https = require('https');
const path = require('path');

const root = path.resolve(__dirname, '..');
const postsRoot = path.join(root, 'source', '_posts');
const imageRefRe = /(!\[[^\]]*]\()([^)]+)(\))|(<img\b[^>]*?\bsrc\s*=\s*["'])([^"']+)(["'][^>]*>)/gi;
const dryRun = process.argv.includes('--dry-run');
const normalizeMonthDatedFrontMatter = process.argv.includes('--normalize-month-dated-front-matter');

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function isYear(value) {
  return /^\d{4}$/.test(value);
}

function isMonth(value) {
  return /^\d{2}$/.test(value);
}

function dateFromYearMonth(year, month) {
  return `${year}-${month}`;
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function splitFrontMatter(content) {
  const match = content.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return null;
  }

  return {
    full: match[0],
    body: match[1],
    rest: content.slice(match[0].length)
  };
}

function hasFrontMatterKey(frontMatter, key) {
  return new RegExp(`^${key}\\s*:`, 'm').test(frontMatter);
}

function defaultFrontMatter(title, date) {
  return [
    '---',
    `title: ${yamlString(title)}`,
    `date: ${date}`,
    'categories: [xx]',
    'tags:',
    '  - xxx',
    '---',
    ''
  ].join('\n');
}

function forceFrontMatter(content, title, date) {
  const existing = splitFrontMatter(content);
  const body = existing ? existing.rest.replace(/^\r?\n/, '') : content;
  return `${defaultFrontMatter(title, date)}\n${body}`;
}

function frontMatterDate(content) {
  const existing = splitFrontMatter(content);
  if (!existing) {
    return null;
  }

  const match = existing.body.match(/^date\s*:\s*["']?(\d{4}-\d{2})["']?\s*$/m);
  return match ? match[1] : null;
}

function collectRefs(content) {
  const refs = [];
  content.replace(imageRefRe, (...args) => {
    refs.push(args[1] ? args[2] : args[5]);
    return args[0];
  });
  return refs;
}

function extensionFromContentType(contentType) {
  const normalized = String(contentType || '').split(';')[0].trim().toLowerCase();
  const map = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg',
    'image/bmp': '.bmp'
  };
  return map[normalized] || '.png';
}

function extensionFromUrl(url) {
  try {
    const parsed = new URL(url);
    const ext = path.posix.extname(parsed.pathname).toLowerCase();
    if (/^\.(png|jpe?g|gif|webp|svg|bmp)$/i.test(ext)) {
      return ext;
    }
  } catch (error) {
    return '';
  }
  return '';
}

function requestBuffer(url, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch (error) {
      reject(error);
      return;
    }

    const client = parsed.protocol === 'http:' ? http : https;
    const req = client.get(parsed, {
      headers: {
        'User-Agent': 'Mozilla/5.0 import-yuque-posts'
      }
    }, res => {
      const statusCode = res.statusCode || 0;
      const location = res.headers.location;

      if (statusCode >= 300 && statusCode < 400 && location && redirectsLeft > 0) {
        res.resume();
        const nextUrl = new URL(location, parsed).toString();
        requestBuffer(nextUrl, redirectsLeft - 1).then(resolve, reject);
        return;
      }

      if (statusCode < 200 || statusCode >= 300) {
        res.resume();
        reject(new Error(`HTTP ${statusCode}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({
        buffer: Buffer.concat(chunks),
        contentType: res.headers['content-type']
      }));
    });

    req.setTimeout(30000, () => req.destroy(new Error('Download timed out')));
    req.on('error', reject);
  });
}

async function downloadRemoteImage(url, imgDir, index, seenNames) {
  const response = await requestBuffer(url);
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 8);
  const ext = extensionFromUrl(url) || extensionFromContentType(response.contentType);
  let filename = `${index}-${hash}${ext}`;
  let suffix = 2;

  while (seenNames.has(filename) || fs.existsSync(path.join(imgDir, filename))) {
    filename = `${index}-${hash}-${suffix}${ext}`;
    suffix += 1;
  }

  seenNames.add(filename);
  if (!dryRun) {
    await fsp.mkdir(imgDir, { recursive: true });
    await fsp.writeFile(path.join(imgDir, filename), response.buffer);
  }
  return `img/${filename}`;
}

async function createUnavailableImage(url, imgDir, seenNames) {
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 8);
  let filename = `remote-unavailable-${hash}.svg`;
  let suffix = 2;

  while (seenNames.has(filename) || fs.existsSync(path.join(imgDir, filename))) {
    filename = `remote-unavailable-${hash}-${suffix}.svg`;
    suffix += 1;
  }

  seenNames.add(filename);
  if (!dryRun) {
    await fsp.mkdir(imgDir, { recursive: true });
    const escapedUrl = url
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    await fsp.writeFile(path.join(imgDir, filename), [
      '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="420" viewBox="0 0 1200 420">',
      '<rect width="1200" height="420" fill="#f8fafc"/>',
      '<rect x="32" y="32" width="1136" height="356" rx="18" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>',
      '<text x="72" y="130" fill="#0f172a" font-family="Arial, sans-serif" font-size="38" font-weight="700">Remote image unavailable</text>',
      '<text x="72" y="200" fill="#334155" font-family="Arial, sans-serif" font-size="26">The original image URL returned an error during import.</text>',
      `<text x="72" y="270" fill="#64748b" font-family="Arial, sans-serif" font-size="20">${escapedUrl}</text>`,
      '</svg>',
      ''
    ].join('\n'), 'utf8');
  }

  return `img/${filename}`;
}

async function normalizeImageReferences(content, imgDir, stats) {
  const refs = collectRefs(content);
  const replacements = new Map();
  const seenNames = new Set();
  let imageIndex = 1;

  for (const ref of refs) {
    if (replacements.has(ref) || /^img\//i.test(ref)) {
      continue;
    }

    if (/^https?:\/\//i.test(ref)) {
      try {
        replacements.set(ref, await downloadRemoteImage(ref, imgDir, imageIndex, seenNames));
        imageIndex += 1;
        stats.downloadedImages += 1;
      } catch (error) {
        replacements.set(ref, await createUnavailableImage(ref, imgDir, seenNames));
        stats.failedImages.push({ ref, error: error.message });
      }
    }
  }

  if (!replacements.size) {
    return content;
  }

  return content.replace(imageRefRe, (whole, mdOpen, mdSrc, mdClose, htmlOpen, htmlSrc, htmlClose) => {
    if (mdOpen) {
      return `${mdOpen}${replacements.get(mdSrc) || mdSrc}${mdClose}`;
    }
    return `${htmlOpen}${replacements.get(htmlSrc) || htmlSrc}${htmlClose}`;
  });
}

async function collectBareMarkdownFiles() {
  const files = [];
  const yearDirs = await fsp.readdir(postsRoot, { withFileTypes: true });

  for (const yearEntry of yearDirs) {
    if (!yearEntry.isDirectory() || !isYear(yearEntry.name)) {
      continue;
    }

    const yearDir = path.join(postsRoot, yearEntry.name);
    const monthDirs = await fsp.readdir(yearDir, { withFileTypes: true });
    for (const monthEntry of monthDirs) {
      if (!monthEntry.isDirectory() || !isMonth(monthEntry.name)) {
        continue;
      }

      const monthDir = path.join(yearDir, monthEntry.name);
      const children = await fsp.readdir(monthDir, { withFileTypes: true });
      for (const child of children) {
        if (!child.isFile() || !child.name.toLowerCase().endsWith('.md')) {
          continue;
        }

        files.push({
          date: dateFromYearMonth(yearEntry.name, monthEntry.name),
          filePath: path.join(monthDir, child.name)
        });
      }
    }
  }

  return files.sort((a, b) => a.filePath.localeCompare(b.filePath, 'zh-Hans-CN'));
}

async function processFile(item, stats) {
  const source = item.filePath;
  const postName = path.basename(source, path.extname(source));
  const packageDir = path.join(path.dirname(source), postName);
  const target = path.join(packageDir, `${postName}.md`);
  const imgDir = path.join(packageDir, 'img');

  if (fs.existsSync(target)) {
    stats.skipped.push({
      file: source,
      reason: `目标文件已存在: ${target}`
    });
    return;
  }

  let content = await fsp.readFile(source, 'utf8');
  content = forceFrontMatter(content, postName, item.date);
  content = await normalizeImageReferences(content, imgDir, stats);

  if (!dryRun) {
    await fsp.mkdir(packageDir, { recursive: true });
    await fsp.writeFile(target, content, 'utf8');
    await fsp.unlink(source);
  }

  stats.processed.push({
    source,
    target,
    title: postName,
    date: item.date
  });
}

async function collectMonthDatedPackagedFiles() {
  const files = [];
  const yearDirs = await fsp.readdir(postsRoot, { withFileTypes: true });

  for (const yearEntry of yearDirs) {
    if (!yearEntry.isDirectory() || !isYear(yearEntry.name)) {
      continue;
    }

    const yearDir = path.join(postsRoot, yearEntry.name);
    const monthDirs = await fsp.readdir(yearDir, { withFileTypes: true });
    for (const monthEntry of monthDirs) {
      if (!monthEntry.isDirectory() || !isMonth(monthEntry.name)) {
        continue;
      }

      const monthDir = path.join(yearDir, monthEntry.name);
      const postDirs = await fsp.readdir(monthDir, { withFileTypes: true });
      for (const postEntry of postDirs) {
        if (!postEntry.isDirectory()) {
          continue;
        }

        const mdPath = path.join(monthDir, postEntry.name, `${postEntry.name}.md`);
        if (!fs.existsSync(mdPath)) {
          continue;
        }

        const date = dateFromYearMonth(yearEntry.name, monthEntry.name);
        const content = await fsp.readFile(mdPath, 'utf8');
        if (frontMatterDate(content) === date) {
          files.push({
            date,
            filePath: mdPath
          });
        }
      }
    }
  }

  return files.sort((a, b) => a.filePath.localeCompare(b.filePath, 'zh-Hans-CN'));
}

async function normalizePackagedFrontMatter() {
  const files = await collectMonthDatedPackagedFiles();
  let changed = 0;

  for (const item of files) {
    const postName = path.basename(item.filePath, path.extname(item.filePath));
    const before = await fsp.readFile(item.filePath, 'utf8');
    const after = forceFrontMatter(before, postName, item.date);
    if (after !== before) {
      changed += 1;
      if (!dryRun) {
        await fsp.writeFile(item.filePath, after, 'utf8');
      }
    }
    console.log(`${dryRun ? '[would-normalize-frontmatter]' : '[normalized-frontmatter]'} ${toPosix(path.relative(root, item.filePath))}`);
  }

  console.log(`${dryRun ? 'DRY-RUN ' : ''}month_dated_packaged=${files.length}`);
  console.log(`${dryRun ? 'DRY-RUN ' : ''}frontmatter_changed=${changed}`);
}

async function main() {
  if (normalizeMonthDatedFrontMatter) {
    await normalizePackagedFrontMatter();
    return;
  }

  const stats = {
    processed: [],
    skipped: [],
    failedImages: [],
    downloadedImages: 0
  };

  const files = await collectBareMarkdownFiles();
  for (const file of files) {
    await processFile(file, stats);
  }

  console.log(`${dryRun ? 'DRY-RUN ' : ''}bare_markdown=${files.length}`);
  console.log(`${dryRun ? 'DRY-RUN ' : ''}processed=${stats.processed.length}`);
  console.log(`${dryRun ? 'DRY-RUN ' : ''}downloaded_images=${stats.downloadedImages}`);
  console.log(`${dryRun ? 'DRY-RUN ' : ''}skipped=${stats.skipped.length}`);
  console.log(`${dryRun ? 'DRY-RUN ' : ''}failed_images=${stats.failedImages.length}`);

  for (const item of stats.processed) {
    console.log(`${dryRun ? '[would-process]' : '[processed]'} ${toPosix(path.relative(root, item.source))} -> ${toPosix(path.relative(root, item.target))}`);
  }

  for (const item of stats.skipped) {
    console.log(`[skipped] ${toPosix(path.relative(root, item.file))}: ${item.reason}`);
  }

  for (const item of stats.failedImages) {
    console.log(`[failed-image] ${item.ref} (${item.error})`);
  }

  if (stats.failedImages.length) {
    process.exitCode = 2;
  }
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exit(1);
});
