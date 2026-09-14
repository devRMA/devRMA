# 0001 — Design

> Owner: product-designer · Gate: `design` · Baseline

The design system for this portfolio lives in **`DESIGN.md` at the repository root**, derived from the shipped build: color tokens as dark/light pairs, the type ramp, spacing rhythm, component patterns, and motion rules.

It is not duplicated here. A second copy drifts from the first, and the rebuild contract is only honored if there is exactly one authority.

## What this spec adds

- **Hierarchy** — 1s: identity and current scope. 5s: domain and scale of the systems. 30s: architectural substance and verifiable evidence. See `PRODUCT.md` § Product Principles.
- **Viewports** — desktop 1440 and mobile 390 are the two that ship and the two every gate checks.
- **Themes** — dark and light both ship, both at WCAG AA. Every color decision is a pair.
- **Motion** — `framer-motion`, every animation with a declared `prefers-reduced-motion` fallback, wired through `components/motion-provider.tsx`.
- **Atomic levels** — the component tree and placement rules are in `spec.md` § Architecture.

## System change

None. This records the incumbent system.
