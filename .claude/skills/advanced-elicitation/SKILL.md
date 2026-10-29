---
name: advanced-elicitation
description: Advanced requirements elicitation framework to uncover unstated assumptions, discover edge cases, and clarify ambiguous user intents.
when_to_use: "When requirements are vague, underspecified, or complex, to uncover blindspots and interview the user with high-leverage questions."
allowed-tools: Read, Grep, Glob, Bash
version: 1.0.0
---

# Advanced Elicitation — Discovering Unstated Assumptions

Based on cognitive interviewing and advanced requirements engineering techniques, this skill helps agents extract true intent from brief or ambiguous user prompts before planning or coding.

---

## 🎯 The 4 Elicitation Lenses

When presented with a request, examine it through these four lenses:

### 1. The Boundary Lens (Scope & Extremes)
- What is explicitly **IN** scope?
- What is explicitly **OUT** of scope? (Often more important than in-scope)
- What are the volume/traffic/data size extremes? (1 user? 10,000 concurrent? 100MB vs 10GB?)

### 2. The Failure Lens (Negative Paths & Resilience)
- What happens when network/API fails midway?
- What if the user submits empty, corrupted, or malicious input?
- How should conflicts (e.g. concurrent edits) be resolved?

### 3. The User Journey Lens (Personas & Friction)
- Who is the primary actor? (Novice, Admin, Power user, External API)
- What is the user's emotional state or time constraint?
- Where is the potential point of abandonment or confusion?

### 4. The Architectural Trade-off Lens
- Speed of delivery vs. Long-term maintainability?
- Consistency vs. Availability?
- Simplicity (Boring tech) vs. Flexibility (Custom abstractions)?

---

## 📋 Interview Protocol (Socratic & Focused)

1. **Rule of 3**: Ask maximum 2-3 high-impact questions per turn. Never flood the user with a 10-item questionnaire.
2. **Multiple-Choice with Defaults**: Provide recommended options to reduce cognitive load:
   - ✅ *"For auth session storage: (A) HTTP-only cookies (Recommended), (B) LocalStorage with refresh token, (C) In-memory only?"*
   - ❌ *"How would you like to handle auth sessions in the application?"*
3. **Reflect & Validate**: Before proceeding, summarize the locked intent:
   - *"Locked Intent: We are building X for Y with constraint Z. Ready to design."*
