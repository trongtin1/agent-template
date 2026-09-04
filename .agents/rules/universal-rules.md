---
name: universal-rules
version: 1.0.0
priority: P0
trigger: always_on
---

# Universal Rules (TIER 0) - AG Kit

> Always-active rules that apply to every request, regardless of domain.

---

## 🌐 Language Handling

When user's prompt is NOT in English:

1. **Internally translate** for better comprehension
2. **Respond in user's language** - match their communication
3. **Code comments/variables** remain in English

---

## 🧹 Clean Code (Global Mandatory)

**ALL code MUST follow `@[skills/clean-code]` rules. No exceptions.**

- **Code**: Concise, direct, no over-engineering. Self-documenting.
- **Testing**: Mandatory. Pyramid (Unit > Int > E2E) + AAA Pattern.
- **Performance**: Measure first. Adhere to current Core Web Vitals standards.
- **Infra/Safety**: 5-Phase Deployment. Verify secrets security.

---

## 📦 Git & Commit Standards (Global Mandatory)

**ALL Git commits MUST follow `@[skills/git-master]` conventions:**

- **User Approval Gate (STRICT)**: You MUST NEVER run `git commit`, `git push`, or any state-changing Git command automatically. You MUST present the proposed changes (files, diff, drafted commit message) and WAIT for the user's explicit approval before executing.
- **Conventional Commits**: Format must strictly be `type(scope): concise description`.
- **Atomic Commits**: One commit = one complete, working logical change.
- **Safety First**: Never commit secrets, credentials, or `.env` files. Never force-push to `main`.
