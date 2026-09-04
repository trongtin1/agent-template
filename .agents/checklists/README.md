# Phase Gate Quality System — AG Kit

> Deterministic transition criteria between development phases. No phase may transition to the next without satisfying its gate criteria.

---

## 🚪 The 5 Phase Gates

```
[ User Request ]
       ↓
 ┌─────────────┐
 │   GATE 1    │ ➔ Requirements & Elicitation (Product Manager)
 └──────┬──────┘
        ↓
 ┌─────────────┐
 │   GATE 2    │ ➔ Architecture & Boundaries (System Architect)
 └──────┬──────┘
        ↓
 ┌─────────────┐
 │   GATE 3    │ ➔ Interface & Anti-Slop (UI/UX Designer)
 └──────┬──────┘
        ↓
 ┌─────────────┐
 │   GATE 4    │ ➔ Implementation & AST Safety (Developer)
 └──────┬──────┘
        ↓
 ┌─────────────┐
 │   GATE 5    │ ➔ QA, Security & Verification (QA / Security Auditor)
 └──────┬──────┘
        ↓
[ Production Release ]
```

---

## 📋 Gate Catalog

| Gate | Name | Owner Agent | Checklist File |
| :--- | :--- | :--- | :--- |
| **Gate 1** | Requirements & Elicitation | `product-manager` / `product-owner` | [`01-requirements-gate.md`](./01-requirements-gate.md) |
| **Gate 2** | Architecture & Boundaries | `system-architect` | [`02-architecture-gate.md`](./02-architecture-gate.md) |
| **Gate 3** | Interface & Anti-Slop | `ui-ux-designer` | [`03-ui-ux-gate.md`](./03-ui-ux-gate.md) |
| **Gate 4** | Implementation & AST Safety | `backend-specialist` / `frontend-specialist` | [`04-development-gate.md`](./04-development-gate.md) |
| **Gate 5** | QA, Security & Verification | `qa-automation-engineer` / `security-auditor` | [`05-qa-verification-gate.md`](./05-qa-verification-gate.md) |

---

## 🔒 Enforcement Protocol

1. **Gate Verification**: Before an agent declares its phase complete, it must verify each item in its respective gate file.
2. **In `/party` Mode**: The 4-role consensus party aligns on Gates 1-3 before the Developer starts coding in Gate 4.
3. **Evidence-Based Sign-off**: Every checked item `[x]` must be backed by an artifact (e.g. `DESIGN.md`, ADR in planning doc, or test execution log).
