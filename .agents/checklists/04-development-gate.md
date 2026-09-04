# Gate 4: Implementation & Code Safety Checklist

> **Owner**: Fullstack / Specialist Developer  
> **Mandatory Skills**: `clean-code`, `ast-grep`, `silent-failure-hunter`, `lint-and-validate`  
> **Target**: Transition from designs & contracts to production-grade, bug-free implementation.

---

## 🧹 Clean Code Standards
- [ ] **Concise & Direct**: No over-engineering, unnecessary abstraction layers, or speculative generality (YAGNI).
- [ ] **Self-Documenting**: Functions are short (< 30 lines where possible), variable names describe intent clearly.
- [ ] **No Dead Code**: Removed unused imports, commented-out blocks, and temporary debug statements.

---

## 🛡️ AST & Error Safety
- [ ] **AST Scan with `ast-grep`**: Verified structural syntax safety:
  ```bash
  npx ast-grep run --pattern 'catch ($ERR) { }' --lang typescript
  ```
- [ ] **No Swallowed Errors**: Zero empty catch blocks, unhandled promise rejections, or quiet `return null` failures.
- [ ] **Error Propagation**: Errors are contextualized with component name and operational details.

---

## ⚙️ Compilation & Static Analysis
- [ ] **Type Check Pass**: `tsc --noEmit` (or language compiler) exits with code 0 (zero errors).
- [ ] **Linter Clean**: ESLint / Ruff / Biome checks pass with zero warnings.
- [ ] **Unit Tests (AAA Pattern)**:
  - Unit tests written covering happy paths and edge cases.
  - Follows Arrange-Act-Assert structure.

---

## 🚪 Gate Sign-off Condition
- **Pass**: Code compiles cleanly, AST check passes, unit tests green.
- **Halt**: Any compilation error, type failure, or swallowed error blocks transition to Gate 5.
