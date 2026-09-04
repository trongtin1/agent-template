# Gate 3: UI/UX & Interface Design Checklist

> **Owner**: `ui-ux-designer` / `frontend-specialist`  
> **Mandatory Skills**: `frontend-design`, `design-spec`, `taste-skill`, `web-design-guidelines`  
> **Target**: Transition from wireframe/requirements to premium, anti-slop interface.

---

## 🎨 Token Architecture (`DESIGN.md`)
- [ ] **Design Tokens Exist**: `DESIGN.md` exists with explicit tokens for colors, typography, spacing, and radius.
- [ ] **No Generic Palette**: Strictly avoided the generic AI trope (plain purple `#8B5CF6`, dark cyan, default Inter).
- [ ] **Contrast Ratios**: Body text meets WCAG AA (>= 4.5:1), large text meets >= 3:1.

---

## 🔍 Anti-Slop Audit & Distinctiveness
- [ ] **Swap-Test Passed**: If the brand logo is removed, the page still looks unique and distinctly designed.
- [ ] **Typography Depth**: Clear hierarchy across H1, H2, body, and micro-copy (distinct sizes, weights, line-heights).
- [ ] **Spacing Consistency**: Grid and padding adhere strictly to predefined spacing tokens (no random margin values).
- [ ] **Micro-Interactions**: Hover, active, focus-visible states defined for all clickable elements.

---

## 🔄 State Completeness (The 4 States)
- [ ] **Default State**: Populated with realistic copy and assets (no lorem ipsum or placeholder boxes).
- [ ] **Loading State**: Skeleton loaders or subtle spinners with fixed dimensions to prevent Cumulative Layout Shift (CLS).
- [ ] **Empty State**: Meaningful illustration/icon, clear explanation, and primary call-to-action button.
- [ ] **Error State**: User-friendly message explaining what went wrong and a recovery action (e.g. Retry).

---

## 🚪 Gate Sign-off Condition
- **Pass**: Visual excellence verified, 4 states designed, ready for frontend implementation.
- **Halt**: If interface looks generic, violates contrast, or lacks state handlers, refine design before coding.
