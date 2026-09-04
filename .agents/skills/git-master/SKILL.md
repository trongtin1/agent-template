---
name: git-master
description: Git version control intelligence, Conventional Commits standard, safe branching, and Git worktree isolation.
when_to_use: "Use when creating Git commits, reviewing git diff, drafting PR descriptions, setting up feature branches, using Git worktrees, or avoiding Git pitfalls (force-pushing on main, leaking secrets)."
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
version: 1.0.0
effort: medium
---

# Git Master — Professional Version Control Intelligence

> A disciplined, production-grade approach to Git: Conventional Commits with scope, atomic changes, and isolated branch workflows.

---

## 🎯 Core Principles

1. **🔴 Mandatory User Approval Gate**: NEVER execute `git commit`, `git push`, `git checkout -b`, `git reset`, `git rebase`, or any state-changing Git command without presenting the proposed action and waiting for the user's explicit confirmation.
2. **Atomic Commits**: One commit = one complete, working logical change. Never mix refactoring with feature code or dependency bumps.
3. **Conventional Commits with Scope**: Every commit message must follow `type(scope): concise description`.
4. **Secret Hygiene**: Never stage or commit credentials, `.env` files, SSH keys, or local tokens.
5. **Main Branch Protection**: Never force-push (`push --force`) to `main` or `master`. Always prefer rebase or clean feature branches.

---

## 📝 Conventional Commits Reference

Format:
```text
type(scope): imperative, present-tense description

[optional body: explain WHAT and WHY, not HOW]

[optional footer: Closes #123, BREAKING CHANGE: ...]
```

### Type Matrix

| Type | When to use | Example |
| :--- | :--- | :--- |
| `feat` | A new feature or capability | `feat(auth): add OAuth2 login provider` |
| `fix` | A bug fix | `fix(cart): resolve race condition in quantity update` |
| `refactor` | Code restructuring without behavior change | `refactor(db): extract repository pattern from service` |
| `perf` | Performance optimization | `perf(image): add lazy-loading and blur placeholders` |
| `test` | Adding or updating tests | `test(api): add integration test for user registration` |
| `docs` | Documentation changes only | `docs(readme): add environment variable setup guide` |
| `style` | Formatting, missing semi-colons, white-space | `style(ui): format tailwind class ordering` |
| `chore` | Build tasks, configs, dependency updates | `chore(deps): bump @ast-grep/cli to 0.45.3` |

### Scope Conventions
- Use the affected component or domain: `(auth)`, `(ui)`, `(api)`, `(db)`, `(ast)`, `(deps)`, `(gate)`.
- Keep scopes lowercase and concise.

---

## 🛡️ Git Safety Protocol

### 1. Pre-Commit Secret Check
Before staging or committing, always verify no sensitive files are exposed:
```bash
git status -s
```
**Forbidden in Staging**:
- `.env`, `.env.local`, `.env.*`
- `*.pem`, `*.key`, `id_rsa`
- `credentials.json`, `service-account.json`
- `node_modules/`, `dist/`, `.DS_Store`

### 2. Inspecting the Exact Diff
Always review what will be committed:
```bash
# Review unstaged changes
git diff

# Review staged changes
git diff --staged
```

### 3. Safe Commit Command
```bash
# Stage specific files (avoid blind git add .)
git add path/to/file1 path/to/file2

# Commit with conventional format
git commit -m "type(scope): imperative summary"
```

---

## 🌿 Git Worktree for Task Isolation

When working on large, independent features or experiments, use **Git Worktree** to prevent disturbing the main working directory:

```bash
# Create a new branch and check it out in a parallel directory
git worktree add ../feature-branch -b feature/my-feature

# Work inside the isolated folder
cd ../feature-branch

# Once done and merged, remove the worktree
git worktree remove ../feature-branch
```

---

## 🚫 Anti-Patterns to Avoid

- ❌ Vague commit messages: `update`, `fix bug`, `changes`, `wip`.
- ❌ Giant "kitchen-sink" commits touching 30 unrelated files with 5 different features.
- ❌ Committing broken code that fails build or tests.
- ❌ Force-pushing to shared branches (`git push -f origin main`).
