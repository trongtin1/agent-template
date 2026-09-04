---
name: party
description: Multi-perspective party mode alignment where PM, UX Designer, System Architect, and Dev collaborate and reach consensus before implementation.
version: 1.0.0
requires_agents: product-manager, ui-ux-designer, system-architect, frontend-specialist, backend-specialist
requires_skills: advanced-elicitation, architecture, design-spec, clean-code
artifact_outputs: consensus-spec
---

# Party Mode — Multi-Perspective Team Alignment

You are now in **PARTY MODE** (Multi-Perspective Squad Alignment).

Instead of immediately jumping to code from a single developer perspective, you convene an agile squad alignment session representing 4 essential perspectives: **PM**, **UX Designer**, **System Architect**, and **Developer**.

---

## 🎯 Topic for Alignment
$ARGUMENTS

---

## 🔄 Party Mode Flow (Enforcing Phase Gates)

### Round 1: 🗣️ Product Manager (The Value & Scope)
- **Phase Gate**: [Gate 1: Requirements Checklist](file:///c:/Users/DELL/Desktop/agent-template/.agents/checklists/01-requirements-gate.md)
- **Goal**: Clarify user value, acceptance criteria, and constraints.
- **Output**:
  - Who is this for?
  - Core User Story (*Given-When-Then*).
  - Scope boundaries (Strict MVP vs. Out of scope).
  - MoSCoW prioritization.

### Round 2: 🎨 UI/UX Designer (The Experience & Flow)
- **Phase Gate**: [Gate 3: UI/UX Checklist](file:///c:/Users/DELL/Desktop/agent-template/.agents/checklists/03-ui-ux-gate.md)
- **Goal**: Define the interaction model and visual strategy.
- **Output**:
  - User journey stages (First-load → Action → Feedback → Edge cases).
  - Design tokens intent (`DESIGN.md`, Color vibe, Typography scale, Spacing).
  - Swap-Test compliance & anti-slop guidelines.

### Round 3: 🏗️ System Architect (The Structure & Trade-Offs)
- **Phase Gate**: [Gate 2: Architecture Checklist](file:///c:/Users/DELL/Desktop/agent-template/.agents/checklists/02-architecture-gate.md)
- **Goal**: Deconstruct architecture, boundaries, and data flow.
- **Output**:
  - Component / service boundaries and AST structure outline.
  - Data contracts (State schema, API payloads).
  - Explicit trade-off evaluation (ADR, Boring tech vs. Complexity).
  - Non-functional guards (Performance, security, error handling).

### Round 4: 💻 Developer (Implementation Strategy)
- **Phase Gate**: [Gate 4: Development Checklist](file:///c:/Users/DELL/Desktop/agent-template/.agents/checklists/04-development-gate.md)
- **Goal**: Map into concrete code changes and verification tasks.
- **Output**:
  - Affected files and AST safety (`ast-grep`, zero swallowed errors).
  - Implementation phases (Order of operations).
  - Verification plan transitioning to [Gate 5: QA Checklist](file:///c:/Users/DELL/Desktop/agent-template/.agents/checklists/05-qa-verification-gate.md).

---

## 🏁 Final Deliverable: Consensus Spec

Synthesize the findings into a concise, unified plan before proceeding to code:

```markdown
# [Feature Name] — Consensus Specification

## 1. Product Scope (PM)
...
## 2. UX & Design Tokens (UX Designer)
...
## 3. Architecture & Data Flow (System Architect)
...
## 4. Engineering Tasks & Verification (Dev)
...
```

Once the user approves the Consensus Spec, execution proceeds directly with full alignment.
