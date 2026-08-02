#!/usr/bin/env node

/**
 * deploy-assets.js
 *
 * Scans the public/ folder, uploads all media assets to Cloudinary,
 * generates a mapping file (public-urls.json), and replaces local
 * asset references in source files (app/ and components/).
 *
 * Prerequisites:
 *   1. npm install cloudinary dotenv sharp
 *   2. Create a Cloudinary account at https://cloudinary.com (free tier)
 *   3. Copy .env.example to .env and fill in your credentials
 *   4. Run: node scripts/deploy-assets.js
 *   5. Dry run: node scripts/deploy-assets.js --dry-run
 *   6. Cleanup: node scripts/deploy-assets.js --cleanup
 */

try { require('dotenv').config(); } catch { /* dotenv optional */ }

const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const os = require('os');
const path = require('path');

// ─── Configuration ────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SOURCE_DIRS = [path.join(ROOT, 'app'), path.join(ROOT, 'components'), path.join(ROOT, 'lib')];
const MAPPING_FILE = path.join(ROOT, 'public-urls.json');
const DRY_RUN = process.argv.includes('--dry-run');
const CLEANUP = process.argv.includes('--cleanup');

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || '';
const USE_UNSIGNED = process.env.CLOUDINARY_UNSIGNED === 'true';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 1920;

// ─── Validation ───────────────────────────────────────────────────
if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
  console.error(
    'Error: Missing Cloudinary credentials.\n' +
      'Copy .env.example to .env and fill in your Cloudinary keys.\n' +
      'Get them from: https://console.cloudinary.com/console/routes/api_keys\n' +
      'Then run: node scripts/deploy-assets.js',
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

// ─── Helpers ──────────────────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

function getPublicId(localPath) {
  const rel = path.relative(PUBLIC_DIR, localPath);
  const ext = path.extname(rel);
  return path.join(path.dirname(rel), path.basename(rel, ext)).replace(/\\/g, '/');
}

function getResourceType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.mp4', '.mov', '.avi', '.webm', '.mkv', '.gif'].includes(ext)) return 'video';
  return 'image';
}

function getSupportedExtensions() {
  return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.mov', '.avi', '.webm', '.mkv', '.svg', '.ico', '.bmp', '.tiff'];
}

// ─── Step 1: Scan public/ folder ─────────────────────────────────
function scanPublicAssets() {
  const assets = [];
  const supported = getSupportedExtensions();

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (supported.includes(ext)) {
          assets.push(fullPath);
        }
      }
    }
  }

  walk(PUBLIC_DIR);
  return assets.sort();
}

// ─── Step 2: Load existing mapping (skip already-uploaded) ───────
function loadExistingMapping() {
  if (fs.existsSync(MAPPING_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf-8'));
    } catch {
      return {};
    }
  }
  return {};
}

// ─── Step 3: Upload a single file ────────────────────────────────
async function uploadFile(filePath, existingMapping) {
  const localRel = '/' + path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
  const publicId = getPublicId(filePath);
  const resourceType = getResourceType(filePath);

  if (existingMapping[localRel]) {
    return { localRel, url: existingMapping[localRel], skipped: true };
  }

  const fileSize = fs.statSync(filePath).size;

  if (DRY_RUN) {
    return {
      localRel,
      url: `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/${publicId}${path.extname(filePath)}`,
      skipped: false,
      dryRun: true,
      fileSize,
    };
  }

  // Compress oversized images
  let uploadPath = filePath;
  if (resourceType === 'image' && fileSize > MAX_IMAGE_SIZE) {
    console.log(`\n   ⚠  Compressing ${path.basename(filePath)} (${formatBytes(fileSize)})`);
    const tempPath = path.join(os.tmpdir(), `deploy-${Date.now()}-${path.basename(filePath)}`);
    try {
      await sharp(filePath)
        .resize({ width: MAX_IMAGE_DIMENSION, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(tempPath);
      uploadPath = tempPath;
    } catch (err) {
      console.log(`   ✗ Failed to compress ${localRel}: ${err.message}`);
      return { localRel, url: null, skipped: false, failed: true, error: err.message };
    }
  }

  // Skip oversized videos
  if (resourceType === 'video' && fileSize > MAX_VIDEO_SIZE) {
    console.log(`\n   ⚠  Skipping ${path.basename(filePath)} (${formatBytes(fileSize)} — exceeds ${formatBytes(MAX_VIDEO_SIZE)})`);
    return { localRel, url: null, skipped: false, failed: true, error: 'File too large for free tier' };
  }

  const options = {
    public_id: publicId,
    resource_type: resourceType,
    quality: 'auto',
    fetch_format: 'auto',
  };

  if (USE_UNSIGNED && UPLOAD_PRESET) {
    options.upload_preset = UPLOAD_PRESET;
    options.filename = uploadPath;
  }

  const result = await cloudinary.uploader.upload(uploadPath, options);

  if (uploadPath !== filePath) {
    try { fs.unlinkSync(uploadPath); } catch { /* ignore */ }
  }

  return {
    localRel,
    url: result.secure_url,
    skipped: false,
    fileSize,
    publicId: result.public_id,
  };
}

// ─── Step 4: Replace references in source files ──────────────────
function replaceReferences(mapping) {
  const sourceExtensions = /\.(tsx?|jsx?)$/;
  const entries = Object.entries(mapping);
  let totalReplacements = 0;
  const changedFiles = [];

  for (const sourceDir of SOURCE_DIRS) {
    if (!fs.existsSync(sourceDir)) continue;

    function processDir(dir) {
      const entries_list = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries_list) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          processDir(fullPath);
        } else if (entry.isFile() && sourceExtensions.test(entry.name)) {
          let content = fs.readFileSync(fullPath, 'utf-8');
          let modified = false;
          let fileReplacements = 0;

          for (const [localPath, newUrl] of entries) {
            if (!newUrl) continue;
            const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // Only replace paths preceded by quotes (not part of an existing URL)
            const pattern = new RegExp("(?<=['\"])" + escaped, 'g');
            const matches = content.match(pattern);
            if (matches) {
              content = content.replace(pattern, newUrl);
              modified = true;
              fileReplacements += matches.length;
            }
          }

          totalReplacements += fileReplacements;

          if (modified) {
            if (DRY_RUN) {
              console.log(`  [DRY-RUN] Would update: ${path.relative(ROOT, fullPath)} (${fileReplacements} replacements)`);
            } else {
              fs.writeFileSync(fullPath, content, 'utf-8');
              console.log(`  Updated: ${path.relative(ROOT, fullPath)} (${fileReplacements} replacements)`);
            }
            changedFiles.push(path.relative(ROOT, fullPath));
          }
        }
      }
    }

    processDir(sourceDir);
  }

  return { totalReplacements, changedFiles };
}

// ─── Main ─────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  Asset Deploy Script');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (no uploads)' : 'LIVE'}`);
  console.log(`  Public dir: ${PUBLIC_DIR}`);
  console.log(`  Mapping file: ${MAPPING_FILE}`);
  console.log('');

  // Step 1: Scan
  console.log('📂 Scanning public/ folder...');
  const assets = scanPublicAssets();
  console.log(`   Found ${assets.length} media assets`);

  const totalSize = assets.reduce((sum, f) => sum + fs.statSync(f).size, 0);
  console.log(`   Total size: ${formatBytes(totalSize)}`);
  console.log('');

  // Step 2: Load existing mapping
  const existingMapping = loadExistingMapping();
  const alreadyMapped = Object.keys(existingMapping).length;
  if (alreadyMapped > 0) {
    console.log(`   ${alreadyMapped} assets already mapped (will skip re-upload)`);
  }
  console.log('');

  // Step 3: Upload
  console.log('☁️  Uploading to Cloudinary...');
  const mapping = { ...existingMapping };
  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i];
    const localRel = '/' + path.relative(PUBLIC_DIR, asset).replace(/\\/g, '/');

    if (existingMapping[localRel]) {
      skipped++;
      continue;
    }

    const progress = ((i + 1) / assets.length * 100).toFixed(1);
    process.stdout.write(`   [${progress}%] ${path.basename(asset)} (${formatBytes(fs.statSync(asset).size)})  \r`);

    try {
      const result = await uploadFile(asset, existingMapping);
      if (result.skipped) {
        skipped++;
      } else if (result.failed) {
        console.log(`\n   ✗ Failed: ${localRel} — ${result.error}`);
        failed++;
      } else {
        mapping[result.localRel] = result.url;
        uploaded++;
      }
    } catch (err) {
      console.log(`\n   ✗ Failed: ${localRel} — ${err.message}`);
      failed++;
    }

    // Save mapping incrementally every 20 uploads
    if (uploaded % 20 === 0 && uploaded > 0 && !DRY_RUN) {
      fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf-8');
    }
  }

  console.log('\n');
  console.log(`   Upload complete: ${uploaded} uploaded, ${skipped} skipped, ${failed} failed`);
  console.log('');

  // Step 4: Save mapping
  if (!DRY_RUN) {
    fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2), 'utf-8');
    console.log(`💾 Mapping saved to ${MAPPING_FILE}`);
  } else {
    console.log(`💾 [DRY-RUN] Would save mapping to ${MAPPING_FILE}`);
  }
  console.log('');

  // Step 5: Replace references in source files
  console.log('🔄 Replacing references in source files...');
  const { totalReplacements, changedFiles } = replaceReferences(mapping);
  console.log(`   ${totalReplacements} references replaced in ${changedFiles.length} files`);
  console.log('');

  // Summary
  console.log('═══════════════════════════════════════════════════');
  console.log('  Summary');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  Total assets scanned:  ${assets.length}`);
  console.log(`  Uploaded:              ${uploaded}`);
  console.log(`  Skipped (already mapped): ${skipped}`);
  console.log(`  Failed:                ${failed}`);
  console.log(`  References replaced:   ${totalReplacements}`);
  console.log(`  Files modified:        ${changedFiles.length}`);
  console.log('═══════════════════════════════════════════════════');

  if (DRY_RUN) {
    console.log('\n⚠️  This was a DRY RUN. No files were modified or uploaded.');
    console.log('   Run without --dry-run to apply changes.');
  } else {
    console.log('\n✅ Done! Next steps:');
    console.log('   1. Review public-urls.json for correctness');
    console.log('   2. Review changed source files with git diff');
    console.log('   3. Commit and push');
    console.log('   4. Redeploy your site');
    if (CLEANUP) {
      console.log('\n🧹 Cleaning up local files...');
      const uploadedPaths = Object.keys(mapping);
      let cleaned = 0;
      for (const localRel of uploadedPaths) {
        const fullPath = path.join(PUBLIC_DIR, localRel.replace(/^\//, ''));
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          cleaned++;
        }
      }
      console.log(`   Removed ${cleaned} local files`);
      console.log('   ⚠️  Make sure your Cloudinary URLs work before deleting originals!');
    } else {
      console.log('   5. To remove local files after verifying:');
      console.log('      node scripts/deploy-assets.js --cleanup');
    }
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});