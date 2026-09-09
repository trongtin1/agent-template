---
name: systematic-debugging
description: 4-phase systematic debugging methodology with root cause analysis and evidence-based verification. Use when debugging complex issues.
when_to_use: "When debugging complex issues, performing root cause analysis, or using evidence-based problem solving. Use with /debug workflow."
allowed-tools: Read, Glob, Grep
version: 1.0.0
---

# Systematic Debugging

> AG Kit Debugging Engine — Evidence-based root-cause analysis, error classification, and systematic recovery.

## Overview
This skill provides a structured approach to debugging that prevents random guessing, classifies errors systematically, and ensures problems are resolved with evidence or escalated clearly.

## 🛡️ Error Classification & Recovery Taxonomy (E1 - E4)

When an error occurs during execution, classify it immediately and apply its binding recovery protocol:

| Code | Error Class | Symptoms / Triggers | Binding Recovery Protocol |
|------|-------------|---------------------|----------------------------|
| **E1** | **Transient** | Network drop, tool timeout, rate limit | Exponential backoff retry (max 3x: 1s, 2s, 4s). |
| **E1b** | **Output Overflow** | Token limit exceeded, payload too large | Automatically switch to chunked read/write operations. |
| **E2** | **Recoverable Logic** | Syntax error, missing import, broken unit test | Isolate root cause via 5 Whys, apply alternate implementation, self-heal. |
| **E3** | **Blocking Environment** | Missing OS package, permission denied, locked file | Snapshot current state, identify exact missing asset, escalate if manual input needed. |
| **E4** | **Cascading Corruption** | DB migration fail, circular dependency, dirty repo | HALT immediately, rollback uncommitted changes to last known good state, report blast radius. |

### ⚠️ Blocked Escalation Standard (Never Halt Silently)

If automated recovery fails or an E3/E4 blocker occurs, **NEVER** halt silently or guess randomly. Present exactly 4 structured options to the user:

```markdown
## ⚠️ BLOCKED — Decision Required

- **Error Class**: {E1/E2/E3/E4} — {Technical Description}
- **Impact Surface**: {Affected files / components}
- **Root Cause**: {Concise cause analysis}

**Options:**
- **A) [Alternative Approach]**: {Alternative implementation} (Trade-off: {trade-off})
- **B) [Skip with Gap]**: {Bypass item} (Limitation: {documented limitation})
- **C) [Provide Input]**: {Specific credential, permission, or decision required}
- **D) [Scope Modification]**: {Adjust requirement scope}

⏳ Awaiting selection...
```

---

## 4-Phase Debugging Process

### Phase 1: Reproduce
Before fixing, reliably reproduce the issue.

```markdown
## Reproduction Steps
1. [Exact step to reproduce]
2. [Next step]
3. [Expected vs actual result]

## Reproduction Rate
- [ ] Always (100%)
- [ ] Often (50-90%)
- [ ] Sometimes (10-50%)
- [ ] Rare (<10%)
```

### Phase 2: Isolate
Narrow down the source.

```markdown
## Isolation Questions
- When did this start happening?
- What changed recently?
- Does it happen in all environments?
- Can we reproduce with minimal code?
- What's the smallest change that triggers it?
```

### Phase 3: Understand
Find the root cause, not just symptoms.

```markdown
## Root Cause Analysis
### The 5 Whys
1. Why: [First observation]
2. Why: [Deeper reason]
3. Why: [Still deeper]
4. Why: [Getting closer]
5. Why: [Root cause]
```

### Phase 4: Fix & Verify
Fix and verify it's truly fixed.

```markdown
## Fix Verification
- [ ] Bug no longer reproduces
- [ ] Related functionality still works
- [ ] No new issues introduced
- [ ] Test added to prevent regression
```

## Debugging Checklist

```markdown
## Before Starting
- [ ] Can reproduce consistently
- [ ] Have minimal reproduction case
- [ ] Understand expected behavior

## During Investigation
- [ ] Check recent changes (git log)
- [ ] Check logs for errors
- [ ] Add logging if needed
- [ ] Use debugger/breakpoints

## After Fix
- [ ] Root cause documented
- [ ] Fix verified
- [ ] Regression test added
- [ ] Similar code checked
```

## Common Debugging Commands

```bash
# Recent changes
git log --oneline -20
git diff HEAD~5

# Search for pattern
grep -r "errorPattern" --include="*.ts"

# Check logs
pm2 logs app-name --err --lines 100
```

## Anti-Patterns

❌ **Random changes** - "Maybe if I change this..."
❌ **Ignoring evidence** - "That can't be the cause"
❌ **Assuming** - "It must be X" without proof
❌ **Not reproducing first** - Fixing blindly
❌ **Stopping at symptoms** - Not finding root cause
