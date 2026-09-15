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

## 💬 Conversational Alignment & Antigravity Recommendations

1. **Clarify Before Execution (Zero Premature Action)**:
   - When discussing requirements, architecture, or problems: agents **MUST** converse with the user, probe hidden assumptions, ask clarifying questions, and present options.
   - **STRICTLY FORBIDDEN**: Modifying code, updating files, or executing implementation plans before receiving explicit user sign-off ("Chốt", "Đồng ý", "Thực thi").
2. **Antigravity Recommendations in Every Chat Session**:
   - At the conclusion of every response, agents **MUST** utilize Google Antigravity's proactive slash command recommendation pattern (`👉 Next Recommended Step`).
   - Proactively recommend context-relevant workflows (e.g. `/worklog` to ensure documentation integrity, `/verify` for QA, `/grill-me` for design elicitation, `/plan` or `/commit`).

---

## 🎯 Session Goal & Execution Protocol (`_goals.md`)

When working on complex projects with persistent goals across multiple sessions or workflows:

1. **Session Start (Backlog Check)**: At session start, check if `_goals.md` exists in the project root. If present, read open and backlogged objectives first to establish immediate context.
2. **Execute to Verified Completion**: Drive active objectives through execution until fully verified (`Done`).
3. **Non-Blocking Execution (Continuous Momentum)**:
   - When encountering an unresolved decision, missing credential, or external blocker:
     * Note it down clearly under `Pending Decisions / Blockers` in `_goals.md` with exact technical context.
     * **NEVER halt the entire session silently.** Immediately proceed with other independent, unblocked objectives until all actionable work is completed.
4. **Prune Completed Goals**: Once an objective reaches verified completion (100% Done), remove it from `_goals.md` to keep the active goal sheet lean and focused.
5. **Session Wrap-Up & Safe Delivery**:
   - Conclude by summarizing completed deliverables and pending items.
   - Prepare a Conventional Commit following `@[skills/git-master]`, present changes, and request user approval before pushing to `main`.

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



