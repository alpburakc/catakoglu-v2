import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import sharp from 'sharp';

const root = process.cwd();
const postsDir = path.join(root, 'src', 'content', 'post');
const publicImages = path.join(root, 'public', 'images');
const outDir = path.join(root, 'public', 'og');

fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.mdx'));
let processed = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const text = fs.readFileSync(filePath, 'utf8');
  const parts = text.split('---');
  if (parts.length < 3) {
    skipped += 1;
    continue;
  }
  const data = yaml.load(parts[1]) || {};

  // Prefer metadata.og.image if present, otherwise fall back to frontmatter image
  const ogImage = data?.metadata?.og?.image;
  const frontImage = data?.image;
  const srcImage = ogImage || frontImage;
  if (!srcImage) {
    skipped += 1;
    continue;
  }

  // Resolve to public/images source
  let srcPath = srcImage;
  if (srcPath.startsWith('http')) {
    // Expect it to be a public/images URL
    srcPath = srcPath.replace('https://catakoglu.com/images/', '/images/');
  }
  if (srcPath.startsWith('~/')) srcPath = srcPath.slice(1);
  if (srcPath.startsWith('/assets/images/')) {
    srcPath = srcPath.replace('/assets/images/', '/images/');
  }
  if (srcPath.startsWith('assets/images/')) {
    srcPath = srcPath.replace('assets/images/', 'images/');
  }
  if (srcPath.startsWith('/images/')) {
    srcPath = srcPath.slice(1);
  }

  const absSrc = path.join(root, 'public', srcPath);
  if (!fs.existsSync(absSrc)) {
    skipped += 1;
    continue;
  }

  const slug = path.basename(file, '.mdx');
  const outPath = path.join(outDir, `${slug}.jpg`);

  await sharp(absSrc)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath);

  // Update frontmatter OG/Twitter image to new og path
  const ogUrl = `https://catakoglu.com/og/${slug}.jpg`;

  let updated = text;
  updated = updated.replace(/(^\s{2}og:\n(?:.*\n)*?\s{4}image:\s*)([^\n]+)$/m, `$1${ogUrl}`);
  updated = updated.replace(/(^\s{2}twitter:\n(?:.*\n)*?\s{4}image:\s*)([^\n]+)$/m, `$1${ogUrl}`);

  fs.writeFileSync(filePath, updated, 'utf8');
  processed += 1;
}

console.log(`Generated ${processed} OG images (1200x630). Skipped ${skipped} files.`);
