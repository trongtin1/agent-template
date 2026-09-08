#!/usr/bin/env node
/**
 * @trongtin1/agent-template CLI
 * Commands: init, update [--dry-run]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const AGENTS_SRC = path.join(PACKAGE_ROOT, '.agents');

const [, , command, ...args] = process.argv;
const isDryRun = args.includes('--dry-run');

// ── Helpers ──────────────────────────────────────────────────────────────────

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getAllFiles(dir, base = dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(full, base));
    } else {
      results.push(path.relative(base, full));
    }
  }
  return results;
}

function isGitModified(filePath) {
  try {
    const result = execSync(`git status --porcelain "${filePath}"`, {
      stdio: ['pipe', 'pipe', 'pipe'],
    }).toString().trim();
    return result.length > 0;
  } catch {
    return false; // not a git repo or git not available
  }
}

function log(msg) { console.log(msg); }
function ok(msg)  { console.log(`\x1b[32m✅ ${msg}\x1b[0m`); }
function warn(msg){ console.log(`\x1b[33m⚠️  ${msg}\x1b[0m`); }
function info(msg){ console.log(`\x1b[36mℹ️  ${msg}\x1b[0m`); }
function err(msg) { console.error(`\x1b[31m❌ ${msg}\x1b[0m`); }

// ── Commands ──────────────────────────────────────────────────────────────────

function cmdInit() {
  const cwd = process.cwd();
  const destAgents = path.join(cwd, '.agents');

  log('\n🤖 agent-template init\n');

  if (!fs.existsSync(AGENTS_SRC)) {
    err('Source .agents/ not found in package. Please reinstall.');
    process.exit(1);
  }

  if (fs.existsSync(destAgents)) {
    warn('.agents/ already exists in this project.');
    warn('Run "npx @trongtin1/agent-template update" to update it instead.');
    process.exit(0);
  }

  log('📂 Installing .agents/ into current project...');
  copyDir(AGENTS_SRC, destAgents);

  log('');
  ok('.agents/ installed successfully!');
  log('');
  info('Next steps:');
  log('  1. Open this folder in Antigravity IDE as a trusted workspace.');
  log('  2. Slash commands like /plan, /commit, /orchestrate are now available.');
  log('  3. Run: npm run check:agents  (if you copied package.json scripts too)');
  log('');
  info('To update later: npx @trongtin1/agent-template update');
  log('');
}

function cmdUpdate() {
  const cwd = process.cwd();
  const destAgents = path.join(cwd, '.agents');

  log(`\n🔄 agent-template update${isDryRun ? ' (dry run)' : ''}\n`);

  if (!fs.existsSync(AGENTS_SRC)) {
    err('Source .agents/ not found in package. Please reinstall.');
    process.exit(1);
  }

  if (!fs.existsSync(destAgents)) {
    warn('No .agents/ found in this project.');
    warn('Run "npx @trongtin1/agent-template init" first.');
    process.exit(0);
  }

  const srcFiles = getAllFiles(AGENTS_SRC);
  const stats = { updated: 0, skipped: 0, conflicted: 0 };

  for (const relFile of srcFiles) {
    const srcFile  = path.join(AGENTS_SRC, relFile);
    const destFile = path.join(destAgents, relFile);

    const destExists = fs.existsSync(destFile);

    if (destExists && isGitModified(path.join('.agents', relFile))) {
      // User has modified this file — save incoming copy, don't overwrite
      const incomingFile = destFile + '.incoming';
      if (!isDryRun) {
        fs.mkdirSync(path.dirname(destFile), { recursive: true });
        fs.copyFileSync(srcFile, incomingFile);
      }
      warn(`CONFLICT  .agents/${relFile}  → saved as .incoming`);
      stats.conflicted++;
    } else {
      // Safe to update
      if (!isDryRun) {
        fs.mkdirSync(path.dirname(destFile), { recursive: true });
        fs.copyFileSync(srcFile, destFile);
      }
      if (!destExists) {
        info(`NEW       .agents/${relFile}`);
      } else {
        log(`  updated  .agents/${relFile}`);
      }
      stats.updated++;
    }
  }

  log('');
  if (isDryRun) {
    info(`Dry run complete. ${stats.updated} file(s) would be updated, ${stats.conflicted} conflict(s).`);
    info('Remove --dry-run to apply changes.');
  } else {
    ok(`Update complete.`);
    log(`  Updated:    ${stats.updated}`);
    log(`  Conflicts:  ${stats.conflicted}  (saved as .incoming — review and merge manually)`);
  }
  log('');
}

function cmdHelp() {
  log(`
Usage: npx @trongtin1/agent-template <command> [options]

Commands:
  init              Install .agents/ into the current project
  update            Update .agents/ to the latest version (merge-aware)
  update --dry-run  Preview what would change, without applying

Examples:
  npx @trongtin1/agent-template init
  npx @trongtin1/agent-template update
  npx @trongtin1/agent-template update --dry-run
`);
}

// ── Router ────────────────────────────────────────────────────────────────────

switch (command) {
  case 'init':   cmdInit();   break;
  case 'update': cmdUpdate(); break;
  default:       cmdHelp();
}
