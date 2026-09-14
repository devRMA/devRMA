# 0001 — Foundation: stack, architecture, conventions

> Owner: tech-lead · Gate: `spec` · State: `done` (baseline — written from the shipped build)

Baseline spec. It describes the portfolio as it already exists, so `.specs/` can honor the rebuild contract in `.specs/README.md`. It was derived from the shipped code, not from intent.

## Problem

A hiring manager evaluating senior engineering leadership has ten seconds and twenty tabs open. The portfolio must establish, in that window, that Rafael operates mission-critical distributed systems and leads engineering teams — and then reward a deeper read with real architectural substance.

## Audience & moment

See `PRODUCT.md` § Users and § Operating Context. Primary: tech leaders, VP/Directors of Engineering, hiring managers. Desktop during hiring reviews; mobile from LinkedIn and résumé links.

## Outcome

The evaluator can state Rafael's level, domain, and current scope without scrolling, and can reach verifiable evidence for any claim within two interactions.

## Scope

### Stack

| Concern | Decision |
|---|---|
| Framework | Next.js 15, App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS 3, tokens in `tailwind.config.ts`, `cva` for variants, `cn()` from `lib/utils` |
| UI primitives | Radix UI (`dialog`, `dropdown-menu`, `tabs`, `slot`), `lucide-react` icons |
| Motion | `framer-motion`, always with a `prefers-reduced-motion` path |
| Theming | `next-themes`, dark and light, system detection |
| i18n | `locales/en.ts` + `locales/pt-BR.ts` through `components/language-provider.tsx` |
| Tests | Vitest + Testing Library + jsdom |
| Lint | Biome |
| Hosting | Vercel, preview deploy per PR; SonarCloud quality gate in CI |
| Package manager | pnpm |

### Architecture — atomic design

```
app/              App Router: layout, page, metadata, icon/manifest/robots/sitemap/opengraph-image
components/
  atoms/          indivisible units: logo, buttons, icons, toggles, indicators, cursor, clock
  molecules/      composed units: cards (project, skill, certificate, education), nav items, terminal, marquee
  organisms/      page sections: hero, experience, projects, skills, certificates, contact, header, footer, navigation, mobile menu
  templates/      main-layout
  ui/             Radix-based primitives (badge, button, card, dialog, dropdown-menu, tabs)
  *-provider.tsx  language, theme, motion, performance providers
data/             factual record: experience, projects, certificates
hooks/            use-active-section, use-mobile
lib/              utils, duration, console-easter-eggs
locales/          en.ts, pt-BR.ts
```

Rules: a component lives at the lowest level that fits. Content never lives in a component — it comes from `locales/` or `data/`. Providers wrap at the layout level.

### Content sections

Hero, experience, projects, skills, certificates, contact — order and narrative per `PRODUCT.md` § Positioning and § Product Principles. Every claim traces to `data/` or `locales/`.

### Design system

`DESIGN.md` is authoritative: color tokens (dark + light pairs), type ramp, spacing rhythm, motion rules. No raw hex or arbitrary values where a token exists.

## Out of scope

- A CMS, a database, or any backend. Content is source-controlled and typed.
- Analytics or tracking beyond what already ships.
- Testimonials, or any metric not documented in source. See `PRODUCT.md` § Evidence on Hand.
- Additional locales beyond pt-BR and en.

## Acceptance criteria

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | Renders correctly at 1440 and 390, in dark and light — all four combinations | `node .agents/tools/preview.mjs` screenshots |
| AC2 | Zero axe-core violations at `critical` or `serious`; WCAG 2.1 AA in both themes | `evidence/report.json` |
| AC3 | Full key parity between `locales/en.ts` and `locales/pt-BR.ts` | structural diff of both files |
| AC4 | `pnpm build`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test` all clean | commands |
| AC5 | Test coverage at or above the project baseline | `pnpm test:coverage` |
| AC6 | Metadata, sitemap, robots, manifest, and OG image resolve and reflect current content | `app/` + fetch |
| AC7 | Zero console errors or React warnings on load | `evidence/report.json` |
| AC8 | Every interactive element keyboard-reachable with a visible focus style | keyboard pass + axe |
| AC9 | All motion degrades under `prefers-reduced-motion` | `components/motion-provider.tsx` + component tests |
| AC10 | Every factual claim traceable to `data/`, `locales/`, or `PRODUCT.md` | manual audit |

## Evidence available

See `PRODUCT.md` § Evidence on Hand — iShip and iSend case studies, career timeline in `data/experience.tsx`, credentials in `data/certificates.tsx`, projects in `data/projects.tsx`.

## Open questions

None. This spec records a shipped state.
