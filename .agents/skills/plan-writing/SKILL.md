---
name: plan-writing
description: Structured task planning with clear breakdowns, dependencies, and verification criteria. Use when implementing features, refactoring, or any multi-step work.
when_to_use: "When creating structured task plans, breaking down features into tasks, or defining verification criteria. Use with /plan workflow."
allowed-tools: Read, Glob, Grep
version: 1.0.0
---

# Plan Writing

> AG Kit Planning Engine — Structured task planning with 100% requirement fidelity, clear breakdowns, and verification criteria.

## Requirements Intake & Registry (MANDATORY)

Before constructing tasks, extract every requirement from the user prompt into a structured registry:

```markdown
### 📋 Requirements Registry
| ID | Requirement Description | Priority | Status | Verification Trace |
|----|-------------------------|----------|--------|--------------------|
| R1 | {exact requirement}    | {H/M/L}  | ⏳     | {test/UAT flow}     |
| R2 | {exact requirement}    | {H/M/L}  | ⏳     | {test/UAT flow}     |
```

**Registry Lifecycle:**
- `⏳ Pending`: Requirement captured, not yet implemented.
- `🔄 In Progress`: Currently being coded in active wave.
- `✅ Verified`: Passed automated test or live UAT scenario.

**Rules:**
1. **100% Fidelity:** Never omit a user requirement or assume it is out of scope without explicit confirmation.
2. **Task Linking:** Every task in the plan must reference which `R{id}` it fulfills.
3. **Completion Invariant:** A task plan is complete ONLY when all rows reach `✅ Verified`.

## Overview
This skill provides a framework for breaking down work into clear, actionable tasks with verification criteria.

## Task Breakdown Principles

### 1. Small, Focused Tasks
- Each task should take 2-5 minutes
- One clear outcome per task
- Independently verifiable

### 2. Clear Verification
- How do you know it's done?
- What can you check/test?
- What's the expected output?

### 3. Logical Ordering
- Dependencies identified
- Parallel work where possible
- Critical path highlighted
- **Phase X: Verification is always LAST**

### 4. Dynamic Naming & Lifecycle in Project Root
- **Creation / In-Progress Stage**: Plan files are created and saved as `{task-slug}.md` in the PROJECT ROOT during execution for maximum visibility and rapid updates.
- Name derived from task (e.g., "add auth" → `auth-feature.md`).
- **NEVER** create initial active plans inside `.agents/`, `docs/`, or temp folders.
- **Completion & Archiving Gate**: Immediately upon reaching `Done When = 100%`, automatically move the plan file to `docs/plans/archive/{task-slug}.md`.

## Planning Principles (NOT Templates!)

> 🔴 **NO fixed templates. Each plan is UNIQUE to the task.**

### Principle 1: Keep It SHORT

| ❌ Wrong | ✅ Right |
|----------|----------|
| 50 tasks with sub-sub-tasks | 5-10 clear tasks max |
| Every micro-step listed | Only actionable items |
| Verbose descriptions | One-line per task |

> **Rule:** If plan is longer than 1 page, it's too long. Simplify.

---

### Principle 2: Be SPECIFIC, Not Generic

| ❌ Wrong | ✅ Right |
|----------|----------|
| "Set up project" | "Run `npx create-next-app`" |
| "Add authentication" | "Install next-auth, create `/api/auth/[...nextauth].ts`" |
| "Style the UI" | "Add Tailwind classes to `Header.tsx`" |

> **Rule:** Each task should have a clear, verifiable outcome.

---

### Principle 3: Dynamic Content Based on Project Type

**For NEW PROJECT:**
- What tech stack? (decide first)
- What's the MVP? (minimal features)
- What's the file structure?

**For FEATURE ADDITION:**
- Which files are affected?
- What dependencies needed?
- How to verify it works?

**For BUG FIX:**
- What's the root cause?
- What file/line to change?
- How to test the fix?

---

### Principle 4: Scripts Are Project-Specific

> 🔴 **DO NOT copy-paste script commands. Choose based on project type.**

| Project Type | Relevant Scripts |
|--------------|------------------|
| Frontend/React | `ux_audit.py`, `accessibility_checker.py` |
| Backend/API | `api_validator.py`, `security_scan.py` |
| Mobile | `mobile_audit.py` |
| Database | `schema_validator.py` |
| Full-stack | Mix of above based on what you touched |

**Wrong:** Adding all scripts to every plan
**Right:** Only scripts relevant to THIS task

---

### Principle 5: Verification is Simple

| ❌ Wrong | ✅ Right |
|----------|----------|
| "Verify the component works correctly" | "Run `npm run dev`, click button, see toast" |
| "Test the API" | "curl localhost:3000/api/users returns 200" |
| "Check styles" | "Open browser, verify dark mode toggle works" |

---

### Principle 6: Context Budget (Max 4 Files / Task)

> 🔴 **Prevent Context Rot**: An agent carrying excessive file diffs degrades in reasoning quality.

- **Hard Boundary**: Each individual task MUST touch at most **2 to 4 closely coupled files**.
- **No Omnipresent Edits**: Never create a task like "Refactor all components" or "Update all API routes". Break by domain.
- If a task requires touching >4 files, it MUST be broken down into subtasks or partitioned into Waves.

---

### Principle 7: Wave-Based Execution for Complex Work (>4 Files)

When a feature or refactoring touches more than 4 files, partition the plan into sequential **Dependency Waves**:

```text
🌊 Wave 1: Contracts & Data (Schemas, Types, Database Migrations)
       ↓ (Verify schemas & types compile cleanly)
🌊 Wave 2: Business Logic & APIs (Services, Route Handlers, Controllers)
       ↓ (Verify API endpoints with curl or integration test)
🌊 Wave 3: UI & Presentation (Components, Views, Styling, User Interactions)
       ↓ (Verify browser rendering & user flows)
🌊 Wave 4: End-to-End Verification & Hardening (E2E Tests, Audits, Docs)
```

**Wave Execution Rules:**
1. **Parallel within a Wave**: Tasks within the same wave touching non-overlapping files can run in parallel.
2. **Sequential across Waves**: Never start Wave N+1 until Wave N's verification criteria are met.
3. **Clean Context Transition**: Verify and commit/stage at the boundary of each wave to keep context window fresh.

## Plan Structure (Flexible, Not Fixed!)

```
# [Task Name]

## Goal
One sentence: What are we building/fixing?

## Tasks
- [ ] Task 1: [Specific action] → Verify: [How to check]
- [ ] Task 2: [Specific action] → Verify: [How to check]
- [ ] Task 3: [Specific action] → Verify: [How to check]

## Done When
- [ ] [Main success criteria]

## Notes
[Any important considerations]
```

> **That's it.** No phases, no sub-sections unless truly needed.
> Keep it minimal. Add complexity only when required.

---

## Plan Lifecycle & Archiving Gate (MANDATORY)

Every plan follows a strict 2-stage lifecycle to maintain workspace hygiene:

```text
[1. CREATE & EXECUTE]                     [2. COMPLETE & ARCHIVE]
{task-slug}.md in PROJECT ROOT   ──(Done When=100%)──>   docs/plans/archive/{task-slug}.md
(Active visibility during work)                         (Archived, clean root)
```

1. **Stage 1: In-Progress Stage (Project Root)**
   - Create plan file `{task-slug}.md` directly at the project root.
   - Keep it at the root during implementation for fast navigation, progress marking (`[x]`), and live status tracking.

2. **Stage 2: Task Completion Gate (Archiving)**
   - When all tasks reach `Done When = 100%` and all requirements in the Requirements Registry are `✅ Verified`:
     1. Agent **MUST** automatically move the plan file into the archive directory:
        - PowerShell: `if (!(Test-Path docs/plans/archive)) { New-Item -ItemType Directory -Path docs/plans/archive -Force }; Move-Item {task-slug}.md docs/plans/archive/{task-slug}.md`
        - Bash/sh: `mkdir -p docs/plans/archive && mv {task-slug}.md docs/plans/archive/{task-slug}.md`
     2. Lingering `{task-slug}.md` files at the project root are **STRICTLY FORBIDDEN** upon task completion.
     3. Report the new archive path of the plan file to the user (e.g. `docs/plans/archive/{task-slug}.md`).

---

## Best Practices (Quick Reference)

1. **Start with goal** - What are we building/fixing?
2. **Max 10 tasks** - If more, break into multiple plans
3. **Each task verifiable** - Clear "done" criteria
4. **Project-specific** - No copy-paste templates
5. **Update as you go** - Mark `[x]` when complete
6. **Archive when done** - Auto-move to `docs/plans/archive/{task-slug}.md` upon 100% completion

---

## When to Use

- New project from scratch
- Adding a feature
- Fixing a bug (if complex)
- Refactoring multiple files
