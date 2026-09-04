---
name: ast-grep
description: Structural code search, AST pattern matching, and syntax-safe refactoring using Tree-sitter and ast-grep.
when_to_use: "Use when searching or modifying code by syntax structure rather than text/regex, extracting code outlines from large files, refactoring across files, or finding semantic anti-patterns (empty catch, missing await, unhandled promises)."
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
version: 1.0.0
effort: medium
---

# `ast-grep` — Structural AST Code Intelligence

> Move beyond text-based regex into deterministic, syntax-aware code analysis and surgical refactoring using **Tree-sitter AST**.

---

## 🎯 The 3-Tier Code Navigation Matrix

Always pick the right tool for the job:

| Tier | Tool | What it sees | Best for |
| :--- | :--- | :--- | :--- |
| **Tier 1: Text** | `ripgrep` / `grep` | Raw characters & regex strings | Finding string literals, filenames, comments, simple text patterns. |
| **Tier 2: Syntax (AST)** | **`ast-grep`** (`sg`) | Syntax tree nodes (AST), scopes, statements | Structural search, AST pattern replacement, catching silent bugs, refactoring code safely. |
| **Tier 3: Semantics** | `CodeGraph` (`code-review-graph`) | Call graphs, symbols, cross-file blast radius | Understanding architecture, finding who calls what, cross-file dependencies. |

---

## 🚀 Execution Modes

You can run `ast-grep` in three ways depending on environment availability:

1. **Local Project CLI (Fastest)**:
   ```bash
   npx ast-grep <command>
   ```
2. **On-Demand Package Runner**:
   ```bash
   npx -p @ast-grep/cli ast-grep <command>
   ```
3. **Native Binary (if installed globally)**:
   ```bash
   sg <command>
   ```

---

## 🧩 AST Pattern Syntax (Meta-Variables)

`ast-grep` matches AST nodes using natural code syntax with meta-variables:

| Meta-Variable | Meaning | Example |
| :--- | :--- | :--- |
| `$VAR` | Matches **a single AST node** (variable, expression, identifier) | `foo($A)` matches `foo(1)` or `foo(bar)` |
| `$$$ARGS` | Matches **zero or more AST nodes** (parameter lists, statement blocks) | `function $NAME($$$ARGS) { $$$BODY }` |
| `$$$` | Wildcard matching any sequence without capturing | `if ($COND) { $$$ }` |

> ⚠️ **Windows / PowerShell Pitfall (CRITICAL):**
> On Windows PowerShell, **ALWAYS enclose patterns in single quotes `'...'`** (NOT double quotes `"`).
> Double quotes cause PowerShell to evaluate `$VAR` or `$ARGS` as empty PowerShell shell variables!
> ```powershell
> # ❌ WRONG (PowerShell wipes out $NAME):
> npx ast-grep run --pattern "function $NAME($$$ARGS) { $$$BODY }"
>
> # ✅ CORRECT:
> npx ast-grep run --pattern 'function $NAME($$$ARGS) { $$$BODY }' --lang js
> ```

### Key Rule: No False Matches in Comments or Strings
Unlike regex, `ast-grep` parses actual AST tokens. It **never** matches inside strings, comments, or unrelated scopes!

---

## 🛠️ Common Workflows

### 1. Structural Search (Finding Code Patterns)
```bash
# Find all empty catch blocks in TypeScript/JavaScript
npx ast-grep run --pattern 'catch ($ERR) { }' --lang typescript

# Find all database queries without await
npx ast-grep run --pattern '$RES = db.query($$$ARGS)' --lang typescript

# Find all Promise.then calls without .catch()
npx ast-grep run --pattern '$P.then($CB)' --lang typescript
```

### 2. Syntax-Safe Refactoring (Structural Rewrite)
```bash
# Safely remove all console.log calls
npx ast-grep run --pattern 'console.log($$$ARGS)' --rewrite '' --lang typescript -i

# Migrate deprecated API signature across files
npx ast-grep run --pattern 'oldApi.fetchUser($ID, $CB)' --rewrite 'newApi.getUser({ id: $ID }, $CB)' --lang typescript -i
```

### 3. Extracting Code Outlines (Token Saver)
Before reading an entire 2000-line file into context, extract its structural outline:
```bash
python .agents/skills/ast-grep/scripts/ast_outline.py path/to/file.py
# Or for JavaScript / TypeScript / general files:
python .agents/skills/ast-grep/scripts/ast_outline.py path/to/file.ts
```
This prints classes, function signatures, methods, and line ranges — reducing token consumption by up to **90%**!

---

## 📋 Standard AST Anti-Pattern Library

### JavaScript / TypeScript
- **Empty Catch Block**:
  ```bash
  npx ast-grep run --pattern 'catch ($E) {}' --lang ts
  ```
- **Unhandled Async Function**:
  ```bash
  npx ast-grep run --pattern 'async function $F($$$A) { $$$B }' --lang ts
  ```
- **Dangerous Type Cast**:
  ```bash
  npx ast-grep run --pattern '$X as any' --lang ts
  ```

### Python
- **Bare Except**:
  ```bash
  npx ast-grep run --pattern 'except: $$$' --lang python
  ```
- **Silent Pass Block**:
  ```bash
  npx ast-grep run --pattern 'except $E: pass' --lang python
  ```

---

## 🔒 Safety Guidelines

1. **Always Preview Before Rewrite**:
   - Run without `-i` (interactive/in-place) first to preview all matches and diffs.
2. **Verify After Modification**:
   - Always run `npm run test` or typecheck (`tsc --noEmit`) after performing AST batch rewrites.
3. **Combine with CodeGraph**:
   - Use `CodeGraph` to find the blast radius (which files are affected), then use `ast-grep` to perform the surgical AST rewrites across those files.
