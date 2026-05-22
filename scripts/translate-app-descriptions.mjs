#!/usr/bin/env node
/**
 * REVREX Phase 5.5 - translate-app-descriptions.mjs
 *
 * Idempotent script that translates every `description` field of every
 * Cal.diy App Store app metadata file (`config.json` and `_metadata.ts`)
 * from English to Japanese using the canonical dictionary at
 * `apps/caldiy/scripts/app-descriptions-ja.json`.
 *
 * Scope (do NOT extend without explicit approval):
 *   - apps/caldiy/packages/app-store/<app>/config.json   ( "description": "..." )
 *   - apps/caldiy/packages/app-store/<app>/_metadata.ts  ( description: "..." )
 *
 * Rules:
 *   - Re-running on already-translated files is a no-op (already-ja descriptions
 *     are detected via a Hiragana/Katakana/CJK heuristic).
 *   - Any English description that is missing from the dictionary is warned on
 *     stderr and left untouched.
 *   - Upstream Cal.com attribution (MIT) is unaffected; this only touches the
 *     description text of each app metadata file.
 *
 * Usage:
 *   node apps/caldiy/scripts/translate-app-descriptions.mjs
 *   node apps/caldiy/scripts/translate-app-descriptions.mjs --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_STORE_DIR = path.resolve(__dirname, '..', 'packages', 'app-store');
const DICT_PATH = path.resolve(__dirname, 'app-descriptions-ja.json');

const dryRun = process.argv.includes('--dry-run');

if (!fs.existsSync(APP_STORE_DIR)) {
  console.error(`[error] app-store directory not found: ${APP_STORE_DIR}`);
  process.exit(1);
}
if (!fs.existsSync(DICT_PATH)) {
  console.error(`[error] dictionary not found: ${DICT_PATH}`);
  process.exit(1);
}

const dictRaw = JSON.parse(fs.readFileSync(DICT_PATH, 'utf8'));
delete dictRaw._comment;
const dict = dictRaw;

const isJapanese = (s) => /[぀-ゟ゠-ヿ一-鿿]/.test(s);

/**
 * Walk every immediate-and-second-level app directory and collect
 * config.json / _metadata.ts files.
 */
function collectMetadataFiles(rootDir) {
  const out = [];
  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const appDir = path.join(rootDir, entry.name);
    pushIfExists(out, appDir, 'config.json');
    pushIfExists(out, appDir, '_metadata.ts');
    pushIfExists(out, appDir, '_metadata.tsx');

    // Templates live one level deeper: packages/app-store/templates/<tpl>/...
    if (entry.name === 'templates') {
      for (const sub of fs.readdirSync(appDir, { withFileTypes: true })) {
        if (!sub.isDirectory()) continue;
        const subDir = path.join(appDir, sub.name);
        pushIfExists(out, subDir, 'config.json');
        pushIfExists(out, subDir, '_metadata.ts');
      }
    }
  }
  return out;
}

function pushIfExists(out, dir, name) {
  const full = path.join(dir, name);
  if (fs.existsSync(full)) out.push(full);
}

/** Replace `description` in a JSON config file. Returns { changed, before, after }. */
function translateJsonFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error(`[warn] failed to parse JSON: ${filePath}: ${e.message}`);
    return { changed: false };
  }
  if (typeof parsed.description !== 'string') return { changed: false };
  const before = parsed.description;
  if (isJapanese(before)) return { changed: false, skipped: 'already-ja', before };
  const ja = dict[before];
  if (!ja) {
    console.error(`[warn] no translation for ${path.relative(APP_STORE_DIR, filePath)}: ${JSON.stringify(before.slice(0, 80))}`);
    return { changed: false, skipped: 'no-dict', before };
  }
  parsed.description = ja;
  // Preserve Cal.diy's existing JSON style: 2-space indent, trailing newline.
  const out = JSON.stringify(parsed, null, 2) + (raw.endsWith('\n') ? '\n' : '');
  if (!dryRun) fs.writeFileSync(filePath, out);
  return { changed: true, before, after: ja };
}

/** Replace `description: "..."` in a TS metadata file. Returns { changed, before, after }. */
function translateTsFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Capture the existing description string literal. We deliberately match
  // double-quoted strings only — Cal.com's _metadata.ts files use double
  // quotes exclusively as of v1.0.0-rc2.
  const re = /description:\s*"((?:[^"\\]|\\.)*)"/;
  const m = raw.match(re);
  if (!m) return { changed: false };
  // The raw match still has TS-style escapes (\n, \", etc). Decode to compare.
  let before;
  try {
    before = JSON.parse(`"${m[1]}"`);
  } catch (e) {
    console.error(`[warn] failed to decode TS description in ${filePath}: ${e.message}`);
    return { changed: false };
  }
  if (isJapanese(before)) return { changed: false, skipped: 'already-ja', before };
  const ja = dict[before];
  if (!ja) {
    console.error(`[warn] no translation for ${path.relative(APP_STORE_DIR, filePath)}: ${JSON.stringify(before.slice(0, 80))}`);
    return { changed: false, skipped: 'no-dict', before };
  }
  const escaped = JSON.stringify(ja).slice(1, -1); // re-encode TS literal
  const out = raw.replace(re, `description: "${escaped}"`);
  if (!dryRun) fs.writeFileSync(filePath, out);
  return { changed: true, before, after: ja };
}

function translateOne(filePath) {
  if (filePath.endsWith('.json')) return translateJsonFile(filePath);
  return translateTsFile(filePath);
}

const files = collectMetadataFiles(APP_STORE_DIR);
let changed = 0;
let skipped = 0;
let noDict = 0;
let alreadyJa = 0;

for (const file of files) {
  const res = translateOne(file);
  if (res.changed) {
    changed++;
    console.log(`[ok]   ${path.relative(APP_STORE_DIR, file)}`);
  } else if (res.skipped === 'already-ja') {
    alreadyJa++;
  } else if (res.skipped === 'no-dict') {
    noDict++;
  } else {
    skipped++;
  }
}

console.log(`\nSummary: total=${files.length} changed=${changed} already-ja=${alreadyJa} no-dict=${noDict} skipped=${skipped}${dryRun ? ' (dry-run)' : ''}`);
if (noDict > 0) {
  console.error(`\n[error] ${noDict} description(s) without translation. Add them to scripts/app-descriptions-ja.json and re-run.`);
  process.exit(2);
}
