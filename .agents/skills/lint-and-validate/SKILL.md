---
name: lint-and-validate
description: "Automatic quality control, linting, and static analysis procedures. Use after every code modification to ensure syntax correctness and project standards. Triggers on keywords: lint, format, check, validate, types, static analysis."
when_to_use: "When running linters, type checkers, or code formatters. After any code change that needs quality validation."
allowed-tools: Read, Glob, Grep, Bash
version: 1.0.0
---

# Lint and Validate Skill

> **MANDATORY:** Run appropriate validation tools after EVERY code change. Do not finish a task until the code is error-free.

### Procedures by Ecosystem

#### Node.js / TypeScript / Next.js / Tailwind
1. **Lint & Auto-Fix:** `npm run lint` or `npx eslint . --fix`
2. **Types:** `npx tsc --noEmit`
3. **Tailwind Hygiene:** Adhere to canonical classes (`shrink-0`, `bg-linear-to-*`, `grow`) and resolve IDE extension suggestions.
4. **Security:** `npm audit --audit-level=high`

#### Python
1. **Linter (Ruff):** `ruff check "path" --fix` (Fast & Modern)
2. **Security (Bandit):** `bandit -r "path" -ll`
3. **Types (MyPy):** `mypy "path"`

## The Quality Loop (Dynamic Self-Healing)
1. **Write/Edit Code**
2. **Check IDE Diagnostics & Run Audit:**
   - Listen to IDE feedback from language servers (ESLint, Tailwind IntelliSense, TypeScript LSP).
   - Run: `npm run lint && npx tsc --noEmit`
3. **Auto-Fix First:** Run `npx eslint . --fix` to automatically clean up unused imports, formatting, and auto-fixable rules.
4. **Fix Remaining Warnings & Errors:**
   - Next.js: Replace `<img>` with `next/image`, replace internal `<a>` with `next/link`.
   - React JSX: Escape quotes (`&apos;`, `&ldquo;`, `&rdquo;` or `{"'"}`).
   - Tailwind: Replace obsolete class aliases with canonical classes, remove conflicting utility classes.
   - Clean Scope: Remove unused variables/imports (`no-unused-vars`).
5. **Verify:** Ensure final Diagnostics count is 0. Submitting code with active warnings or errors is NOT allowed.

## Error Handling
- If `lint` fails: Fix the style or syntax issues immediately.
- If `tsc` fails: Correct type mismatches before proceeding.
- If Tailwind extension warns on canonical classes: Update to modern v4 classes immediately.
- If no tool is configured: Check the project root for `.eslintrc`, `tsconfig.json`, `pyproject.toml` and suggest creating one.

---
**Strict Rule:** No code should be committed or reported as "done" without passing these checks.

---

## Scripts

| Script | Purpose | Command |
|--------|---------|---------|
| `scripts/lint_runner.py` | Unified lint check | `python scripts/lint_runner.py <project_path>` |
| `scripts/type_coverage.py` | Type coverage analysis | `python scripts/type_coverage.py <project_path>` |


