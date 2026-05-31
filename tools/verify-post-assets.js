#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const postsRoot = path.join(root, 'source', '_posts');
const imageRefRe = /(!\[[^\]]*]\()([^)]+)(\))|(<img\b[^>]*?\bsrc\s*=\s*["'])([^"']+)(["'][^>]*>)/gi;
const imageLikeRe = /\.(png|jpe?g|gif|webp|svg|bmp)(?:[?#].*)?$/i;

function toPosix(value) {
  return value.replace(/\\/g, '/');
}

function walk(dir, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, result);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      result.push(full);
    }
  }
  return result;
}

function splitFrontMatter(content) {
  const match = content.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) {
    return null;
  }
  return match;
}

function collectImageRefs(content) {
  const refs = [];
  content.replace(imageRefRe, (...args) => {
    refs.push({
      type: args[1] ? 'markdown' : 'html',
      ref: args[1] ? args[2] : args[5]
    });
    return args[0];
  });
  return refs;
}

function isBareMonthPost(file) {
  const rel = toPosix(path.relative(postsRoot, file));
  return /^\d{4}\/\d{2}\/[^/]+\.md$/i.test(rel) || /^\d{6}\/[^/]+\.md$/i.test(rel);
}

function isLegacyYearMonthPost(file) {
  const rel = toPosix(path.relative(postsRoot, file));
  return /^\d{6}\//i.test(rel);
}

const files = walk(postsRoot).sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
const issues = {
  bareMonthPosts: [],
  missingFrontMatter: [],
  malformedFrontMatter: [],
  legacyYearMonthPosts: [],
  remoteImageRefs: [],
  oldImageRefs: [],
  missingLocalImages: []
};

for (const file of files) {
  const rel = toPosix(path.relative(root, file));
  const content = fs.readFileSync(file, 'utf8');
  const frontMatter = splitFrontMatter(content);

  if (isBareMonthPost(file)) {
    issues.bareMonthPosts.push(rel);
  }

  if (isLegacyYearMonthPost(file)) {
    issues.legacyYearMonthPosts.push(rel);
  }

  if (!frontMatter) {
    if (/^\uFEFF?---\r?\n/.test(content)) {
      issues.malformedFrontMatter.push(rel);
    } else {
      issues.missingFrontMatter.push(rel);
    }
  }

  for (const imageRef of collectImageRefs(content)) {
    const { ref, type } = imageRef;
    if (/^https?:\/\//i.test(ref)) {
      issues.remoteImageRefs.push(`${rel} -> ${ref}`);
      continue;
    }

    if (/^\.\.\/img\//i.test(ref) || /^\/img\//i.test(ref)) {
      issues.oldImageRefs.push(`${rel} -> ${ref}`);
      continue;
    }

    const isManagedLocalRef = /^img\//i.test(ref) || /^\.\.\/img\//i.test(ref) || /^\/img\//i.test(ref);
    const isMarkdownLocalImage = type === 'markdown' && imageLikeRe.test(ref);
    if ((!isManagedLocalRef && !isMarkdownLocalImage) || /^(?:data:|mailto:|#)/i.test(ref)) {
      continue;
    }

    const cleanRef = ref.split(/[?#]/)[0].replace(/\\/g, '/');
    const target = path.resolve(path.dirname(file), ...cleanRef.split('/'));
    if (!fs.existsSync(target)) {
      issues.missingLocalImages.push(`${rel} -> ${ref}`);
    }
  }
}

console.log(`markdown_files=${files.length}`);
for (const [name, values] of Object.entries(issues)) {
  console.log(`${name}=${values.length}`);
  for (const value of values) {
    console.log(`[${name}] ${value}`);
  }
}

if (Object.values(issues).some(values => values.length > 0)) {
  process.exitCode = 1;
}
