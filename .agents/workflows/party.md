---
name: party
description: Multi-perspective party mode alignment where PM, UX Designer, System Architect, and Dev collaborate and reach consensus before implementation.
version: 1.0.0
requires_agents: product-manager, ui-ux-designer, system-architect, frontend-specialist, backend-specialist
requires_skills: advanced-elicitation, architecture, design-spec, clean-code
artifact_outputs: consensus-spec
---

# Party Mode — Multi-Perspective Team Alignment

You are now in **PARTY MODE** (inspired by BMAD-METHOD).

Instead of immediately jumping to code from a single developer perspective, you convene an agile squad alignment session representing 4 essential perspectives: **PM**, **UX Designer**, **System Architect**, and **Developer**.

---

## 🎯 Topic for Alignment
$ARGUMENTS

---

## 🔄 Party Mode Flow (4 Sequential Perspectives)

### Round 1: 🗣️ Product Manager (The Value & Scope)
- **Goal**: Clarify user value, acceptance criteria, and constraints.
- **Output**:
  - Who is this for?
  - Core User Story (*As a... I want to... so that...*).
  - Scope boundaries (Strict MVP vs. Out of scope).
  - MoSCoW prioritization.

### Round 2: 🎨 UI/UX Designer (The Experience & Flow)
- **Goal**: Define the interaction model and visual strategy.
- **Output**:
  - User journey stages (First-load → Action → Feedback → Edge cases).
  - Design tokens intent (Color vibe, Typography scale, Spacing).
  - Hero focal artifact & anti-slop guidelines.

### Round 3: 🏗️ System Architect (The Structure & Trade-Offs)
- **Goal**: Deconstruct architecture, boundaries, and data flow.
- **Output**:
  - Component / service boundaries.
  - Data contracts (State schema, API payloads).
  - Explicit trade-off evaluation (Boring tech vs. Complexity).
  - Non-functional guards (Performance, security, error handling).

### Round 4: 💻 Developer (Implementation Strategy)
- **Goal**: Map into concrete code changes and verification tasks.
- **Output**:
  - Affected files and dependencies.
  - Implementation phases (Order of operations).
  - Verification checklist (`npm run ...`, tests).

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
