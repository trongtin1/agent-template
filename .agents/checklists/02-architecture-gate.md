# Gate 2: Architecture & System Design Checklist

> **Owner**: `system-architect`  
> **Mandatory Skills**: `architecture`, `api-patterns`, `database-design`, `ast-grep`  
> **Target**: Transition from product specifications to resilient technical blueprint.

---

## 🏛️ System Boundaries & Dependencies
- [ ] **Boundary Definition**: Modules, services, and directory responsibilities are strictly separated.
- [ ] **Dependency Blast Radius**: Identified all files and components affected using `CodeGraph` or import analysis.
- [ ] **Structural Code Outline**: Ran `python .agents/skills/ast-grep/scripts/ast_outline.py` on target files to inspect signatures before modifying.

---

## ⚖️ Trade-Offs & ADR Documentation
- [ ] **Architecture Decision Record (ADR)**: Documented context, options considered, chosen solution, and trade-offs.
- [ ] **Simplicity Filter**: Ensured no premature abstractions or unnecessary complexity (favors boring, proven tech).
- [ ] **Performance Budget**: Defined latency, payload size, and bundle size constraints.

---

## 📐 Data Contracts & API Design
- [ ] **Data Schema**: Schemas defined with strong types (TypeScript types, Zod schemas, or DB migrations).
- [ ] **API Contracts**: Request/response payloads, error status codes, and pagination schemes formalized.
- [ ] **Security & Secret Posture**: Sensitive fields marked for encryption, no secrets in client payloads.

---

## 🚪 Gate Sign-off Condition
- **Pass**: Data flow, interfaces, and file dependencies validated with zero architectural ambiguity.
- **Halt**: If data schemas or API boundaries conflict with existing code, revise ADR before passing to Gate 3 or Gate 4.
