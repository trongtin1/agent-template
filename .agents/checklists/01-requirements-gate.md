# Gate 1: Requirements & Elicitation Checklist

> **Owner**: `product-manager` / `product-owner`  
> **Mandatory Skills**: `advanced-elicitation`, `plan-writing`, `brainstorming`  
> **Target**: Transition from vague idea to razor-sharp specification.

---

## 🎯 Scope & Problem Clarity
- [ ] **Core User Problem**: Clearly states what pain point is being solved and for whom.
- [ ] **In-Scope Boundaries**: Explicitly lists features included in this iteration.
- [ ] **Out-of-Scope (Non-Goals)**: Explicitly lists what is deliberately deferred or omitted.
- [ ] **Value Proposition**: Defines how success will be measured (key metric or user action).

---

## 🧠 Advanced Elicitation & Edge Cases
- [ ] **Unstated Assumptions**: Validated unspoken expectations (e.g. auth requirements, offline capability, data persistence).
- [ ] **Failure Modes**: Clarified system behavior when inputs are missing, invalid, or services fail.
- [ ] **Scale & Volume**: Clarified volume expectations (e.g. 10 items vs 100,000 items).
- [ ] **Platform & Constraints**: Target devices, browsers, screen sizes, or environments verified.

---

## 📝 Acceptance Criteria (Given-When-Then)
- [ ] Every user story includes concrete scenarios:
  ```gherkin
  Given [initial state or preconditions]
  When [action taken by user or system]
  Then [expected outcome and state change]
  ```
- [ ] No ambiguous language ("fast", "user-friendly", "clean") without measurable definition.

---

## 🚪 Gate Sign-off Condition
- **Pass**: All checkboxes marked `[x]`, documented in PRD or `{task-slug}.md`.
- **Halt**: If acceptance criteria are unclear or scope is unbounded, trigger `advanced-elicitation` interview before proceeding to Gate 2.
