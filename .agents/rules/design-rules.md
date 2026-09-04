---
name: design-rules
version: 1.0.0
priority: P0
trigger: glob
globs: "**/*.{tsx,jsx,vue,svelte,css,scss},**/components/**,**/app/**/page.tsx"
---

# Design Rules (TIER 2) - AG Kit

> Loaded when touching UI files. Design rules live in the specialist agents, NOT here.

## 🛑 GATE: DESIGN.md before any UI code (MANDATORY)

Before writing or editing UI (components, pages, styles — web or mobile), a **`DESIGN.md` must exist at the project root**.

1. **Check** for `DESIGN.md` at the project root.
2. **If missing:** infer the design direction from the brief, then **create `DESIGN.md` first** (tokens + rationale) following the `design-spec` skill. Do not write UI code until it exists.
3. **If present:** READ it and build strictly against its tokens. Descriptive names in prose map to token names.
4. **Keep it in sync** when the visual language changes — it is the single source of truth.

> Exception: none for new UI. A genuinely trivial tweak to existing UI (one button color, a spacing nudge) may proceed if a `DESIGN.md` already governs the project. Net-new UI always requires the gate.

| Need | Read |
| ---- | ---- |
| DESIGN.md format / tokens | `.agents/skills/design-spec/SKILL.md` |

---

| Task         | Read                            |
| ------------ | ------------------------------- |
| Web UI/UX    | `.agents/agent/frontend-specialist.md` |
| Mobile UI/UX | `.agents/agent/mobile-developer.md`    |

**These agents contain:**

- **Frontend Design Bar**: Judged by eye, not code. Beauty comes from assembly (motion, rhythm, contrast, depth).
- **Swap-Test**: If swapping text & color turns it into an interchangeable template, the design is too weak.
- **Purple Ban**: No purple by default (`#8B5CF6`, `#A855F7`) — brand/brief override allowed.
- **Template Ban**: No generic 3-column feature grids or text-on-void hero sections.
- **Focal Artifact**: Every hero must have a tangible visual focal point (3D, canvas, mockup, kinetic art).

---

## 🔍 Mandatory Post-UI Quality Loop

Immediately after creating or modifying any UI files:

1. **Static UX & A11y Audit**:
   - Run `python .agents/skills/frontend-design/scripts/ux_audit.py`
   - Run `python .agents/skills/frontend-design/scripts/accessibility_checker.py`
2. **Visual Inspection**:
   - When a preview server is available, inspect rendered screenshots via `browser_subagent` to verify typography hierarchy, responsive breakpoints, and motion smoothness.
