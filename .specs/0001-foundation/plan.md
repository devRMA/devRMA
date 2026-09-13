# 0001 — Implementation plan

> Owner: tech-lead · Gate: `plan` · Baseline

This spec records a shipped build; there is no forward task list. The architecture is in `spec.md` § Architecture, and the code is its own record.

## Architecture

Next.js 15 App Router with atomic-design components. Providers (language, theme, motion, performance) wrap at the layout level. Content flows from `locales/` and `data/` into organisms; components hold no strings and no facts.

## Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| UI primitives | Radix UI | Accessible behavior (focus trap, keyboard, ARIA) that is expensive and error-prone to reimplement |
| Motion | `framer-motion` | Declarative variants and reduced-motion support; already the codebase idiom |
| Theming | `next-themes` | System detection and no flash on hydration |
| Variants | `cva` + `tailwind-merge` | Type-safe variants without class collisions |
| Icons | `lucide-react` | Tree-shakeable, consistent stroke weight |
| Browser evidence | `playwright` + `@axe-core/playwright` | Dev-only; powers `.agents/tools/preview.mjs` for the QA, audit, and recruiter gates |

Any addition beyond these requires justification in the feature's own `plan.md`.

## Tasks

None. Future work gets its own spec.

## Risks

| Risk | Signal it happened |
|---|---|
| Locale drift — a key added to one file only | `docs-check` / audit gate parity failure |
| Token drift — raw hex or arbitrary values creeping in | QA gate finding; `DESIGN.md` no longer describes the build |
| A claim added without evidence | Recruiter gate credibility check |
| Bundle growth from a client boundary placed too high | Audit gate bundle-size comparison |
