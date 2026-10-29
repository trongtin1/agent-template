---
name: testing-patterns
description: Testing patterns and principles. Unit, integration, mocking strategies.
when_to_use: "When writing unit tests, integration tests, choosing testing frameworks, or implementing mocking strategies."
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
version: 1.0.0
---

# Testing Patterns

> Principles for reliable test suites.

---

## 1. Testing Pyramid

```
        /\          E2E (Few)
       /  \         Critical flows
      /----\
     /      \       Integration (Some)
    /--------\      API, DB queries
   /          \
  /------------\    Unit (Many)
                    Functions, classes
```

---

## 2. AAA Pattern

| Step | Purpose |
|------|---------|
| **Arrange** | Set up test data |
| **Act** | Execute code under test |
| **Assert** | Verify outcome |

---

## 3. Test Type Selection

### When to Use Each

| Type | Best For | Speed |
|------|----------|-------|
| **Unit** | Pure functions, logic | Fast (<100ms) |
| **Integration** | API, DB, services | Medium |
| **E2E** | Critical user flows | Slow |

---

## 4. Unit Test Principles

### Good Unit Tests

| Principle | Meaning |
|-----------|---------|
| Fast | < 100ms each |
| Isolated | No external deps |
| Repeatable | Same result always |
| Self-checking | No manual verification |
| Timely | Written with code |

### What to Unit Test

| Test | Don't Test |
|------|------------|
| Business logic | Framework code |
| Edge cases | Third-party libs |
| Error handling | Simple getters |

---

## 5. Integration Test Principles

### What to Test

| Area | Focus |
|------|-------|
| API endpoints | Request/response |
| Database | Queries, transactions |
| External services | Contracts |

### Setup/Teardown

| Phase | Action |
|-------|--------|
| Before All | Connect resources |
| Before Each | Reset state |
| After Each | Clean up |
| After All | Disconnect |

---

## 6. Mocking Principles

### When to Mock

| Mock | Don't Mock |
|------|------------|
| External APIs | The code under test |
| Database (unit) | Simple dependencies |
| Time/random | Pure functions |
| Network | In-memory stores |

### Mock Types

| Type | Use |
|------|-----|
| Stub | Return fixed values |
| Spy | Track calls |
| Mock | Set expectations |
| Fake | Simplified implementation |

---

## 7. Test Organization

### Naming

| Pattern | Example |
|---------|---------|
| Should behavior | "should return error when..." |
| When condition | "when user not found..." |
| Given-when-then | "given X, when Y, then Z" |

### Grouping

| Level | Use |
|-------|-----|
| describe | Group related tests |
| it/test | Individual case |
| beforeEach | Common setup |

---

## 8. Test Data

### Strategies

| Approach | Use |
|----------|-----|
| Factories | Generate test data |
| Fixtures | Predefined datasets |
| Builders | Fluent object creation |

### Principles

- Use realistic data
- Randomize non-essential values (faker)
- Share common fixtures
- Keep data minimal

---

## 9. Best Practices

| Practice | Why |
|----------|-----|
| One assert per test | Clear failure reason |
| Independent tests | No order dependency |
| Fast tests | Run frequently |
| Descriptive names | Self-documenting |
| Clean up | Avoid side effects |

---

## 10. Anti-Patterns & Strict Testing Invariants

| ❌ Don't | ✅ Do | Why |
|----------|-------|-----|
| **Tautological Assertions** (`expect(res).toBeDefined()`, `expect(true).toBe(true)`) | Assert specific domain values and error codes | AI creates fake asserts that pass without validating logic |
| **Magic Sleep** (`sleep(1000)`, `setTimeout`) | Polling with timeout or event/predicate waiters | Flaky in CI/CD and hides race conditions |
| **Swallowing Preconditions** (`try { ... } catch {}`) | Let precondition errors fail loudly | Conceals configuration/schema mismatches |
| Test implementation details | Test visible user/contract behavior | Fragile tests that break upon refactor |
| Duplicate test code | Use factories and shared builders | Maintenance burden |
| Skip cleanup | Reset DB state and mocks in `afterEach` | Cross-test contamination |

---

## 11. Live UAT & Verification Beyond Unit Tests

Unit tests prove isolated logic; they do NOT prove the user experience works end-to-end.
- **For UI / Frontend**: Use `browser_subagent` to render the DOM on localhost, interact with elements, and verify layout/events.
- **For Database & API**: Never assume TypeScript types mean the live DB works. Run actual migration commands and execute live queries.
- **User Acceptance Check**: Every completed task must provide a verifiable step-by-step User Flow checklist for sign-off.

---

> **Remember:** Tests are documentation and executable contracts. If someone can't understand what the code does from the tests, rewrite them.
