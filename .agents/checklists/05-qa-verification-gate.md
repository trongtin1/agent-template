# Gate 5: QA, Security & Verification Checklist

> **Owner**: `qa-automation-engineer` / `security-auditor`  
> **Mandatory Skills**: `verify-changes`, `webapp-testing`, `vulnerability-scanner`, `testing-patterns`  
> **Target**: Prove functionality works through execution before deployment or final merge.

---

## 🧪 Test Suite & Regression
- [ ] **Automated Test Run**: All unit, integration, and E2E tests pass 100%:
  ```bash
  npm test
  # or python -m unittest
  ```
- [ ] **Regression Checked**: Verified existing features still function normally.
- [ ] **Edge Case Verification**: Verified system handles empty inputs, network dropouts, and invalid data gracefully.

---

## 🔒 Security & Secret Hygiene
- [ ] **Vulnerability Scan**: Checked against OWASP Top 10 vulnerabilities (XSS, SQLi, CSRF, broken access control).
- [ ] **Secret Leak Prevention**: Ensured no API keys, private tokens, or credentials are hardcoded or tracked in Git.
- [ ] **Dependency Audit**: Verified `npm audit` or security scan reports zero critical vulnerabilities.

---

## 🚀 Execution Proof (`verify-changes`)
- [ ] **Execution Evidence**: Proved changes by actually running them (CLI command, HTTP request, or browser test), not just inspecting code.
- [ ] **Walkthrough Created**: Documented changes made, tests executed, and evidence captured in `walkthrough.md`.

---

## 🚪 Gate Sign-off Condition
- **Pass**: All tests green, security clear, execution verified. Ready for commit/deployment.
- **Halt**: Any test failure or security warning blocks release until fixed.
