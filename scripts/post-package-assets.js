/* global hexo */
'use strict';

const crypto = require('crypto');
const Bluebird = require('bluebird');
const fs = require('fs');
const fsp = fs.promises;
const http = require('http');
const https = require('https');
const path = require('path');

const POST_PACKAGE_RE = /^_posts\/(\d{4})\/(\d{2})\/([^/]+)\/([^/]+\.md)$/;
const IMAGE_REF_RE = /(!\[[^\]]*]\()([^)]+)(\))|(<img\b[^>]*?\bsrc\s*=\s*["'])([^"']+)(["'][^>]*>)/gi;

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function isPackagedPost(sourcePath) {
  return POST_PACKAGE_RE.test(toPosix(sourcePath));
}

function localDateString(date) {
  const pad = number => String(number).padStart(2, '0');
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join('-') + ' ' + [
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds())
  ].join(':');
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

function yamlString(value) {
  return JSON.stringify(String(value));
}

async function ensureFrontMatter(filePath, content) {
  const postTitle = path.basename(filePath, path.extname(filePath));
  const stats = await fsp.stat(filePath);
  const defaults = [];
  const existing = splitFrontMatter(content);

  if (!existing || !hasFrontMatterKey(existing.body, 'title')) {
    defaults.push(`title: ${yamlString(postTitle)}`);
  }
  if (!existing || !hasFrontMatterKey(existing.body, 'date')) {
    defaults.push(`date: ${localDateString(stats.birthtime || new Date())}`);
  }
  if (!existing || !hasFrontMatterKey(existing.body, 'categories')) {
    defaults.push('categories: []');
  }
  if (!existing || !hasFrontMatterKey(existing.body, 'tags')) {
    defaults.push('tags: []');
  }

  if (!defaults.length) {
    return content;
  }

  if (!existing) {
    hexo.log.warn(`Added default front-matter to ${toPosix(path.relative(hexo.base_dir, filePath))}. Fill categories and tags manually.`);
    return `---\n${defaults.join('\n')}\n---\n\n${content}`;
  }

  hexo.log.warn(`Completed front-matter in ${toPosix(path.relative(hexo.base_dir, filePath))}. Fill categories and tags manually if they are empty.`);
  return `---\n${existing.body.trimEnd()}\n${defaults.join('\n')}\n---\n${existing.rest}`;
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

function requestBuffer(url, redirectsLeft = 4) {
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
        'User-Agent': 'hexo-post-package-assets'
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

    req.setTimeout(15000, () => req.destroy(new Error('Download timed out')));
    req.on('error', reject);
  });
}

async function downloadRemoteImage(url, imgDir) {
  await fsp.mkdir(imgDir, { recursive: true });
  const hash = crypto.createHash('sha1').update(url).digest('hex').slice(0, 12);
  const initialExt = extensionFromUrl(url);

  if (initialExt) {
    const existing = path.join(imgDir, `remote-${hash}${initialExt}`);
    if (fs.existsSync(existing)) {
      return `img/${path.basename(existing)}`;
    }
  }

  const response = await requestBuffer(url);
  const ext = initialExt || extensionFromContentType(response.contentType);
  const filename = `remote-${hash}${ext}`;
  const output = path.join(imgDir, filename);

  if (!fs.existsSync(output)) {
    await fsp.writeFile(output, response.buffer);
  }

  return `img/${filename}`;
}

async function copyOldLocalImage(ref, postDir, imgDir) {
  const normalized = ref.replace(/\\/g, '/');
  const match = normalized.match(/^(?:\.\.\/)?img\/([^/]+)\/(.+)$/) || normalized.match(/^\/img\/([^/]+)\/(.+)$/);
  if (!match) {
    return null;
  }

  const folder = match[1];
  const assetRel = match[2];
  const oldFile = path.join(hexo.source_dir, 'img', folder, ...assetRel.split('/'));
  if (!fs.existsSync(oldFile)) {
    return null;
  }

  const target = path.join(imgDir, ...assetRel.split('/'));
  await fsp.mkdir(path.dirname(target), { recursive: true });

  if (!fs.existsSync(target)) {
    await fsp.copyFile(oldFile, target);
  }

  return `img/${toPosix(assetRel)}`;
}

async function normalizeImageReferences(filePath, content) {
  const postDir = path.dirname(filePath);
  const imgDir = path.join(postDir, 'img');
  const replacements = new Map();
  const refs = [];

  content.replace(IMAGE_REF_RE, (...args) => {
    refs.push(args[1] ? args[2] : args[5]);
    return args[0];
  });

  for (const ref of refs) {
    if (replacements.has(ref) || /^img\//.test(ref)) {
      continue;
    }

    try {
      if (/^https?:\/\//i.test(ref)) {
        replacements.set(ref, await downloadRemoteImage(ref, imgDir));
        continue;
      }

      const copied = await copyOldLocalImage(ref, postDir, imgDir);
      if (copied) {
        replacements.set(ref, copied);
      }
    } catch (error) {
      hexo.log.warn(`Could not localize image ${ref}: ${error.message}`);
    }
  }

  if (!replacements.size) {
    return content;
  }

  return content.replace(IMAGE_REF_RE, (whole, mdOpen, mdSrc, mdClose, htmlOpen, htmlSrc, htmlClose) => {
    if (mdOpen) {
      return `${mdOpen}${replacements.get(mdSrc) || mdSrc}${mdClose}`;
    }
    return `${htmlOpen}${replacements.get(htmlSrc) || htmlSrc}${htmlClose}`;
  });
}

async function preparePostPackage(file) {
  const sourcePath = toPosix(file.path);
  if (file.type === 'delete' || !isPackagedPost(sourcePath)) {
    return;
  }

  const filePath = file.source;
  let content = await fsp.readFile(filePath, 'utf8');
  const before = content;

  content = await ensureFrontMatter(filePath, content);
  content = await normalizeImageReferences(filePath, content);

  if (content !== before) {
    await fsp.writeFile(filePath, content, 'utf8');
  }
}

const originalProcessFile = hexo.source._processFile.bind(hexo.source);
hexo.source._processFile = function patchedProcessFile(type, sourcePath) {
  const file = new hexo.source.File({
    source: path.join(hexo.source.base, sourcePath),
    path: toPosix(sourcePath),
    params: {},
    type
  });

  return Bluebird.resolve()
    .then(() => preparePostPackage(file))
    .then(() => originalProcessFile(type, sourcePath));
};

function postPackageBasePath(post) {
  const postPath = toPosix(post.path || '').replace(/\.html?$/, '');
  return postPath.endsWith('/') ? postPath : `${postPath}/`;
}

hexo.extend.generator.register('post_package_assets', function postPackageAssetsGenerator(locals) {
  const routes = [];

  locals.posts.forEach(post => {
    const source = toPosix(post.source || '');
    if (!isPackagedPost(source)) {
      return;
    }

    const imgDir = path.join(path.dirname(post.full_source), 'img');
    if (!fs.existsSync(imgDir)) {
      return;
    }

    const walk = dir => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
          continue;
        }

        const rel = toPosix(path.relative(imgDir, full));
        routes.push({
          path: path.posix.join(postPackageBasePath(post), 'img', rel),
          data: () => fs.createReadStream(full)
        });
      }
    };

    walk(imgDir);
  });

  return routes;
});

function rewriteContentImageUrls(content, post) {
  if (!content || !isPackagedPost(toPosix(post.source || ''))) {
    return content;
  }

  const base = `/${postPackageBasePath(post)}`;
  return content.replace(/(<img\b[^>]*?\bsrc\s*=\s*["'])\/?img\/([^"']+)(["'][^>]*>)/gi, (whole, open, rel, close) => {
    return `${open}${path.posix.join(base, 'img', rel)}${close}`;
  });
}

hexo.extend.filter.register('after_post_render', function postPackageImageUrlFilter(data) {
  data.content = rewriteContentImageUrls(data.content, data);
  data.excerpt = rewriteContentImageUrls(data.excerpt, data);
  data.more = rewriteContentImageUrls(data.more, data);
  return data;
});
