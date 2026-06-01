const fs = require('fs');
const path = require('path');

const postsRoot = path.resolve('source/_posts');
const write = process.argv.includes('--write');
const includeXss = process.argv.includes('--include-xss');
const placeholderReportPath = path.resolve('tools/post-placeholder-tags-review.md');

const excludedByDefault = new Set([
  'source/_posts/2024/07/控制台打出XSS/控制台打出XSS.md',
  'source/_posts/2024/07/各种类型上传文件打出XSS/各种类型上传文件打出XSS.md',
]);

const standardHtmlTags = new Set([
  'a', 'abbr', 'b', 'blockquote', 'body', 'br', 'caption', 'center', 'cite',
  'code', 'col', 'colgroup', 'dd', 'del', 'details', 'div', 'dl', 'dt', 'em',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'html', 'i', 'img', 'ins', 'kbd', 'li',
  'mark', 'ol', 'p', 'pre', 's', 'span', 'strong', 'sub', 'summary', 'sup',
  'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'u', 'ul',
]);

const codeFenceRe = /^\s*(```|~~~)/;
const fontStylePairRe = /<font\b(?=[^>]*\bstyle\s*=)([^>]*)>(.*?)<\/font>/gi;
const orphanFontStyleOpenRe = /<font\b(?=[^>]*\bstyle\s*=)[^>]*>/gi;
const orphanFontCloseRe = /<\/font>/gi;
const emptyFontRe = /<font\b[^>]*>\s*<\/font>/gi;
const rawTagRe = /<\/?([A-Za-z][\w:-]*)(?:\s[^<>]*)?>/g;
const htmlCommentRe = /<!--[\s\S]*?-->/g;
const inlineCodeRe = /`[^`]*`/g;

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function relativePath(filePath) {
  return normalizePath(path.relative(process.cwd(), filePath));
}

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function isBoldWrapped(source, start, end, inner) {
  const before = source.slice(Math.max(0, start - 2), start);
  const after = source.slice(end, end + 2);
  const innerAlreadyBold = /^\s*\*\*[\s\S]*\*\*\s*$/.test(inner);
  return (before === '**' && after === '**') || innerAlreadyBold;
}

function hasVisibleBackground(attrs) {
  const matches = attrs.matchAll(/background(?:-color)?\s*:\s*([^;"']+)/gi);
  for (const match of matches) {
    const value = match[1].trim().toLowerCase().replace(/\s+/g, '');
    if (value === 'transparent') continue;
    if (/^rgba\([^)]*,0(?:\.0+)?\)$/.test(value)) continue;
    return true;
  }
  return false;
}

function cleanLine(line, stats) {
  let changed = false;

  line = line.replace(emptyFontRe, () => {
    changed = true;
    stats.emptyFontTagsRemoved += 1;
    return '';
  });

  line = line.replace(fontStylePairRe, (match, attrs, inner, offset, source) => {
    changed = true;
    stats.fontTagsRemoved += 1;

    if (!inner.trim()) {
      stats.emptyFontTagsRemoved += 1;
      return '';
    }

    if (hasVisibleBackground(attrs)) {
      stats.backgroundFontTags += 1;
      const start = offset;
      const end = offset + match.length;
      if (!isBoldWrapped(source, start, end, inner)) {
        stats.boldAddedForBackground += 1;
        return `**${inner}**`;
      }
    }

    return inner;
  });

  line = line.replace(orphanFontStyleOpenRe, () => {
    changed = true;
    stats.orphanFontTagsRemoved += 1;
    return '';
  });

  line = line.replace(orphanFontCloseRe, () => {
    changed = true;
    stats.orphanFontTagsRemoved += 1;
    return '';
  });

  if (changed) {
    let normalized = line;
    do {
      line = normalized;
      normalized = line.replace(/\*\*\*\*/g, '');
    } while (normalized !== line);
    line = normalized;
  }

  return { line, changed };
}

function collectPlaceholderTags(line, file, lineNumber, placeholders) {
  line = line.replace(htmlCommentRe, '');
  line = line.replace(inlineCodeRe, '');
  rawTagRe.lastIndex = 0;
  let match;
  while ((match = rawTagRe.exec(line))) {
    const tag = match[1].toLowerCase();
    if (tag === 'font' || standardHtmlTags.has(tag)) continue;

    placeholders.push({
      file,
      line: lineNumber,
      tag,
      snippet: line.trim().replace(/\s+/g, ' ').slice(0, 180),
    });
  }
}

function processFile(filePath, totals, placeholders) {
  const rel = relativePath(filePath);
  const excluded = !includeXss && excludedByDefault.has(rel);
  const original = fs.readFileSync(filePath, 'utf8');
  const newline = original.includes('\r\n') ? '\r\n' : '\n';
  const lines = original.split(/\r?\n/);
  const out = [];
  const stats = {
    file: rel,
    excluded,
    changedLines: 0,
    fontTagsRemoved: 0,
    emptyFontTagsRemoved: 0,
    backgroundFontTags: 0,
    boldAddedForBackground: 0,
    orphanFontTagsRemoved: 0,
  };

  let inFence = false;
  for (let i = 0; i < lines.length; i += 1) {
    const originalLine = lines[i];

    if (codeFenceRe.test(originalLine)) {
      inFence = !inFence;
      out.push(originalLine);
      continue;
    }

    if (inFence || excluded) {
      out.push(originalLine);
      continue;
    }

    const cleaned = cleanLine(originalLine, stats);
    if (cleaned.changed && cleaned.line !== originalLine) {
      stats.changedLines += 1;
    }
    collectPlaceholderTags(cleaned.line, rel, i + 1, placeholders);
    out.push(cleaned.line);
  }

  const next = stats.changedLines ? out.join(newline) : original;
  if (write && stats.changedLines) {
    fs.writeFileSync(filePath, next, 'utf8');
  }

  for (const key of [
    'changedLines',
    'fontTagsRemoved',
    'emptyFontTagsRemoved',
    'backgroundFontTags',
    'boldAddedForBackground',
    'orphanFontTagsRemoved',
  ]) {
    totals[key] += stats[key];
  }
  if (stats.changedLines) totals.changedFiles += 1;
  if (excluded) totals.excludedFiles += 1;
  return stats;
}

function writePlaceholderReport(placeholders) {
  let report = '# Placeholder-Like Raw Tag Review\n\n';
  report += 'These tags were not changed automatically. Review whether they should be escaped or wrapped in backticks.\n\n';
  report += '| File | Line | Tag | Snippet |\n';
  report += '|---|---:|---|---|\n';
  for (const item of placeholders) {
    report += `| ${item.file} | ${item.line} | ${item.tag} | ${item.snippet.replace(/\|/g, '\\|')} |\n`;
  }
  fs.writeFileSync(placeholderReportPath, report, 'utf8');
}

function main() {
  const totals = {
    scannedFiles: 0,
    excludedFiles: 0,
    changedFiles: 0,
    changedLines: 0,
    fontTagsRemoved: 0,
    emptyFontTagsRemoved: 0,
    backgroundFontTags: 0,
    boldAddedForBackground: 0,
    orphanFontTagsRemoved: 0,
  };
  const placeholders = [];
  const changed = [];

  for (const filePath of walk(postsRoot)) {
    totals.scannedFiles += 1;
    const stats = processFile(filePath, totals, placeholders);
    if (stats.changedLines) changed.push(stats);
  }

  if (write) {
    writePlaceholderReport(placeholders);
  }

  console.log(JSON.stringify({
    mode: write ? 'write' : 'dry-run',
    ...totals,
    placeholderTags: placeholders.length,
    placeholderReport: write ? relativePath(placeholderReportPath) : null,
    changed: changed.map((item) => ({
      file: item.file,
      changedLines: item.changedLines,
      fontTagsRemoved: item.fontTagsRemoved,
      backgroundFontTags: item.backgroundFontTags,
      boldAddedForBackground: item.boldAddedForBackground,
      emptyFontTagsRemoved: item.emptyFontTagsRemoved,
      orphanFontTagsRemoved: item.orphanFontTagsRemoved,
    })),
  }, null, 2));
}

main();
