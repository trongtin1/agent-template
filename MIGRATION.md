# 🚀 AG Kit Migration Guide

> Operational migration guidance for AG Kit releases, component synchronization, and Antigravity IDE configuration.

---

## 📅 Versioning Strategy

Starting with release `2026.5.13`, AG Kit uses **Dual Versioning**:
- **Toolkit Releases**: Use Calendar Versioning in `YYYY.M.D` format (current: `2026.8.31`).
- **Managed Components**: Agents, skills, workflows, checklists, and rules track individual Semantic Versioning (`x.y.z`) in their YAML frontmatter, recorded in `.agents/manifest.json`.

---

## 🔄 Migrating to 2026.8.31

### Key Changes in 2026.8.31
1. **Design Source-of-Truth (`DESIGN.md`)**:
   - Building UI via `app-builder` now requires or anchors to a `DESIGN.md` specification before generating frontend code.
2. **AI & Game Application Patterns**:
   - Added support for Vercel AI SDK streaming, `pgvector`, Drizzle ORM, and `game-development` skill routing.
3. **AST Tree-Sitter Intelligence**:
   - Integrated `@ast-grep/cli` and `ast_outline.py` for structural code search and token-efficient AST outlines.
4. **Phase Gate Checklists**:
   - Added 5 quality gates in `.agents/checklists/` to ensure requirements, architecture, design, dev, and QA standards are met.
5. **Windows-Native Compatibility**:
   - Standardized CRLF/LF handling, UTF-8 BOM tolerance, and `pathToFileURL` in validation scripts.

---

## 🛠️ Step-by-Step Upgrade Procedure

### 1. Verify Current Workspace State
Before upgrading, check that your workspace passes all current structural checks:
```bash
npm run check:agents
npm run check:antigravity
```

### 2. Synchronize Manifest and Dependencies
After updating or adding any agents, skills, or workflows:
```bash
npm run sync:manifest
```
This updates `.agents/manifest.json`, recalculates cryptographic hashes in `.agents/manifest.lock.json`, and rebuilds `.agents/DEPENDENCY_GRAPH.md`.

### 3. Verify Antigravity Doctor
Run the doctor to confirm hook, MCP, and runtime health:
```bash
npm run check:antigravity
npm run test:antigravity
```

---

## ⏪ Rollback Procedure

If a component upgrade introduces regressions:
1. Revert the component file in `.agents/` to its prior git revision:
   ```bash
   git checkout HEAD~1 -- .agents/skills/[affected-skill]/
   ```
2. Re-synchronize the manifest registry:
   ```bash
   npm run sync:manifest
   ```
3. Run verification to confirm the lock file matches:
   ```bash
   npm run check:agents
   ```
