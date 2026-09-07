# 🔄 Agent Flow Architecture

> **AG Kit 2026.8.31** — Antigravity-native production workflow, multi-agent orchestration, and phase-gate architecture.

---

## 🏛️ Antigravity Runtime Boundary

AG Kit defines project behavior in `.agents/`; **Google Antigravity IDE** is the production runtime that discovers, binds, and executes it.

```text
User Request
    ↓
Antigravity Workspace Discovery
    ├── .agents/rules/       Persistent constraints (Tier 0 & Tier 1)
    ├── .agents/skills/      Progressive domain context (54 skills)
    ├── .agents/workflows/   Slash-command procedures (15 workflows)
    ├── .agents/agent/       Specialist role personas (22 agents)
    ├── .agents/checklists/  Quality phase gates (5 checkpoints)
    └── .agents/memory/      Durable project context & decisions
    ↓
Routing & Multi-Agent Orchestration
    ├── Direct specialist selection (intelligent auto-routing)
    ├── /party → 4-role squad consensus (PM, UX, Architect, Dev)
    ├── /coordinate → parallel read/research + synthesis
    └── /orchestrate → plan → user approval → delegated implementation
    ↓
Code Intelligence & Quality Gates
    ├── Tree-sitter AST intelligence (ast-grep & ast_outline.py)
    ├── Phase gate checklists (Requirements → Architecture → UI/UX → Dev → QA)
    └── Zero-Diagnostics Gate (LSP/ESLint feedback loop)
    ↓
Tool & Safety Boundary
    ├── Antigravity permissions and workspace trust
    ├── .agents/hooks.json → PreToolUse safety gate (blocks root/disk destruction)
    └── User Approval Gate → Mandatory explicit approval for git commit & push
    ↓
Execution, Verification & Memory
    ├── Automated execution proof via verify-changes & tests
    └── Durable cross-session memory update (.agents/memory/MEMORY.md)
```

---

## 📦 Six Production Integration Phases

| Phase | Responsibility | Source of Truth |
| :--- | :--- | :--- |
| **1. Discovery** | Load rules, skills, workflows, checklists, and agent personas | `.agents/rules/`, `.agents/skills/`, `.agents/workflows/`, `.agents/checklists/` |
| **2. MCP** | Validate workspace Model Context Protocol servers | `.agents/mcp_config.json` |
| **3. Hooks** | Gate high-confidence destructive command patterns | `.agents/hooks.json` & `.agents/hooks/validate-tool-call.mjs` |
| **4. Orchestration** | Coordinate specialist agents, parallel workers, and `/party` mode | Workflows, agent definitions, `coordinator-mode`, `parallel-agents` |
| **5. Plugin** | Package reviewed components for optional Antigravity plugin export | `.agents/hooks/build-plugin.mjs` |
| **6. Validation** | Prove structure, compatibility, security, and integrity | `npm run check:agents`, `npm run check:antigravity`, `npm run test:antigravity` |

---

## 📊 End-to-End Workflow Diagram

```text
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    REQUEST CLASSIFICATION                        │
│  • Analyze intent (build, debug, test, party, commit, etc.)    │
│  • Identify domain (frontend, backend, architecture, security) │
│  • Detect complexity (simple inline vs. complex {task-slug}.md) │
└────────────────────────────┬────────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
    ┌───────────────────┐      ┌──────────────────┐
    │ WORKFLOW COMMAND  │      │  DIRECT AGENT    │
    │  (Slash Command)  │      │  AUTO-ROUTING    │
    ├───────────────────┤      ├──────────────────┤
    │ • /party          │      │ • system-arch    │
    │ • /orchestrate    │      │ • ui-ux-design   │
    │ • /coordinate     │      │ • frontend-spec  │
    │ • /create         │      │ • backend-spec   │
    │ • /commit         │      │ • devops-eng     │
    │ • /plan           │      │ • test-eng       │
    │ • /verify         │      │ • security-audit │
    └─────────┬─────────┘      └────────┬─────────┘
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
         ┌─────────────────────────────────────┐
         │       AGENT INITIALIZATION          │
         │  • Announce: 🤖 Applying @[agent]    │
         │  • Announce: 📚 Using @[skill]       │
         │  • Load required frontmatter skills │
         │  • Set behavioral mode (AAA / TDD)  │
         └─────────────┬───────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │     PHASE GATE & CHECKLISTS         │
         │  1. Requirements Gate               │
         │  2. Architecture Gate (ADR)         │
         │  3. UI/UX Gate (DESIGN.md tokens)   │
         │  4. Development Gate (Zero-Diag)    │
         │  5. QA & Verification Gate          │
         └─────────────┬───────────────────────┘
                        │
                        ▼
         ┌─────────────────────────────────────┐
         │     SAFE IMPLEMENTATION & PROOF     │
         │  • AST structural search (ast-grep) │
         │  • Zero-Diagnostics healing loop    │
         │  • Execution verification (tests)   │
         │  • User Approval Gate for commits   │
         └─────────────────────────────────────┘
```

---

## 🛡️ Core Operating Principles

1. **User Approval Gate (STRICT)**: Never execute `git commit`, `git push`, or state-changing Git actions without presenting diff/message and receiving explicit approval.
2. **Zero-Diagnostics Policy**: Code changes are not complete until IDE/linter error and warning counts reach zero.
3. **AST-First Intelligence**: Prefer `ast-grep` and `ast_outline.py` over naive full-text reading to reduce token consumption and eliminate hallucinations.
4. **Isolated Parallel Execution**: Read-only research, security audits, and verification run concurrently; mutating writes execute sequentially.
5. **Design Source-of-Truth**: All UI work must be preceded by or anchored to `DESIGN.md` tokens.
