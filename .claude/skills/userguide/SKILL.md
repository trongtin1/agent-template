---
name: userguide
description: Author operations manuals and user guides for administrators, customer support, or end-users from software specifications following the Diátaxis framework (Tutorial, How-To, Reference, Explanation) with a mandatory 2-phase workflow (outline approval -> detailed drafting).
when_to_use: Use whenever the user or BA asks to write or generate user guides, operations manuals, customer support runbooks, admin guides, or end-user instructions.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
version: 1.0.0
---

# User Guide & Operations Manual — Diátaxis Documentation Framework

Specialized skill for creating **Operations Manuals and User Guides** targeted at system administrators, customer support (CS) personnel, operations staff, or end-users by analyzing software specifications (PRDs, SRS, Use Cases, Screen Specs, and Error Matrices).

---

## 1. Core Principles

1. **Mandatory 2-Phase Workflow (HARD STOP Gate)**:
   - **Phase 1 (Outline Proposal & Approval)**: Inspect available specs $\rightarrow$ Extract user tasks $\rightarrow$ Construct task-based Table of Contents (ToC) under Diátaxis $\rightarrow$ Perform quality self-review $\rightarrow$ **PRINT OUTLINE TO CHAT AND STOP (HARD STOP)** to wait for user confirmation (`proceed` / `ok`) and audience verification.
   - **Phase 2 (Detailed Drafting)**: Author individual pages only after explicit outline approval.
2. **Diátaxis Structural Framework (Do not expose Diátaxis academic terms in user deliverables)**:
   - **Quick Start (Tutorials)**: First-time onboarding, a single guaranteed linear path ensuring immediate success.
   - **Task-Based Guides (How-To)**: Practical step-by-step solutions for specific operator goals. Titles must **start with active verbs** (e.g., *Lock User Account*, *Export Revenue Report*, *Process Refund*).
   - **Technical Reference**: Exhaustive tables of error codes, configuration parameters, permission roles, and system boundaries. Dry, factual, non-narrative.
   - **Conceptual Overview (Explanation)**: System background, underlying domain models, and design rationale.
   - **Troubleshooting**: Mapped directly from Error Matrices $\rightarrow$ Symptoms, root causes, and explicit recovery steps.
3. **Every Page Is Page One**:
   - Each page must be **self-contained**: establishes immediate context in the first 1–2 sentences, does not assume sequential reading, and provides explicit navigation links to related topics.
4. **Zero Spec Invention**:
   - Never invent business limits, error codes, or button labels absent from specs; flag unknowns with `<!-- TBD -->` and raise structured Open Questions.

---

## 2. Detailed Execution Workflow

### Phase 1: Survey & Outline Proposal

1. **Inspect Source Artifacts**: Read project specifications in `docs/`, `srs/`, `usecases/`, or codebase context.
2. **Determine Target Audience**:
   - *System Administrator*: Focus on configurations, access control, audit logging, and exception recovery.
   - *Customer Support / Operations*: Focus on customer lookups, dispute handling, operational actions, and ticket workflows.
   - *End-User*: Simple, action-oriented language focused on personal task completion.
3. **Draft Table of Contents**:
   ```markdown
   | # | Page Title (Task-based) | Diátaxis Category | Source Reference | Goal / Description |
   |---|---|---|---|---|
   | 1 | Quick Start: First Login & Password Setup | Tutorial | UC01, UC02 | Safe first-time operator onboarding |
   | 2 | Lock or Reactivate User Account | How-To Guide | SRS-SEC-04 | CS/Admin handling compromised accounts |
   | 3 | Payment Error Code Directory | Technical Reference | Error-Matrix.md | Rapid lookup table for checkout failures |
   | 4 | Troubleshooting: Stalled Payment Orders | Troubleshooting | SRS-PAY-03 | Webhook verification and manual settlement |
   ```
4. **Pre-submission Self-Review Checklist**:
   - [ ] Covers all necessary pillars: Overview, Quick Start, How-To Guides, Reference, and Troubleshooting.
   - [ ] Do all How-To titles start with active verbs?
   - [ ] Are how-to instructions kept distinct from reference lookup tables?
   - [ ] Are all pages grounded in verified sources with zero fabricated data?
5. **HARD STOP**: Print the proposed outline in chat and wait for user review.

---

## 3. Phase 2: Detailed Drafting & Packaging

Once the user approves the outline:
1. **Author Each Section**:
   - Use the standard template at `.agents/skills/userguide/templates/userguide-section.md`.
   - Structure each How-To topic:
     - **Purpose & Prerequisites**: Required permissions, starting screen.
     - **Step-by-Step Instructions**: Numbered steps (`1, 2, 3...`) detailing specific button clicks and field inputs.
     - **Expected Outcome**: What the system displays upon completion.
     - **Error Handling**: What to do if something fails.
2. **Visual Callouts & Media**:
   - Insert image placeholders: `![Screen Illustration](#images/{feature}-{slug}.png)`
   - Include numbered callout tables below:
     - `(1)`: Primary action button.
     - `(2)`: Date filter controls.
     - `(3)`: Order status badge.
   - If Playwright is installed locally, optional automated screenshot verification can be executed via:
     ```bash
     node .agents/skills/userguide/engine/check-playwright.mjs
     ```
3. **Generate Visual Preview**:
   - Leverage `.agents/skills/userguide/templates/userguide-preview.html` to package an interactive HTML viewer for the documentation bundle.
