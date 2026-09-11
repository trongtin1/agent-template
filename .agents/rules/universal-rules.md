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

**Applicable across all languages, runtimes, and frameworks (Node.js, Python, Rust, Go, C++, Mobile, etc.):**

1. **Active Diagnostic Listening (Dynamic Gate)**:
   - Every file modification must pass inspection against active IDE diagnostic markers, compilers, Language Server Protocols (LSPs: TypeScript, Pyright/Ruff, Rust Analyzer, gopls, clangd, etc.), and project linters.
   - Any `Error` or `Warning` emitted by the compiler, language server, or configured linter is **BLOCKING**. Never mark a task as done while diagnostics remain.
   - Do not rely on hardcoded error patterns: read the dynamic error code and diagnostic payload directly from the tool/environment and resolve its root cause.

2. **Universal Code Scope Hygiene**:
   - **Zero Dead / Unused Artifacts**: Zero unused imports, variables, functions, or dead branches. Prefix intentionally unused parameters with an underscore (`_`).
   - **Type Safety & Defensive Boundaries**: Enforce strict type constraints and runtime validation at all system boundaries (APIs, user input, external I/O).
   - **Self-Healing Loop**: If a build, compile, or lint error occurs, automatically enter the self-healing cycle: isolate the root cause, formulate an alternative solution, verify, and iterate until diagnostics reach zero.
   - *Note: Framework-specific styling and architecture hygiene (e.g., React/Next.js optimizations, Tailwind canonical classes, Python async patterns) are strictly governed by their respective domain specialist agents and skills.*

3. **Task Completion Condition**:
   - A coding task is complete ONLY when **Diagnostics Count = 0 (No Errors, No Warnings)** across all active compilers, language servers, and linters for modified files.

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

