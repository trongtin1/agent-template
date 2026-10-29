#!/usr/bin/env node
/**
 * Tailwind Language Server Linter & Auto-Fixer
 * 
 * Uses @tailwindcss/language-server over stdio (JSON-RPC) to lint files,
 * parse diagnostics (especially `suggestCanonicalClasses`), and optionally
 * auto-fix them in a self-healing loop until 0 warnings remain.
 * 
 * Usage:
 *   node tailwind_lint.mjs [project_dir] [--fix] [--loop] [--max-passes=5] [--json]
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXTENSIONS = new Map([
  ['.html', 'html'],
  ['.jsx', 'javascriptreact'],
  ['.tsx', 'typescriptreact'],
  ['.js', 'javascript'],
  ['.ts', 'typescript'],
  ['.vue', 'vue'],
  ['.svelte', 'svelte'],
  ['.astro', 'astro'],
  ['.css', 'css'],
  ['.php', 'php'],
  ['.md', 'markdown'],
  ['.mdx', 'markdown'],
]);

const IGNORED_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  '.nuxt',
  'dist',
  'build',
  'out',
  '.agents',
  'coverage',
  '.vercel',
  '.turbo',
  '.output',
]);

function parseArgs() {
  const args = process.argv.slice(2);
  let projectDir = '.';
  let fix = false;
  let loop = false;
  let maxPasses = 5;
  let jsonOutput = false;

  for (const arg of args) {
    if (arg === '--fix') {
      fix = true;
      loop = true;
    } else if (arg === '--loop') {
      loop = true;
    } else if (arg === '--json') {
      jsonOutput = true;
    } else if (arg.startsWith('--max-passes=')) {
      maxPasses = parseInt(arg.split('=')[1], 10) || 5;
    } else if (!arg.startsWith('-')) {
      projectDir = arg;
    }
  }

  return {
    projectDir: path.resolve(process.cwd(), projectDir),
    fix,
    loop,
    maxPasses,
    jsonOutput,
  };
}

function findFiles(dir, collected = []) {
  if (!fs.existsSync(dir)) return collected;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) {
        findFiles(path.join(dir, entry.name), collected);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (EXTENSIONS.has(ext)) {
        collected.push(path.join(dir, entry.name));
      }
    }
  }

  return collected;
}

function findLanguageServerBinary(projectDir) {
  // 1. Check local project node_modules
  const localProjectBin = path.join(
    projectDir,
    'node_modules',
    '@tailwindcss',
    'language-server',
    'bin',
    'tailwindcss-language-server'
  );
  if (fs.existsSync(localProjectBin)) return { path: localProjectBin, isNodeScript: true };

  // 2. Check toolkit/workspace node_modules
  const toolkitBin = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'node_modules',
    '@tailwindcss',
    'language-server',
    'bin',
    'tailwindcss-language-server'
  );
  if (fs.existsSync(toolkitBin)) return { path: toolkitBin, isNodeScript: true };

  // 3. Fallback to npx
  return { path: 'tailwindcss-language-server', isNodeScript: false };
}

function getOffsetFromPosition(content, line, character) {
  const lines = content.split('\n');
  let offset = 0;
  for (let i = 0; i < line && i < lines.length; i++) {
    offset += lines[i].length + 1; // +1 for '\n'
  }
  return offset + character;
}

function applyDiagnosticsFixes(filePath, diagnostics) {
  if (!fs.existsSync(filePath)) return { changed: false, fixedCount: 0 };
  let content = fs.readFileSync(filePath, 'utf8');

  // Filter fixable canonical classes diagnostics
  const fixable = diagnostics.filter(
    (d) =>
      d.code === 'suggestCanonicalClasses' &&
      ((d.suggestions && d.suggestions.length > 0) ||
        (d.message && d.message.includes('can be written as')))
  );

  if (fixable.length === 0) return { changed: false, fixedCount: 0 };

  // Sort reverse: highest line first, then highest column first
  fixable.sort((a, b) => {
    if (b.range.start.line !== a.range.start.line) {
      return b.range.start.line - a.range.start.line;
    }
    return b.range.start.character - a.range.start.character;
  });

  let fixedCount = 0;
  for (const diag of fixable) {
    let suggestion = diag.suggestions && diag.suggestions[0];
    if (!suggestion && diag.message) {
      const match = diag.message.match(/can be written as `([^`]+)`/);
      if (match) suggestion = match[1];
    }
    if (!suggestion) continue;

    const startOffset = getOffsetFromPosition(content, diag.range.start.line, diag.range.start.character);
    const endOffset = getOffsetFromPosition(content, diag.range.end.line, diag.range.end.character);

    if (startOffset >= 0 && endOffset <= content.length && startOffset < endOffset) {
      content = content.slice(0, startOffset) + suggestion + content.slice(endOffset);
      fixedCount++;
    }
  }

  if (fixedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { changed: true, fixedCount };
  }

  return { changed: false, fixedCount: 0 };
}

/**
 * Runs a single pass of Tailwind Language Server linting
 */
async function runLspCheck(projectDir, files) {
  return new Promise((resolve) => {
    const fileDiagnostics = new Map();
    for (const f of files) {
      fileDiagnostics.set(f, []);
    }

    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      try {
        cp.kill();
      } catch (_) {}
      resolve(fileDiagnostics);
    };

    const binInfo = findLanguageServerBinary(projectDir);
    let cp;

    if (binInfo.isNodeScript) {
      cp = spawn(process.execPath, [binInfo.path, '--stdio'], {
        cwd: projectDir,
        stdio: ['pipe', 'pipe', 'pipe'],
      });
    } else {
      cp = spawn('npx', ['--yes', '--package=@tailwindcss/language-server', 'tailwindcss-language-server', '--stdio'], {
        cwd: projectDir,
        shell: process.platform === 'win32',
        stdio: ['pipe', 'pipe', 'pipe'],
      });
    }

    cp.stderr.on('data', (d) => console.error('[LSP STDERR]', d.toString()));

    let buf = Buffer.alloc(0);

    function send(msg) {
      try {
        const str = JSON.stringify(msg);
        const header = `Content-Length: ${Buffer.byteLength(str, 'utf8')}\r\n\r\n`;
        cp.stdin.write(header + str);
      } catch (_) {}
    }

    cp.stdout.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      while (true) {
        const delimiter = Buffer.from('\r\n\r\n');
        const idx = buf.indexOf(delimiter);
        if (idx === -1) break;
        const headerStr = buf.subarray(0, idx).toString('utf8');
        const m = headerStr.match(/Content-Length:\s*(\d+)/i);
        if (!m) {
          buf = buf.subarray(idx + 4);
          continue;
        }
        const len = parseInt(m[1], 10);
        const bodyStart = idx + 4;
        if (buf.length < bodyStart + len) break;
        const body = buf.subarray(bodyStart, bodyStart + len).toString('utf8');
        buf = buf.subarray(bodyStart + len);
        try {
          const msg = JSON.parse(body);
          handleMessage(msg);
        } catch (_) {}
      }
    });

    let pendingFiles = new Set(files);
    let timeoutTimer = null;

    function resetTimer(ms = 2500) {
      if (timeoutTimer) clearTimeout(timeoutTimer);
      timeoutTimer = setTimeout(() => {
        finish();
      }, ms);
    }

    function openAllFiles() {
      for (const filePath of files) {
        const ext = path.extname(filePath).toLowerCase();
        const langId = EXTENSIONS.get(ext) || 'html';
        const fileUri = pathToFileURL(filePath).href;
        let fileText = '';
        try {
          fileText = fs.readFileSync(filePath, 'utf8');
        } catch (_) {}

        send({
          jsonrpc: '2.0',
          method: 'textDocument/didOpen',
          params: {
            textDocument: {
              uri: fileUri,
              languageId: langId,
              version: 1,
              text: fileText,
            },
          },
        });
      }
    }

    function handleMessage(msg) {
      // Respond to any server requests that have an id
      if (msg.id !== undefined && msg.method) {
        if (msg.method === 'workspace/configuration') {
          const results = (msg.params?.items || []).map((item) => {
            if (item.section === 'tailwindCSS') {
              return {
                validate: true,
                lint: {
                  suggestCanonicalClasses: 'warning',
                  invalidApply: 'error',
                  invalidScreen: 'error',
                  invalidVariant: 'error',
                  invalidConfigPath: 'error',
                  invalidTailwindDirective: 'error',
                  recommendedVariantOrder: 'warning',
                },
                classAttributes: ['class', 'className', 'class:list', 'classList'],
                includeLanguages: {
                  html: 'html',
                  javascript: 'javascript',
                  javascriptreact: 'javascriptreact',
                  typescript: 'typescript',
                  typescriptreact: 'typescriptreact',
                  vue: 'html',
                  svelte: 'html',
                  astro: 'html',
                  css: 'css',
                },
              };
            }
            return {};
          });

          send({
            jsonrpc: '2.0',
            id: msg.id,
            result: results,
          });
          return;
        }

        // Generic response for other server requests (like client/registerCapability)
        send({
          jsonrpc: '2.0',
          id: msg.id,
          result: null,
        });
        return;
      }

      // When the project is initialized, touch files if needed
      if (msg.method === '@/tailwindCSS/projectInitialized') {
        openAllFiles();
        resetTimer(4000);
        return;
      }

      // Collect diagnostics
      if (msg.method === 'textDocument/publishDiagnostics') {
        resetTimer(1500);
        const rawUri = msg.params?.uri || '';
        let filePath = '';
        try {
          filePath = fileURLToPath(rawUri);
        } catch (_) {
          filePath = rawUri.replace(/^file:\/\/\/?/, '');
        }

        const normalizedFilePath = path.normalize(filePath);
        const diags = msg.params?.diagnostics || [];

        for (const [f] of fileDiagnostics.entries()) {
          if (path.normalize(f).toLowerCase() === normalizedFilePath.toLowerCase()) {
            fileDiagnostics.set(f, diags);
            pendingFiles.delete(f);
            break;
          }
        }

        if (pendingFiles.size === 0) {
          setTimeout(finish, 400);
        }
      }
    }

    cp.on('error', () => {
      finish();
    });

    const rootUri = pathToFileURL(projectDir).href;

    // 1. Send initialize
    send({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        processId: process.pid,
        rootUri: rootUri,
        rootPath: projectDir,
        capabilities: {
          textDocument: {
            publishDiagnostics: { relatedInformation: true, tagSupport: { valueSet: [1, 2] } },
          },
          workspace: { configuration: true },
        },
        initializationOptions: {
          userLanguages: {
            typescriptreact: 'javascriptreact',
            javascriptreact: 'javascriptreact',
          },
        },
      },
    });

    setTimeout(() => {
      send({ jsonrpc: '2.0', method: 'initialized', params: {} });
      openAllFiles();
      resetTimer(6000);
    }, 1000);

    // Hard ceiling timeout (18 seconds)
    setTimeout(finish, 18000);
  });
}

async function main() {
  const { projectDir, fix, loop, maxPasses, jsonOutput } = parseArgs();

  if (!jsonOutput) {
    console.log(`\n============================================================`);
    console.log(`[TAILWIND LSP LINTER] Canonical Classes & Quality Check`);
    console.log(`============================================================`);
    console.log(`Project: ${projectDir}`);
    console.log(`Auto-Fix: ${fix ? 'Enabled' : 'Disabled'}`);
    console.log(`------------------------------------------------------------`);
  }

  const files = findFiles(projectDir);
  if (files.length === 0) {
    if (!jsonOutput) console.log('No matching frontend files found.');
    process.exit(0);
  }

  let pass = 1;
  let totalFixed = 0;
  let currentDiagnostics = null;
  let hasWarnings = false;

  while (pass <= maxPasses) {
    if (!jsonOutput && (fix || loop) && pass > 1) {
      console.log(`\n--- Verification Pass ${pass}/${maxPasses} ---`);
    }

    currentDiagnostics = await runLspCheck(projectDir, files);

    let passDiagnosticsCount = 0;
    const fileEntriesWithIssues = [];

    for (const [filePath, diags] of currentDiagnostics.entries()) {
      if (diags.length > 0) {
        passDiagnosticsCount += diags.length;
        fileEntriesWithIssues.push({ filePath, diags });
      }
    }

    if (passDiagnosticsCount === 0) {
      if (!jsonOutput) {
        console.log(`\n✅ All Tailwind diagnostics clear! 0 warnings found.`);
        if (totalFixed > 0) {
          console.log(`🎉 Successfully auto-fixed ${totalFixed} non-canonical class(es).`);
        }
      } else {
        console.log(JSON.stringify({ passed: true, issuesCount: 0, fixedCount: totalFixed, issues: [] }, null, 2));
      }
      process.exit(0);
    }

    // Report diagnostics
    if (!jsonOutput) {
      console.log(`\nFound ${passDiagnosticsCount} diagnostic issue(s):`);
      for (const { filePath, diags } of fileEntriesWithIssues) {
        const relPath = path.relative(projectDir, filePath);
        console.log(`\n📄 ${relPath}:`);
        for (const d of diags) {
          const line = d.range.start.line + 1;
          const col = d.range.start.character + 1;
          const suggestion = d.suggestions?.[0] ? ` -> Suggestion: \x1b[32m${d.suggestions[0]}\x1b[0m` : '';
          console.log(`  [Line ${line}:${col}] [\x1b[33m${d.code || 'warning'}\x1b[0m] ${d.message}${suggestion}`);
        }
      }
    }

    if (fix) {
      let passFixed = 0;
      for (const { filePath, diags } of fileEntriesWithIssues) {
        const result = applyDiagnosticsFixes(filePath, diags);
        if (result.changed) {
          passFixed += result.fixedCount;
        }
      }

      totalFixed += passFixed;
      if (!jsonOutput) {
        console.log(`\n🔧 Pass ${pass}: Applied ${passFixed} canonical fix(es). Re-checking...`);
      }

      if (passFixed === 0) {
        // Cannot fix remaining issues automatically
        hasWarnings = true;
        break;
      }

      pass++;
    } else {
      hasWarnings = true;
      break;
    }
  }

  // If we reached here, some warnings remain
  if (jsonOutput) {
    const issues = [];
    for (const [filePath, diags] of (currentDiagnostics || new Map()).entries()) {
      for (const d of diags) {
        issues.push({
          file: path.relative(projectDir, filePath),
          line: d.range.start.line + 1,
          character: d.range.start.character + 1,
          code: d.code,
          message: d.message,
          suggestions: d.suggestions || [],
        });
      }
    }
    console.log(JSON.stringify({ passed: !hasWarnings, issuesCount: issues.length, fixedCount: totalFixed, issues }, null, 2));
  } else if (hasWarnings) {
    console.log(`\n⚠️  Diagnostics remaining after ${pass} pass(es). Manual fix required.`);
  }

  process.exit(hasWarnings ? 1 : 0);
}

main().catch((err) => {
  console.error('Linter failed with error:', err);
  process.exit(1);
});
