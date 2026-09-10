---
name: universal-rules
version: 1.0.0
priority: P0
trigger: always_on
---

# Universal Rules (TIER 0) - AG Kit

> Always-active rules that apply to every request, regardless of domain.

---

## 🌐 Language Handling

When user's prompt is NOT in English:

1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

---

## 🧹 Clean Code & Safety (Global Mandatory)

**ALL code MUST follow `@[skills/clean-code]` rules. No exceptions.**

- **Code**: Concise, direct, no over-engineering. Self-documenting.
- **Zero Broken Windows (STRICT)**: Never leave stubs, temporary mock functions, `// TODO: implement later`, or unused dead code upon task completion. Every modified file must be cleaner than or equal to its initial state.
- **Anti-Drift Check**: In multi-step or wave-based tasks, pause and check alignment after each wave or every 3-4 files. Never perform out-of-scope refactoring without explicit consent.
- **Secret & Sensitive Data Guard**: Never expose, log, or print contents of `.env`, private keys, API credentials, or certificates into chat output or git commits.
- **Testing**: Mandatory. Pyramid (Unit > Int > E2E) + AAA Pattern. No fake/tautological assertions.
- **Performance**: Measure first. Adhere to current Core Web Vitals standards.
- **Infra/Safety**: 5-Phase Deployment. Verify secrets security.

---

## 🛡️ Zero-Diagnostics & Self-Healing Loop (Global Mandatory)

**When editing or creating code in Antigravity IDE (with ESLint, Tailwind CSS IntelliSense, TypeScript LSP):**

1. **Active IDE Feedback Listening (Dynamic Gate)**:
   - Every file modification must pass inspection against IDE diagnostic markers and project linters.
   - Any `Error` or `Warning` emitted by the IDE or linter is **BLOCKING**. Never mark a task as done while diagnostics remain.
   - Do not rely on hardcoded error lists: read the dynamic error code and message provided by the IDE/linter and resolve its root cause.

2. **Universal Framework & Styling Hygiene**:
   - **Next.js & React**:
     * Never use `<img>` for local/remote assets; always use `import Image from 'next/image'` with proper `width`/`height` or `fill` + `alt`.
     * Never use `<a href="...">` for internal routing; always use `import Link from 'next/link'`.
     * Never leave raw unescaped quotes (`'`, `"`) inside JSX text; use HTML entities (`&apos;`, `&ldquo;`, `&rdquo;`) or JS string literals (`{"'"}`).
   - **Tailwind CSS (v4 / Canonical Standards & Language Server Lint Gate)**:
     * Always adopt canonical classes suggested by Tailwind IntelliSense: `shrink-0`, `grow`, `bg-linear-to-*`, `outline-hidden` (never obsolete v2/v3 aliases like `flex-shrink-0`, `bg-gradient-to-*`).
     * Never introduce conflicting utility classes on the same element (e.g. `p-4 px-2`).
     * **Mandatory Post-Generation Tailwind LSP Check**: After generating or editing UI files, run `node .agents/skills/lint-and-validate/scripts/tailwind_lint.mjs . --fix` (or `python .agents/skills/lint-and-validate/scripts/lint_runner.py . --fix`).
     * **Parse & Self-Healing Loop**: The Tailwind Language Server parses all `suggestCanonicalClasses` diagnostics and auto-replaces non-canonical classes with suggestions in a multi-pass loop until active warnings = 0.
   - **TypeScript & Clean Scope**:
     * Zero unused imports, variables, or functions (`@typescript-eslint/no-unused-vars`).
     * Prefix intentionally unused parameters with an underscore (`_`).
     * Run `npx eslint --fix` or project linter to clean up auto-fixable diagnostics.

3. **Task Completion Condition**:
   - A coding task is complete ONLY when **Diagnostics Count = 0 (No Errors, No Warnings)** across TypeScript, ESLint, and Tailwind Language Server.

---

## 🛡️ Error Classification & Escalation Matrix (E1 - E4)

**Every error during execution MUST lead to either (1) automated recovery, or (2) structured user escalation. SILENT HALTS ARE FORBIDDEN.**

### Error Taxonomy & Auto-Recovery Protocol

| Code | Error Class | Root Cause Examples | Automated Recovery Action |
|------|-------------|---------------------|----------------------------|
| **E1** | **Transient** | Network hiccup, rate-limit, tool timeout | Exponential backoff retry (max 3x: 1s, 2s, 4s). |
| **E1b** | **Output Overflow** | Token window exceeded, giant file modification | Switch immediately to chunked modification strategy. |
| **E2** | **Recoverable Logic** | Compiler error, missing import, test failure | Isolate root cause, formulate alternative implementation, self-heal. |
| **E3** | **Blocking Environment** | Missing dependency, broken credentials, OS lock | Snapshot safe state, identify root blocker, escalate if intervention needed. |
| **E4** | **Cascading Corruption** | Migration fail, schema break, dirty workspace | HALT immediately, rollback dirty changes to last safe commit/snapshot, report impact. |

### Structured Escalation Protocol (When Blocked)

When automated recovery fails or an E3/E4 blocker occurs, **NEVER** halt silently or print unstructured excuses. Present exactly 4 structured options:

```markdown
## ⚠️ BLOCKED — Decision Required

- **Error Class**: {E1/E2/E3/E4} — {Technical Description}
- **Impact Surface**: {List of affected files / components}
- **Root Cause**: {Concise cause analysis}

**Options:**
- **A) [Alternative Approach]**: {Description} (Trade-off: {trade-off})
- **B) [Skip with Gap]**: {Description} (Limitation: {documented limitation})
- **C) [Provide Input]**: {Specific credential, permission, or missing decision needed}
- **D) [Scope Modification]**: {Recommended adjustment to requirements}

⏳ Awaiting selection...
```

---

## 📦 Git & Commit Standards (Global Mandatory)

**ALL Git commits MUST follow `@[skills/git-master]` conventions:**

- **User Approval Gate (STRICT)**: You MUST NEVER run `git commit`, `git push`, or any state-changing Git command automatically. You MUST present the proposed changes (files, diff, drafted commit message) and WAIT for the user's explicit approval before executing.
- **Conventional Commits**: Format must strictly be `type(scope): concise description`.
- **Atomic Commits**: One commit = one complete, working logical change.
- **Safety First**: Never commit secrets, credentials, or `.env` files. Never force-push to `main`.

---

## 📋 Plan Lifecycle & Workspace Hygiene (Global Mandatory)

- **In-Progress Stage**: Plan file `{task-slug}.md` MUST be stored at the project root during active execution for immediate visibility and live progress tracking.
- **Task Completion Gate (MANDATORY)**: The moment all tasks in the plan reach `Done When = 100%` and all requirements are verified:
  1. Agent **MUST** automatically move the plan file into the archive directory:
     `docs/plans/archive/{task-slug}.md` (create the directory automatically if it does not exist).
  2. Lingering `{task-slug}.md` plan files in the project root are **STRICTLY FORBIDDEN** upon task completion.
  3. Report the new archive location of the plan file to the user in the final summary.

---

## 🧭 Proactive Next-Workflow Guidance (Global Mandatory)

**NEVER leave the user at a dead-end.** Upon completing any response where work was planned, implemented, verified, tested, or debugged, the agent **MUST** proactively suggest 1–2 logical next workflows (slash commands) with actionable context.

### Standard Workflow Transition Matrix

| Completed Stage | Trigger / Context | Recommended Next Workflow |
| :--- | :--- | :--- |
| **Brainstorming** | Options explored, decision made | 👉 `/plan [chosen direction]` to create structured tasks |
| **Planning** | `{task-slug}.md` created & approved | 👉 `/create` (new app) or `/enhance` (feature/refactor) |
| **Code Implementation** | Code written or modified | 👉 `/verify` (run proofs/tests) or `/preview` (inspect UI) |
| **Verification / Testing** | All tests & checks passed | 👉 `/commit` (safe conventional commit) or `/preview` |
| **Debugging** | Root cause isolated & fix applied | 👉 `/verify` (re-test the fix) → `/commit` |
| **Commit Finished** | Safe commit created | 👉 `/deploy` (if release-ready) or `/plan` (next feature) |

### Guidance Format
At the conclusion of the response, append:
```markdown
---
👉 **Next Recommended Step**:
- Run `/[command]` to [actionable reason]
- Or run `/[alternative]` to [secondary action]
```

