---
name: enhance
description: Add or update features in existing application. Used for iterative development.
version: 1.1.0
model: sonnet
requires_agents: code-archaeologist
requires_skills: simplify-code, clean-code, verify-changes
artifact_outputs: change-plan, changed-files, verification-report
---

# /enhance - Update Application

$ARGUMENTS

---

## Task

This command adds features or makes updates to existing application.

### Steps:

1. **Scope**
   - Read only the files the change touches. Use `python .agents/scripts/code_outline.py <file>` before opening large files.
   - Run `python .agents/scripts/session_manager.py info` only if the tech stack is still unclear.

2. **Present Plan** (major changes only: new modules, auth, data model, or more than ~5 files)
   ```
   "To add admin panel:
   - New files: admin routes, components, and access control
   - Updates: navigation, auth middleware
   - Scope: moderate (touches auth + routing)
   
   Should I start?"
   ```

3. **Apply** in this session. Do not fan out to multiple agents.
   - Delegate to at most ONE specialist, and only when the change needs knowledge you lack (e.g. `code-archaeologist` for unfamiliar legacy code).

4. **Verify once**
   - Run the existing tests and lint for the touched area.
   - Restart the preview only if a dev server is already running.

---

## After Enhancements

Tell user:
```
👉 **Next Recommended Step**:
- Run `/verify` to test and validate the modified functionality.
- Run `/preview` to visually inspect the updated UI.
- Run `/commit` once verified to stage and commit changes safely.
```

---

## Usage Examples

```
/enhance add dark mode
/enhance build admin panel
/enhance integrate payment system
/enhance add search feature
/enhance edit profile page
/enhance make responsive
```

---

## Caution

- Get approval for major changes
- Warn on conflicting requests (e.g., "use Firebase" when project uses PostgreSQL)
- Commit each change with git
