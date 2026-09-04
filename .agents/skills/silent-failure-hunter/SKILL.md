---
name: silent-failure-hunter
description: Hunt and eliminate swallowed errors, empty catch blocks, unhandled promise rejections, and silent null returns in codebases.
when_to_use: "When debugging mysterious bugs, auditing error handling, or reviewing code changes to ensure errors are surfaced rather than quietly suppressed."
allowed-tools: Read, Grep, Glob, Bash, Edit, Write
version: 1.0.0
---

# Silent Failure Hunter

> Dedicated protocol for finding and eliminating "hidden under the rug" exceptions and silent failures.

## 🎯 Target Patterns to Hunt

### 1. The Empty Catch Block
```typescript
// ❌ CRITICAL ANTI-PATTERN
try {
  await doRiskyOperation();
} catch (e) {
  // ignore
}
```
**Fix**: At minimum, log the error with context (`console.error` / telemetry) or rethrow if unrecoverable.

### 2. Silent Null / Empty Returns
```typescript
// ❌ CRITICAL ANTI-PATTERN
async function fetchUser(id: string) {
  try {
    return await api.get(`/users/${id}`);
  } catch (err) {
    return null; // Caller cannot distinguish between "user not found" and "network/auth failure"
  }
}
```
**Fix**: Throw a domain-specific error or return a typed `Result<User, FetchError>` object.

### 3. Unhandled Floating Promises
```typescript
// ❌ Fire-and-forget without catch
sendAnalyticsEvent(event); // If this rejects, it triggers unhandledRejection or silent crash
```
**Fix**: `void sendAnalyticsEvent(event).catch(logError);`

### 4. Overly Broad Type Casting
```typescript
// ❌ Suppressing TypeScript type safety
const data = (response as any).data;
```
**Fix**: Use type narrowing (`unknown`), Zod schema parsing, or proper generic constraints.

## 🔍 Audit Procedure

1. **Grep for Empty Catches**:
   - `catch\s*\([^)]*\)\s*\{\s*\}`
   - `catch\s*\{\s*\}`
2. **Scan Fallback Defaults**:
   - Check where functions return `null`, `undefined`, or empty arrays `[]` inside error handlers.
3. **Verify Observability**:
   - Ensure all caught errors contain contextual tags: component name, operation ID, and original error stack.
