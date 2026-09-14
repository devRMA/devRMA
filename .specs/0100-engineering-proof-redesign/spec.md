# 0100 — Engineering proof redesign: inverted narrative + real system screenshots

> Owner: product-manager · Gate: `spec`

## Problem

The portfolio currently opens with the products before it opens with the engineer. An evaluator scanning it meets iShip and iSend — their badges, their branding, their route counts — before meeting Rafael's level, scope, or trajectory. Three failures follow:

1. **The page reads as a company showcase.** The reader forms an opinion about what MadeiraMadeira's logistics products do, not about what Rafael designs, decides, and leads. Attention spent on someone else's product is attention not spent on the hiring decision.
2. **The authority signals in the hero are the wrong ones.** The three hero metrics are years, **14 certifications**, and **2 companies**. For a VP of Engineering, a certification count is a junior signal — it is the metric of someone with no production record to point at — and "2 companies" reads as thin tenure rather than as depth. A whole page section is then spent on Udemy certificates, which actively argues against the seniority the rest of the site claims.
3. **The strongest differentiator is invisible.** Rafael went from apprentice to Tech Lead in five years while completing a Software Engineering degree, across two very different domains (medical devices and national logistics). That velocity is the single most persuasive fact available, and today it is buried inside a tabbed job-history list that nobody opens in a two-minute skim.

Compounding this, only one of the four production systems Rafael has worked on has any visual evidence at all. Two systems he built end to end — the Adam Robo A1 medical screening platform and the Adam 4.0 occupational-health system delivered to Electrolux — are absent from the site entirely, despite real screenshots existing.

## Audience & moment

Per `PRODUCT.md` § Users: a VP/Director of Engineering or hiring manager, desktop during a hiring review, mobile from a LinkedIn or résumé link.

| Moment | What must land |
|---|---|
| **10-second first contact** (hero) | Rafael's level, current scope, and formal engineering education — with no metric that reads junior. |
| **2-minute skim** (trajectory → proof) | The ascent — apprentice to Tech Lead in five years — and four production systems he built, each identified by its engineering problem, each with visible evidence. |
| **Deep dive** (case detail) | For one chosen case: the problem, the architectural decisions and trade-offs, the outcome and the leadership exercised, plus the real interface as corroboration. |

## Outcome

The evaluator can state, without scrolling, that Rafael is a Tech Lead with formal engineering education and five years of production experience. Within two minutes they can name at least two distinct hard problems he solved in two different domains, and they attribute those systems to **Rafael**, not to Adam Robo, Electrolux, or MadeiraMadeira. The reader who wants more opens a case and finds architecture, not marketing.

## Scope

### A. Hero — authority signals corrected

- Replace the "14 certifications" metric with the formal Software Engineering education at Universidade Positivo (see AC3 and OQ1 — the wording must not outrun the record in `data/experience.tsx`).
- Replace the "2 companies" metric with the leadership scope: Tech Lead, architecture and squad leadership.
- The years-of-experience metric stays, still computed rather than hardcoded.

### B. Certificates removed

- The certificates section and its navigation entry are removed from the site. No certificate content remains reachable by scroll, anchor, or keyboard.
- No orphaned component, data, locale key, test, or style may remain behind. Whether files are deleted or repurposed is the tech-lead's call; dead code is not.

### C. Narrative order and navigation

- Page order becomes: positioning (hero) → trajectory → engineering proof → skills → contact. The engineer is established before any system is shown.
- Navigation goes from six items to five: `about → experience → projects → skills → contact`, in that order, in both desktop and mobile navigation, with active-section tracking correct for the new order.

### D. Trajectory — the ascent made legible

- Above the existing professional/academic tabs, add an executive summary of the career as three phases: technical foundation (SENAI + apprenticeship), leadership and university (IT coordination at Adam Robo while graduating), and high scale and governance (MadeiraMadeira, iSend → iShip Tech Lead).
- The existing detailed tabs are preserved unchanged as the verification layer beneath the summary. Every phase's facts trace to `data/experience.tsx`.

### E. Four engineering proofs

- The projects section presents four production cases of equal structural weight: iShip, iSend, Adam Robo A1, Adam 4.0 @ Electrolux.
- Each case is identified primarily by its **engineering challenge** and by **Rafael's role**, not by the product's value proposition.
- Each case opens a detail view containing, at minimum: the problem, the architecture and its trade-offs, the outcome and leadership exercised, and the full technology set.
- The iShip architecture diagram currently rendered inline on the page moves into the iShip detail view, reclaiming the page for the four cases.
- Open-source and personal projects remain, explicitly subordinated below the four production cases.
- The iSend "1,100+ routes" framing is retired as the case's headline claim in favour of legacy stabilisation and observability. The route count may survive inside detailed prose where it is descriptive rather than a boast (writer's call), but it is never a badge, never a metric, and never the case title.

### F. Real screenshots as proof, not as advertising

- The eleven supplied captures in `assets/screenshots/` become the visual evidence for the A1 and Electrolux cases. They ship from this repository; no external image hosting.
- The presentation must read as *"this is a system Rafael built"*, never as *"this is a product you should buy"*. The constraint is made testable in AC8–AC11.
- iShip keeps `public/app-iship.png`. iSend has no capture and keeps a rendered, visibly schematic visual — see AC12.

### G. Pre-existing quality debt that blocks the gate

- `pnpm exec tsc --noEmit` is currently red with three errors (`components/__tests__/project-card.test.tsx:73`, `hooks/__tests__/use-mobile.test.tsx:86` and `:96`). They are fixed in this spec, because §9 of `AGENTS.md` cannot otherwise be met.

### H. Documentation reconciliation (recorded here, executed at G6)

`PRODUCT.md` § Evidence on Hand contradicts this spec in three places and must be reconciled by the `release-manager` at the docs gate, not by any agent earlier in the pipeline:

- it lists `data/certificates.tsx` as evidence, which this spec removes from the site;
- it cites "1,100+ routes" as the iSend headline, which this spec retires;
- it does not list the Adam Robo A1 or Adam 4.0 @ Electrolux systems, which this spec introduces as first-class evidence.

**Reconciled at G6:** all three fixed in `PRODUCT.md` § Evidence on Hand — `data/certificates.tsx` removed, "1,100+ routes" retired as a headline (kept only where `locales/*.ts` itself uses it as descriptive prose), and both Adam Robo systems added as first-class evidence entries.

## Out of scope

Binding on every downstream agent. Anything here that turns out to be worth doing becomes its own spec.

- **Restructuring the skills section** into four engineering domains. The skills section is reordered on the page but its internal content and structure are untouched. *(Recommended follow-up: spec 0101.)*
- **A command palette or global search** (`⌘K`). No such feature exists; a badge advertising one would be a fabrication and the feature itself is a separate product decision.
- The interactive terminal, the contact section, the footer, the header, the theme toggle, and the language toggle — unchanged.
- Any change to `DESIGN.md` tokens, the type ramp, or the colour system. If the designer concludes a system change is required, that is a human approval point per `AGENTS.md` §4.
- Editing `PRODUCT.md` or `DESIGN.md` before G6.
- New npm dependencies, including any lightbox, carousel, or image-zoom library.
- New routes or per-case pages. The portfolio stays a single page.
- Any screenshot, mockup, or visual asset beyond the eleven supplied captures and the existing `public/app-iship.png`. Nothing is generated in Figma or invented for this spec.
- Video, animated GIF, or auto-playing media.
- Analytics, tracking, or a third locale.
- Any claim about A1 or Electrolux beyond the Evidence table below.

## Acceptance criteria

Every criterion is verifiable by an agent with a browser and a terminal.

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | The site contains no certificates section, no navigation entry for it, and no reachable `#certificates` anchor, in both locales | Browser: keyboard-tab the full page and the mobile menu; `grep` for the anchor in rendered HTML |
| AC2 | No unreferenced certificate component, data module, locale key, test, or CSS rule remains in the repository | `grep -ri certificate` across `app components data hooks lib locales` returns only intentional survivors, each justified in `plan.md` |
| AC3 | Neither hero metric asserts a completed degree while `data/experience.tsx` records the Software Engineering degree as `inProgress: true`. The education metric names the course and the institution, and its status matches the record | Read the rendered hero against `data/experience.tsx`; component test |
| AC4 | The hero shows exactly three metrics: computed years of experience, the Positivo education, and Tech Lead scope. No certification count, no company count | Browser at 1440 and 390, both locales |
| AC5 | Navigation shows exactly five items in the order `about, experience, projects, skills, contact`, on desktop and in the mobile menu, and the active-section indicator tracks the new page order while scrolling | Browser + existing `use-active-section` tests extended |
| AC6 | The page renders sections in the order hero → experience → projects → skills → contact | `app/page.tsx` + DOM order assertion in `app/__tests__/page.test.tsx` |
| AC7 | The trajectory section presents three phase summaries above the existing professional/academic tabs, and every company, role, date and institution stated in them matches `data/experience.tsx` | Browser + line-by-line diff against `data/experience.tsx` |
| AC8 | Exactly four production cases are presented with equal structural weight: each has a role badge naming Rafael's position, an engineering-challenge headline, a technology set, and a visual | Browser at 1440 and 390 |
| AC9 | No case headline, subtitle, or badge is a product value proposition, a company tagline, or a marketing claim about the employer or the client. Each case headline names an engineering problem | Read all four cases in both locales against this criterion; `copy.md` review |
| AC10 | No company logo, wordmark, or brand asset is added to the repository or extracted from a screenshot for use as an icon, badge, watermark, or section decoration. Brand marks appear only where they naturally occur inside an unmodified capture | `git status` on `public/`; visual inspection of all case visuals |
| AC11 | Every case visual has alt text that describes the system's function and Rafael's authorship, and does not merely name the company | axe-core + read every `alt` value in both locales |
| AC12 | The iSend visual is unmistakably a diagram or schematic, never a simulated product interface that a reader could mistake for a screenshot of the real system | Visual inspection; `design.md` states the distinction explicitly |
| AC13 | No fabricated hostname, URL, or environment string is rendered anywhere. Any window-chrome affordance shows either a real address or a non-URL environment label | `grep` the rendered output for `.interno`, `adamrobo.com.br`, `isend` hostnames; read `copy.md` |
| AC14 | Each case is understandable in English without reading any text inside a screenshot — the captures are pt-BR product UI and are never translated | Switch to `en`, read all four cases and their detail views |
| AC15 | Every case detail view states, at minimum, the problem, the architecture and its trade-offs, the outcome and leadership exercised, and the technology set; the iShip architecture diagram appears there and no longer inline on the page | Browser, all four cases |
| AC16 | Every case detail view opens and closes by keyboard alone, traps focus while open, closes on `Esc`, and returns focus to the trigger. No case is reachable by pointer only | Keyboard-only pass; component tests covering open, `Esc`, and focus return |
| AC17 | Open-source and personal projects remain present and are visually and structurally subordinate to the four production cases | Browser |
| AC18 | Every case visual is delivered at or below 300 KB at its rendered size, and Largest Contentful Paint does not regress against the pre-change baseline | Network panel / `preview.mjs` evidence; before-and-after measurement |
| AC19 | `pnpm build`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test` all clean — including the three pre-existing type errors | Commands |
| AC20 | Coverage is at or above the project baseline after the certificates tests are removed, and every new component has tests covering keyboard and reduced-motion paths | `pnpm test:coverage` |
| AC21 | Full key parity between `locales/en.ts` and `locales/pt-BR.ts`, no orphaned keys, no hardcoded user-visible string in any new or changed component | Structural diff + `grep` for literals in JSX |
| AC22 | Zero axe-core violations at `critical` or `serious` and zero console errors, at 1440 and 390, in dark and light — all four combinations | `node .agents/tools/preview.mjs`, `evidence/report.json` |
| AC23 | Every factual claim on the page traces to a row in the Evidence table below, to `data/`, or to `locales/`. Nothing invented | Manual audit at G5 and G8 |

## Evidence available

This table is exhaustive for the new claims. A claim not listed here and not already present in `data/` or `locales/` may not be made.

| Claim | Source |
|---|---|
| Tech Lead at MadeiraMadeira, Driver Experience team; iShip; Kafka + Avro, NestJS, PostgreSQL, Python Lambdas, React 19 MFE, New Relic | `data/experience.tsx`, `locales/*`, `PRODUCT.md` § Evidence on Hand |
| iSend TMS: legacy stabilisation, observability, CI with SonarQube, Laravel/PHP, Python lambdas | `data/experience.tsx` (Full Stack Developer, Jun 2025 – May 2026), `locales/*` |
| Progression apprentice → Full Stack → IT Coordinator → Junior → Full Stack → Tech Lead, with dates | `data/experience.tsx` |
| SENAI Dr. Celso Charuri technical degree, 2019–2020; C, C#, Python/Selenium, ASP.NET | `data/experience.tsx` § `academicData` |
| Software Engineering, Universidade Positivo, Jun 2022 – Dec 2026, **in progress** | `data/experience.tsx` § `academicData` — note `inProgress: true`; see AC3 and OQ1 |
| Adam Robo tenure 2021–2024; Laravel, React.js, TypeScript, MySQL, Docker, Python; CI/CD with GitHub Actions; led the IT team | `data/experience.tsx` § `adam-robo` |
| The Adam Robo A1 platform exists and Rafael built it: multi-mode visual screening, Snellen acuity, colour-vision testing, A4/thermal report printing, responsive web UI | `assets/screenshots/a1-*.png` (8 captures) + the Adam Robo tenure above |
| Adam 4.0 delivered to Electrolux exists and Rafael built it: dark-themed acuity and Ishihara testing, occupational-health report with worker data, anamnesis and signatures | `assets/screenshots/electrolux-*.png` (3 captures) + the Adam Robo tenure above |
| **"100,000+ visual tests performed" on A1** | ⚠️ No source in `data/` or `locales/`. Admissible only under OQ2 |

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| **OQ1** — Has Rafael concluded the Software Engineering degree? `data/experience.tsx` records `inProgress: true` through Dec 2026; the source request asks the hero to state "Bachelor in Software Engineering" | The hero names the course and institution without asserting completion, and the record stays as written | `AGENTS.md` §9 forbids any claim not traceable to the record, and a hiring manager who checks LinkedIn against an overstated degree loses trust in everything else on the page. If Rafael has in fact graduated, he updates `data/experience.tsx` first and the writer may then assert it. **This one genuinely needs the human.** |
| **OQ2** — May the "100k+ visual tests" figure be claimed? | Admitted only if Rafael attests it and it is written into `data/` during the build so it is traceable from then on; otherwise the A1 case carries no quantitative claim | The figure appears only in the request document. Qualitative claims about A1 stand on the screenshots plus the Adam Robo tenure without it; the case does not depend on the number |
| **OQ3** — Is naming Electrolux as a client permitted? | Yes — Rafael authored the request naming them and supplied the captures — but the name appears as context for the engineering problem only, never with brand assets outside the capture (AC10) | The client name is what makes "enterprise integration" concrete; the logo is what makes it look like advertising |
| **OQ4** — How are the four A1 mobile captures used? | Optional, inside the A1 detail view only, as evidence of responsive work. Never required for a case to be complete | They are extremely tall (up to 825×4569) and cannot be shown on a card without distortion or a crop that destroys the content |
| **OQ5** — The four cases are not visually symmetric (three sources of imagery: real captures, one legacy capture, one schematic) | Symmetry is required of **structure**, not of imagery: same fields, same weight, same interactions (AC8). Visual variety is acceptable; a fabricated screenshot to force symmetry is not | Inventing a fake iSend interface to match the others would be the exact failure mode this spec exists to prevent |
