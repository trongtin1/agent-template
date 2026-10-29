---
type: project
created: 2026-05-25
updated: 2026-09-07
---

# Project Conventions

## Git Workflow
- **MANDATORY APPROVAL GATE**: Never run `git commit`, `git push`, or any state-modifying Git command without first showing the proposed changes/commit message and waiting for user approval.
- Always create a new dedicated branch for major code changes.
- Branch name format should follow: `feature/[task-slug]` or `fix/[bug-slug]`.

## Supported AI platforms & Toolkit Identity (Agent Kit)
- Agent Kit supports **Claude Code, Cursor, Codex, VS Code Copilot, Antigravity and Gemini CLI**; IDE files are generated from `.agents/` by `sync_targets.mjs --target` (never hand-edited).
- Do not claim compatibility with Claude Code, Cursor, Copilot, Windsurf, or other assistants unless the user explicitly expands scope.
- Copy on the website, docs, FAQ, README, and marketing should describe Agent Kit as a toolkit for Gemini CLI / multi-IDE agent setups.
- **Toolkit Independence & Ownership**: This is Agent Kit. NEVER reference external repos (e.g. GSD or others) in docs, commit messages, comments, or rules. All patterns belong natively to Agent Kit.

## Context Continuity & Token Efficiency
- **AI Relay Baton**: Maintain structured `task_on_progress.md` for in-flight tasks across multi-turn or cross-session work; update system architecture knowledge and delete upon 100% completion.
- **Surgical Token Diet**: Never read whole files > 100 lines blindly. Extract outlines with `code_outline.py` and inspect bounded slices.

