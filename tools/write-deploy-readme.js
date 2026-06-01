const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'tools', 'deploy-readme.md');
const targetDir = path.join(root, 'public');
const target = path.join(targetDir, 'README.md');

if (!fs.existsSync(source)) {
  throw new Error(`Missing deploy README template: ${source}`);
}

fs.mkdirSync(targetDir, { recursive: true });

const content = fs.readFileSync(source, 'utf8');
fs.writeFileSync(target, content.endsWith('\n') ? content : `${content}\n`, 'utf8');

console.log(`Wrote ${path.relative(root, target).replace(/\\/g, '/')}`);
