---
name: code-rules
version: 1.0.0
priority: P0
trigger: model_decision
description: Apply when writing, building, refactoring, or fixing code — project-type agent routing, the Socratic Gate, Plan Mode phases, and the final checklist/scripts. Skip for pure questions or text-only responses.
---

# Code Rules (TIER 1) - AG Kit

> Loaded when the request involves writing or modifying code.

---

## 📱 Project Type Routing

| Project Type                           | Primary Agent         | Skills                        |
| -------------------------------------- | --------------------- | ----------------------------- |
| **MOBILE** (iOS, Android, RN, Flutter) | `mobile-developer`    | mobile-design                 |
| **WEB** (Next.js, React web)           | `frontend-specialist` | frontend-design               |
| **BACKEND** (API, server, DB)          | `backend-specialist`  | api-patterns, database-design |

> 🔴 **Mobile + frontend-specialist = WRONG.** Mobile = mobile-developer ONLY.

---

## 🛑 GLOBAL SOCRATIC GATE

**MANDATORY: Every user request must pass through the Socratic Gate before ANY tool use or implementation.**

| Request Type            | Strategy       | Required Action                                                   |
| ----------------------- | -------------- | ----------------------------------------------------------------- |
| **New Feature / Build** | Deep Discovery | ASK minimum 3 strategic questions                                 |
| **Code Edit / Bug Fix** | Context Check  | Confirm understanding + ask impact questions                      |
| **Vague / Simple**      | Clarification  | Ask Purpose, Users, and Scope                                     |
| **Full Orchestration**  | Gatekeeper     | **STOP** subagents until user confirms plan details               |
| **Direct "Proceed"**    | Validation     | **STOP** → Even if answers are given, ask 2 "Edge Case" questions |

**Protocol:**

1. **Never Assume:** If even 1% is unclear, ASK.
2. **Handle Spec-heavy Requests:** When user gives a list (Answers 1, 2, 3...), do NOT skip the gate. Instead, ask about **Trade-offs** or **Edge Cases** (e.g., "LocalStorage confirmed, but should we handle data clearing or versioning?") before starting.
3. **Wait:** Do NOT invoke subagents or write code until the user clears the Gate.
4. **Reference:** Full protocol in `@[skills/brainstorming]`.

---

## 📋 Requirements Intake & Registry (MANDATORY)

**Before ANY planning or execution, parse 100% of user requirements into a structured registry.**

### Requirements Registry Spec
```markdown
### 📋 Requirements Registry
| ID | Requirement Description | Priority | Status | Verification Trace |
|----|-------------------------|----------|--------|--------------------|
| R1 | {exact requirement}    | {H/M/L}  | ⏳     | {test/UAT case}     |
| R2 | {exact requirement}    | {H/M/L}  | ⏳     | {test/UAT case}     |
```

**Intake Rules:**
- **100% Fidelity:** Extract EVERY explicit and implicit requirement. No assumptions, no omissions, no silent drops.
- **Traceability:** Every task in `{task-slug}.md` and every code wave must link to an `R{id}`.
- **Completion Gate:** A task is complete ONLY when all rows in the registry reach `✅ Verified`.

---

## 📐 Tiered Planning Protocol (Mandatory Before Any Modification)

**ZERO UNPLANNED CODE:** Every task—regardless of size—must present a structured plan before modifying code. For simple tasks (Tier 1), the user **DOES NOT** need to use slash commands; natural language instructions are automatically handled with structured gates:

| Task Tier | Examples | Required Planning Action |
| :--- | :--- | :--- |
| **Tier 1a: Micro-UI & Inline Tweak** | Edit button color, adjust spacing, rename label | **Execution Scope Box**: State target file, exact design token from `DESIGN.md`, and visual diff before editing. *(Natural prompt, zero command needed)* |
| **Tier 1b: Bugfix & Hotfix** | Fix null error, resolve syntax crash, fix broken link | **Bug Root-Cause Box**: 1. Symptom & exact error message, 2. Root cause analysis, 3. Proposed surgical fix & regression guard. *(Natural prompt, zero command needed)* |
| **Tier 2: Feature / Screen / Component** | Create User Management page, Add modal form | **3-Step Mini-Plan**:<br>1. *Data Model & Contracts* (Fields, types, mock/API)<br>2. *UI Anatomy* (Search/Filter, Table, Pagination, Modals)<br>3. *Component States* (Default, Loading, Empty, Error) |
| **Tier 3: Full System / Multi-Domain** | Scaffold new app, overhaul auth system | **Full Plan (`{task-slug}.md`)** following 4-Phase Plan Mode. |

> 🔴 **Auto-Worklog Obligation (Zero Silent Work):**
> 1. Even for Tier 1 micro tasks and quick bugfixes, the agent **MUST ALWAYS** append an entry to `docs/worklog/YYYY-MM-DD.md`. Never perform silent unlogged edits.
> 2. For any bugfix or troubleshooting task, the worklog entry **MUST INCLUDE** the `🐛 Error & Root Cause Log` section (Symptom, Root Cause, Fix Applied, Regression Guard) to permanently prevent error recurrence across future sessions.

---

## 🏁 Plan Mode (4-Phase)
 
1. **ANALYSIS & INTAKE** → Research, Socratic questions, build **Requirements Registry (R1, R2...)**, lock technical decisions (`Decisions` vs `Discretion`).
2. **PLANNING & DOCUMENTATION MODE** → Select appropriate documentation scale:
   - **Lite Mode (Single Feature / Fix)**: Create `{task-slug}.md` at the project root for fast, focused tracking.
   - **4-Pillars Architecture (Full System / Multi-domain Project)**: Generate documentation into `docs/` on-demand following `@[skills/documentation-templates]`:
     * `docs/01-requirements/`: Stakeholders, Business Rules, User Stories (owned by `business-analyst` / `product-owner`)
     * `docs/02-architecture/`: System Design, ADRs, Integrations (owned by `system-architect`)
     * `docs/03-ui-specs/`: Screen specs, states, tokens in `DESIGN.md` (owned by `ux-designer` / `frontend-specialist`)
     * `docs/04-qa/`: Traceability matrix, UAT scenarios (owned by `test-engineer`)
   - **Context Budget Check**: max 2-4 files/task, wave partitioning if >4 files.
3. **SOLUTIONING** → Architecture, schema design, contracts. If ORM/DB schemas change, inject mandatory **Schema Push Gate** (`[BLOCKING] schema push / migration`). (NO CODE before Phase 4!)
4. **IMPLEMENTATION & DRIFT GUARD** → Execute in dependency waves (Wave 1: Contracts → Wave 2: Logic → Wave 3: UI → Wave 4: Verify). **Anti-Drift Checkpoint**: verify alignment with Requirements Registry at each wave boundary before progressing.
5. **USER ACCEPTANCE (UAT)** → Run actual user flows to prove end-to-end functionality beyond green unit tests. Update registry to `✅ Verified`.
   - **🥇 FIRST: `playwright_runner.py`** (local headless Chromium — 0 API calls, no quota risk):
     ```bash
     python .agents/skills/webapp-testing/scripts/playwright_runner.py <URL> --screenshot
     ```
   - **🥈 LAST RESORT ONLY: `browser_subagent`** — Use ONLY when no local dev server is running AND visual confirmation is explicitly required. Each action = 1 API call → risk of 429 RESOURCE_EXHAUSTED. Limit to **1 screenshot max** per verify session.
6. **PLAN ARCHIVING & HYGIENE GATE** → When all work is complete (100% `✅ Verified`), automatically move `{task-slug}.md` to `docs/plans/archive/{task-slug}.md`. Zero completed plan files left in project root.

---

## 🏁 Final Checklist Protocol

**Trigger:** When the user says "run the final checks", "final checks", "run all the tests", or similar phrases.

| Task Stage       | Command                                            | Purpose                        |
| ---------------- | -------------------------------------------------- | ------------------------------ |
| **Manual Audit** | `python .agents/scripts/checklist.py .`             | Priority-based project audit   |
| **Pre-Deploy**   | `python .agents/scripts/checklist.py . --url <URL>` | Full Suite + Performance + E2E |

**Priority Execution Order:**

1. **Security** → 2. **Lint** → 3. **Schema** → 4. **Tests** → 5. **UX** → 6. **Seo** → 7. **Lighthouse/E2E**

**Rules:**

- **Completion:** A task is NOT finished until `checklist.py` returns success.
- **Reporting:** If it fails, fix the **Critical** blockers first (Security/Lint).

**Available Scripts (10 total):**

| Script                     | Skill                 | When to Use         |
| -------------------------- | --------------------- | ------------------- |
| `security_scan.py`         | vulnerability-scanner | Always on deploy    |
| `lint_runner.py`           | lint-and-validate     | Every code change   |
| `test_runner.py`           | testing-patterns      | After logic change  |
| `schema_validator.py`      | database-design       | After DB change     |
| `ux_audit.py`              | frontend-design       | After UI change     |
| `accessibility_checker.py` | frontend-design       | After UI change     |
| `seo_checker.py`           | seo-fundamentals      | After page change   |
| `mobile_audit.py`          | mobile-design         | After mobile change |
| `lighthouse_audit.py`      | performance-profiling | Before deploy       |
| `playwright_runner.py`     | webapp-testing        | Before deploy       |

> 🔴 **Agents & Skills can invoke ANY script** via `python .agents/skills/<skill>/scripts/<script>.py`

---
