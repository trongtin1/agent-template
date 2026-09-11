---
name: documentation-templates
description: Documentation templates and structure guidelines. 4-Pillars architecture, Just-In-Time Meta-Template generation, README, API docs, code comments, and AI-friendly documentation.
when_to_use: "When structuring project documentation, generating requirements, architecture specs, UI specs, QA verification docs, README files, API documentation, or AI-friendly documentation."
allowed-tools: Read, Glob, Grep
version: 1.1.0
---

# Documentation Templates & Meta-Engine

> Pragmatic templates and dynamic generation guidelines for modern, maintainable documentation across any project.

---

## 🏛️ 1. The 4-Pillars Documentation Architecture

Instead of rigid, deeply-nested static directories, modern project documentation is organized around **4 Core Pillars**:

```
docs/
├── 01-requirements/     # Problem Space: Stakeholders, Business Rules, User Stories, Scope Boundaries
├── 02-architecture/     # Solution Space: System Design, Component Specs, ADRs, Integrations, Runbooks
├── 03-ui-specs/         # Design Space: Design Tokens (DESIGN.md), Screen Specs, Component States, User Flows
└── 04-qa/               # Verification Space: Traceability Matrix, Acceptance Scenarios, UAT Plans
```

### ⚡ Just-In-Time Generation (No Rigid Boilerplate)
- **Do NOT create 20+ empty folders or static `_template.md` files upfront.**
- **Generate on-demand:** Create sub-documents only when the project scope demands them.
- **Match project size:** A small microservice may only need `docs/01-requirements/` and `docs/02-architecture/`, while a full-stack platform utilizes all 4 pillars.

---

## ⚙️ 2. Meta-Template Engine (On-Demand Generation Recipe)

Every generated document MUST follow the **4 Golden Elements**:

1. **Structured Frontmatter**: Lightweight, machine-parseable metadata.
2. **Negative Scope ("Ranh giới không được làm")**: Explicit boundaries to eliminate hallucination and enable negative test case generation.
3. **RFC-2119 Precision**: Explicit requirement levels (`MUST`, `SHOULD`, `MAY`).
4. **Verification / Acceptance Scenarios**: Measurable criteria (Gherkin BDD `Given-When-Then`, RACI, or Test Matrix).

---

### Pillar 1: Requirements Spec Generators

#### A. Stakeholder & Actor Specification
```markdown
---
id: REQ-ACT-001
title: <Actor Name / Role — Scope>
type: ACTOR_SPEC
scope: <DOMAIN / MODULE>
status: draft | active | archived
source_of_truth: true
---

## 1. Stakeholder & Role Overview
| Stakeholder Group | Role | Representative | Impact | Interest | Communication Channel |
|-------------------|------|----------------|--------|----------|-----------------------|
| Business Ops      | Admin| @ops-lead      | HIGH   | HIGH     | #ops-internal         |

## 2. System Actor Definition
- **Type**: Human | Automated Worker | External Integration Service
- **Description**: Who this actor is and common misconceptions.
- **Business Goal**: The primary business outcome this actor seeks to achieve.
- **Permissions (Allowed)**: Exact operations permitted for this actor.
- **Negative Scope (Ranh giới không được làm)**: Explicit forbidden operations (used for security authorization tests and negative validation).
- **Related Actors**: Upstream auth providers, downstream consumers, or mutually-exclusive actors.

## 3. Decision Matrix (RACI)
| Key Decision / Operation | Responsible (R) | Accountable (A) | Consulted (C) | Informed (I) |
|--------------------------|-----------------|-----------------|---------------|--------------|
| Override Pricing Tier    | Sales Manager   | VP Sales        | Finance       | Account Rep  |
```

#### B. Business Rules & Logic Spec
```markdown
---
id: REQ-BR-001
title: <Business Logic Area>
type: BUSINESS_RULES
status: active
---

## 1. Rules Catalog
| Rule ID | Statement (RFC-2119) | Priority | Validation Trigger | Negative Boundary |
|---------|-----------------------|----------|--------------------|-------------------|
| BR-101  | System MUST enforce 2FA when login location changes | MUST | Auth Challenge | MUST NOT bypass via API token |
| BR-102  | Cart SHOULD reserve inventory for 15 minutes | SHOULD | Checkout Session | Session timeout auto-releases hold |

## 2. Edge Case & Failure Behaviors
- **Network partition during checkout**: Abort transaction, refund hold, return idempotency error.
- **Concurrent updates**: Optimistic concurrency control via version stamp.
```

#### C. User Story & BDD Acceptance Criteria
```markdown
---
id: REQ-US-001
title: <User Story Title>
type: USER_STORY
status: ready_for_dev
---

### User Story
As a **[Persona]**,  
I want to **[Action]**,  
So that **[Business Value / Benefit]**.

### Acceptance Criteria (Gherkin BDD)
```gherkin
Scenario: Successful action under normal conditions
  Given [precondition / system state]
  When [user executes trigger]
  Then [expected outcome]
  And [state mutation verified]

Scenario: Negative boundary violation
  Given [unauthorized user state]
  When [action triggered]
  Then [system rejects with 403 Forbidden]
  And [audit log recorded]
```
```

---

### Pillar 2: Architecture Spec Generators

#### Architecture Decision Record (ADR)
```markdown
---
id: ADR-001
title: <Decision Title>
status: Proposed | Accepted | Superseded | Deprecated
date: YYYY-MM-DD
deciders: [Architect, Lead Dev]
---

## Context & Problem Statement
Why are we making this decision? What constraints or challenges exist?

## Considered Options
1. Option A: Description, Pros, Cons
2. Option B: Description, Pros, Cons

## Decision Outcome
Chosen Option: **[Option A]**  
**Rationale**: Why this option best aligns with requirements and constraints.

## Positive Consequences
- Immediate benefit 1
- Long-term advantage 2

## Negative Consequences & Trade-offs (Negative Scope)
- Technical debt or operational overhead accepted
- Explicit non-goals
```

---

### Pillar 3: UI & Interaction Spec Generators

```markdown
---
id: UI-SPEC-001
screen: <Screen / Feature Name>
design_tokens: "DESIGN.md"
status: approved
---

## 1. Screen Anatomy & States
- **Default State**: Initial rendered view with populated data.
- **Loading State**: Skeleton loaders matching exact component geometry (no layout shift).
- **Empty State**: Friendly CTA guiding user to first action.
- **Error State**: Actionable recovery message with retry trigger.

## 2. Token Alignment
- Colors, typography, spacing, and border-radius MUST strictly reference tokens from `DESIGN.md`.

## 3. Negative UX Scope
- NO generic alert popups; use toast notifications.
- NO unpadded container layouts on mobile (<640px).
```

---

### Pillar 4: QA & Verification Spec Generators

```markdown
---
id: QA-VERIFY-001
target: <Feature / Release>
status: ready
---

## 1. Requirements Traceability Matrix (RTM)
| Requirement ID | Acceptance Scenario | Test Type (Unit/Int/E2E) | Status | Automated Test Link |
|----------------|---------------------|--------------------------|--------|---------------------|
| REQ-BR-101     | 2FA challenge flow  | Integration              | ⏳     | `tests/auth/2fa.test.ts` |

## 2. UAT Verification Checklist
- [ ] Happy path execution verified end-to-end
- [ ] Boundary conditions and invalid inputs rejected gracefully
- [ ] Diagnostics count = 0 (No compiler/linter errors or warnings)
```

---

## 📄 3. Standard Developer Documents

### README Structure
```markdown
# Project Name

Brief one-line description.

## Quick Start
```bash
# Clone & run in <5 minutes
npm install
npm run dev
```

## Features
- Feature 1
- Feature 2

## Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |

## Documentation
- [Requirements](./docs/01-requirements/)
- [Architecture](./docs/02-architecture/)
- [UI Specs](./docs/03-ui-specs/)
- [QA & Tests](./docs/04-qa/)

## License
MIT
```

### Per-Endpoint API Documentation
```markdown
## GET /api/v1/resource/:id

Get resource details by unique identifier.

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| id | string | Yes | Unique resource ID |

**Response:**
- 200: `{ "id": "...", "status": "active" }`
- 404: `{ "error": "Resource not found" }`
```

### Persistent Goal Sheet Template (`_goals.md`)
```markdown
# 🎯 Session Objectives

> Active backlogged goals tracked across agent sessions. Prune completed goals once 100% verified.

## 🚀 Active Objectives
- [ ] Goal 1: Implement authentication service with JWT and refresh token rotation.
- [ ] Goal 2: Set up responsive navigation with design token styling.

## ⚠️ Pending Decisions / Blockers
- [Decision Needed]: Choose between SendGrid vs. Resend for transactional emails.
  - Context: Resend has cleaner DX, SendGrid has established enterprise tier.
  - Workaround in flight: Auth flows proceed using MockMailer until decided.
```

---

## 🤖 4. AI-Friendly Documentation

### llms.txt Template
```markdown
# Project Name
> High-level architecture and system purpose.

## Core Map
- [src/core/]: Core business domain logic
- [src/api/]: Public endpoints and contracts
- [docs/]: 4-Pillars system documentation

## Architectural Principles
- Principle 1: Separation of concern
- Principle 2: Zero-Diagnostics & self-healing
```

---

## 🎯 5. Structure Principles

| Principle | Why |
|-----------|-----|
| **Scannable** | Clear headers, markdown tables, bullet points |
| **Examples First** | Show concrete contracts before abstract theory |
| **Negative Scope** | Explicitly define what is forbidden to prevent hallucinations |
| **Just-in-Time** | Create documents when needed, never generate empty bloat |

