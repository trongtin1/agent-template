---
name: core-protocol
version: 1.0.0
priority: P0
trigger: always_on
---

# Core Protocol - AG Kit

> The highest-priority workspace rules. How the AI loads agents/skills and what it must do before any implementation.

---

## CRITICAL: AGENT & SKILL PROTOCOL (START HERE)

> **MANDATORY:** You MUST read the appropriate agent file and its skills BEFORE performing any implementation. This is the highest priority rule.

### 1. Modular Skill Loading Protocol

Agent activated → Check frontmatter "skills:" → Read SKILL.md (INDEX) → Read specific sections.

- **Selective Reading:** DO NOT read ALL files in a skill folder. Read `SKILL.md` first, then only read sections matching the user's request.
- **Rule Priority:** P0 (Workspace Rules in `.agents/rules/`) > P1 (Agent `.md`) > P2 (SKILL.md). All rules are binding.

### 1.1 Skill Announcement (MANDATORY)

**Every time you load and apply a skill, announce it BEFORE using it** — so the user can verify which knowledge is active.

```markdown
📚 **Using skill: `@[skill-name]`...**
```

- List multiple skills together: `📚 Using skills: @frontend-design + @design-spec...`
- Announce on-demand skills too (e.g. a companion skill pulled from a hub, or `app-builder` for a new app), not just frontmatter ones.
- ❌ Applying a skill without announcing it = **USER CANNOT VERIFY THE SKILL WAS USED**.

### 2. Enforcement Protocol

1. **When agent is activated:**
    - ✅ Activate: Read Rules → Check Frontmatter → Load SKILL.md → Apply All.
2. **Forbidden:** Never skip reading agent rules or skill instructions. "Read → Understand → Apply" is mandatory.

---

## 📁 File Dependency Awareness

**Before modifying ANY file:**

1. If `CODEBASE.md` exists, check its File Dependencies section.
2. Otherwise, discover dependencies with targeted search/import analysis; do not block waiting for a missing file.
3. Identify dependent files and update all affected files together.

---

## 🗺️ System Map & Memory Read

> 🔴 **MANDATORY:** At session start, you MUST read `.agents/memory/MEMORY.md` to load persistent project conventions, user preferences, and decisions.

> 📚 **Catalog lookup (on-demand, NOT every session):** Need the full list of Agents / Skills / Scripts? The `quick-reference` rule has the essentials. For the complete catalog, read `.agents/ARCHITECTURE.md` only when you actually need it (e.g. orchestration, or discovering a skill you're unsure exists) — do NOT load it on every request.

**Path Awareness (Note: the project directory name is `.agents` plural):**

- Agents: `.agents/agent/` (Project)
- Skills: `.agents/skills/` (Project)
- Memory: `.agents/memory/` (Project)
- Runtime Scripts: `.agents/skills/<skill>/scripts/`

---

## 🧠 Read → Understand → Apply

```
❌ WRONG: Read agent file → Start coding
✅ CORRECT: Read → Understand WHY → Apply PRINCIPLES → Code
```

**Before coding, answer:**

1. What is the GOAL of this agent/skill?
2. What PRINCIPLES must I apply?
3. How does this DIFFER from generic output?

---

## 💬 Conversational Alignment & Tri-Phase Proactive Guidance

1. **Clarify Before Execution (Zero Premature Action)**:
   - When discussing requirements, architecture, or problems: agents **MUST** converse with the user, probe hidden assumptions, ask clarifying questions, and present options.
   - **STRICTLY FORBIDDEN**: Modifying code, updating files, or executing implementation plans before receiving explicit user sign-off ("Chốt", "Đồng ý", "Thực thi").
2. **Tri-Phase Proactive Guidance Protocol (Mandatory in Every Chat Turn)**:
   - **Phase 1: Entry Announcement (Identity & Skills Transparency)**:
     Mandatorily announce the active specialist agent and companion skills at the very beginning of the response:
     `🤖 Applying knowledge of @[agent-name]...`
     `📚 Using skill: @[skill-name]...`
   - **Phase 2: Body Context (Active Documentation Routing)**:
     Explicitly identify and recommend which documentation pillar or log file should capture the discussed topic:
     * *Business / Requirements*: Recommend `docs/01-requirements/` (`rules.md`, `stakeholders.md`, `workflows.md`).
     * *System / Database / ADR*: Recommend `docs/02-architecture/` (`database-schema.md`, `system-design.md`).
     * *Interface / Tokens / State*: Recommend `docs/03-ui-specs/` (`screen-specs.md`, `DESIGN.md`).
     * *QA / Sprints / Matrix*: Recommend `docs/04-qa/` (`roadmap-and-phases.md`, `verification-matrix.md`).
     * *Daily Execution / Bugfix*: Automatically route to `docs/worklog/YYYY-MM-DD.md`.
   - **Phase 3: Exit Guidance (Next Slash Command Navigation)**:
     At the conclusion of every response, agents **MUST** utilize Google Antigravity's proactive slash command recommendation pattern (`👉 Next Recommended Step`), suggesting 1–2 actionable next workflows (e.g. `/plan`, `/party`, `/verify`, `/worklog`, `/commit`).

---

## 🎯 Session Continuity & AI Relay Handoff Protocol (`_goals.md` / `task_on_progress.md`)

When working on tasks across long sessions, model context limits, or agent handoffs:

1. **Session Start (Continuity Check)**:
   - Check if `task_on_progress.md` or `_goals.md` exists in the project root.
   - If present, read the handoff snapshot immediately before asking any questions or inspecting code.
2. **Active In-Progress State (`task_on_progress.md` / Relay Baton)**:
   - For any task requiring multiple turns or running near token budgets, maintain a live snapshot:
     ```markdown
     # 🔄 Task On Progress (AI Relay Baton)
     - **Active Scope**: [Specific feature, bug, or module being built]
     - **Files Inspected**: [List of files read with brief key findings]
     - **Modifications Applied**: [`path/to/file:Lxx-Lyy` - exact changes made]
     - **Current Blockers / Uncertainties**: [Active error, missing env, or unverified assumption]
     - **Next Atomic Steps**: [Checkbox of immediate next actions]
     - **Directives for Next AI**: [Exact test commands, gotchas, and invariants]
     ```
3. **Non-Blocking Momentum**:
   - When encountering an external blocker, note it under `Current Blockers` with exact technical context. Never halt silently—proceed with independent, unblocked subtasks.
4. **Knowledge Ingestion & Cleanup Gate (Task Completion)**:
   - Once an objective reaches 100% verified completion (`✅ Verified`):
     * **System Knowledge Update**: Distill learned architecture decisions or system constraints into `docs/02-architecture/` (or `.agents/memory/`).
     * **Workspace Cleanup**: Delete temporary `task_on_progress.md` (or archive `{task-slug}.md` to `docs/plans/archive/`). Zero stale in-progress files left in project root.
     * **Audit Trail**: Finalize the session entry in `docs/worklog/YYYY-MM-DD.md`.
5. **Session Delivery Gate**:
   - Summarize completed deliverables. Prepare a Conventional Commit following `@[skills/git-master]` and wait for explicit user approval before executing.

---

## 📜 Session Worklog & Task Execution Protocol (`docs/worklog/YYYY-MM-DD.md`)

> **MANDATORY AUDIT TRAIL:** Every modification session—regardless of size (Micro-UI tweak, feature screen, or architecture refactor)—MUST maintain a persistent daily audit record in `docs/worklog/YYYY-MM-DD.md` (e.g. `docs/worklog/2026-09-15.md`) following the template in `@[skills/documentation-templates]`. Strictly maintained in the target project, NEVER inside `.agents/`.

1. **Session Initiation (Record Start)**:
   - Identify today's date (`YYYY-MM-DD`). Open or create `docs/worklog/YYYY-MM-DD.md`.
   - Capture Session Number, Task Name, Start Timestamp (`YYYY-MM-DD HH:mm:ss`), Assigned Agent, and initial status `🔄 IN_PROGRESS`.
2. **Scope & Acceptance Verification (Done When)**:
   - Formulate clear verification checkboxes (`Done When Checklist`) before writing code.
3. **Session Completion Gate**:
   - Update status to `✅ COMPLETED` (or `⚠️ BLOCKED` / `❌ FAILED`).
   - Record End Timestamp (`YYYY-MM-DD HH:mm:ss`).
   - Log exact impact surface (Files created, modified, or deleted).
   - Document key technical decisions, trade-offs, or temporary stubs.
   - Record verification proofs: **Diagnostics Count = 0**, compiler/test output.
   - Update the Daily Session Index table at the top of today's file.
4. **Zero Silent Work**: No code modification is considered finished until its entry is appended to `docs/worklog/YYYY-MM-DD.md`.
5. **Proactive Worklog Recommendation**: At the conclusion of every completed task, code change, or commit, the agent **MUST** proactively recommend updating, auditing, or finalizing the daily session log via `/worklog` in the response's `👉 Next Recommended Step`, ensuring persistent project context survives even if chat history is cleared or compacted.

---



