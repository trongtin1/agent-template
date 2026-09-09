---
name: commit
description: Automated, safe Git commit workflow. Reviews status and diff, checks for secrets, drafts Conventional Commits with scope, and commits safely.
version: 1.0.0
requires_agents: orchestrator
requires_skills: git-master, clean-code
artifact_outputs: commit-log
---

# `/commit` — Automated Safe Git Commit Workflow

> Inspect `git status` and `git diff`, run secret checks, draft a Conventional Commit with scope, and commit safely.

---

## 📋 Execution Protocol

### Step 1: Status & Safety Audit
Run `git status -s` to inspect all tracked, modified, and untracked files.
```bash
git status -s
```
- Verify NO secret files (`.env`, `.pem`, `credentials.json`, `*.key`) are being staged or added.
- If an unwanted file is detected, stop immediately and warn the user.

### Step 2: Diff Analysis
Review the exact changes made:
```bash
# If files are already staged:
git diff --staged --stat
# If files are not staged:
git diff --stat
```

### Step 3: Draft Conventional Commit Message
Analyze the changes and draft a commit message conforming to `@[skills/git-master]`:
- **Format**: `type(scope): concise description`
- **Types**: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `style`.
- **Examples**:
  - `feat(ast): add ast-grep tree-sitter intelligence`
  - `fix(auth): handle expired jwt token gracefully`
  - `refactor(db): extract user repository layer`
  - `docs(readme): update quick-start guide`

### Step 4: User Approval Gate (MANDATORY)
Present the prepared commit plan to the user:
- List of files to be staged/committed
- Summary of diff / changes
- Proposed commit message: `type(scope): concise description`

🛑 **HALT AND WAIT**: Do NOT execute `git commit`, `git push`, or any state-changing Git command until the user explicitly responds with approval.

### Step 5: Execute Commit (Only After Explicit Approval)
Once the user confirms approval:
```bash
git add <target-files>
git commit -m "type(scope): concise description"
```
Report the committed SHA and summary to the user.

---

## After Commit

Tell user:
```
👉 **Next Recommended Step**:
- Run `/deploy` if your project is ready for release/staging deployment.
- Or run `/plan [next-feature]` to start planning your next task.
```

> ⚠️ **Note on `git push`**: Never run `git push` automatically. Always ask for separate user confirmation before pushing to remote.
