import fs from 'node:fs';
import path from 'node:path';

const postsDir = path.join(process.cwd(), 'src', 'content', 'post');
const args = process.argv.slice(2);

function hasFlag(flag) {
  return args.includes(flag);
}

function parseDateArg() {
  const idx = args.indexOf('--date');
  if (idx === -1) return null;
  const value = args[idx + 1];
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error('Invalid --date. Use YYYY-MM-DD.');
  }
  return value;
}

const dryRun = hasFlag('--dry-run') || hasFlag('--check');

const today = new Date();
const yyyy = String(today.getFullYear());
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');

const dateShort = parseDateArg() || `${yyyy}-${mm}-${dd}`;
const dateIso = `${dateShort}T00:00:00Z`;

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
let changed = 0;

for (const file of files) {
  const filePath = path.join(postsDir, file);
  let text = fs.readFileSync(filePath, 'utf8');
  const original = text;

  // Update or insert updateDate in frontmatter
  if (/^updateDate:/m.test(text)) {
    text = text.replace(/^updateDate:\s*.*$/m, `updateDate: ${dateIso}`);
  } else {
    text = text.replace(/^publishDate:\s*.*$/m, (m) => `${m}\nupdateDate: ${dateIso}`);
  }

  // Update visible Son Guncelleme line if present
  text = text.replace(/\*\*Son Güncelleme:\*\*\s*\d{4}-\d{2}-\d{2}/g, `**Son Güncelleme:** ${dateShort}`);

  if (text !== original) {
    changed += 1;
    if (!dryRun) {
      fs.writeFileSync(filePath, text, 'utf8');
    }
  }
}

if (dryRun) {
  console.log(`Dry run: ${changed} file(s) would be updated to ${dateShort}.`);
} else {
  console.log(`Updated updateDate and Son Güncelleme to ${dateShort} for ${changed} file(s).`);
}
