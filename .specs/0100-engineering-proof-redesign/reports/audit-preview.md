# 0100 — preview audit report (G8)

> Owner: web-standards-auditor · Run: 1 · Target: `https://portfolio-29dys2nqy-devrmas-projects.vercel.app` (deployed Vercel preview, verified HTTP 200)

**Verdict:** `passed`

## Method note — the local working tree does not match the deployed code

The branch checked out in the shared repository (`chore/agents-and-specs`) carries none of spec 0100's code, including the T26–T29 tool changes (`preview.mjs`'s dialog-aware axe run, `check-reduced-motion.mjs`'s live-DOM enumeration) that the G5 audit reports describe in detail — that code exists only on `fix/accessibility-hardening` and its ancestor stack. Per lesson 006 ("never mutate a shared working-tree file, even temporarily, even restored immediately"), I did not `git checkout` the shared tree to get the correct tool version — a `tech-recruiter` run is concurrent with this one. Instead I created an isolated `git worktree` in my session scratchpad, pointed at `fix/accessibility-hardening`, symlinked `node_modules` into it, ran every tool and every ad hoc Playwright probe from there against `--base-url <the deployed URL>`, and removed the worktree at the end. Zero files in the shared repository were read as source-of-truth or written to during this audit.

Everything below is measured against the live, deployed page — not against any local build.

## Acceptance criteria

| # | Status | Evidence |
|---|---|---|
| AC5 | met | Nav order `Sobre, Experiência, Projetos, Habilidades, Contato` / `About, Experience, Projects, Skills, Contact`, identical on desktop and inside the mobile hamburger menu (opened by keyboard, `aria-label="Abrir menu"`). Active-section tracking confirmed live by scrolling to each of the 5 section ids and reading the highlighted nav item — one-to-one match, all 5. |
| AC11 | met | En-locale alt text read live in all 4 dialogs: iShip (1 alt), A1 (5 alts), Electrolux (3 alts) — each states the system's function and Rafael's authorship, never merely the company name. iSend has no `<img>` by design; its `CaseSchematic` is `role="img"` `aria-labelledby` → "iSend instrumentation schematic" (confirmed via DOM evaluate, not a screenshot). |
| AC12 | met | iSend's schematic states via its accessible name that it is a diagram, matching the visible dashed-frame signal for a non-sighted reader. |
| AC14 | met | All 4 case dialogs read fully in English (headline, badge, pillars, alt text) with zero dependency on pt-BR text baked into a screenshot; the captured product UI stays pt-BR by design and every fact it carries is restated in prose. |
| AC15 | met | Heading ladder re-read live in all 4 dialogs on the deployed build, byte-identical in shape to G5 run 3's own recorded ladder: iShip `H2→H3→H3→H4→H5×4→H3→H3`, iSend `H2→H3×4`, A1 `H2→H3×4→H3→H4`, Electrolux `H2→H3×4→H3` — no skip, no duplication. |
| AC16 | met | All 4 case dialogs, keyboard-only, against the real deployment: `Enter` on the trigger opens; a paced 15-`Tab` sweep never left `[role="dialog"]`'s subtree (focus trap holds); `Esc` closes; focus returns to the exact triggering element (`aria-label` compared before/after, byte-identical) — for all 4, individually. The mobile hamburger menu is independently keyboard-operable the same way (open on `Enter`, 5 items, close on `Esc`). See § Disclosure for a false negative in my own first pass. |
| AC18 | met | The 9 `/projects/*.webp` derivatives, measured as actual bytes transferred through `next/image`'s `/_next/image` endpoint (not source-file size): **6,310–51,904 bytes (≈6.2–50.7 KB) at rendered size, both viewports — all ≤300 KB**, comfortably inside budget. LCP on a clean, non-interacted load: the hero heading `<span>`, `renderTime` **632 ms** — a text element, never gated on an image decode. CLS over the first 2 s of the load: **0.0029** (the "good" threshold is 0.1). No layout shift from the media plates or from font loading. |
| AC21 | met | Full parity confirmed live: identical nav labels and identical dialog structure switch correctly with `html lang` (`pt-BR` ↔ `en`) on toggle; no untranslated string or raw key observed anywhere probed. |
| AC22 | met | `preview.mjs` (the T26 dialog-aware version, run from the isolated worktree) against the deployed URL: **0 axe violations at page level and inside all 4 case dialogs, across all 4 combinations (1440/390 × light/dark)** — 16 page loads + 16 dialog-opens, all clean. **0 console errors**, all 16. `contrastIncomplete` (informative-only, axe cannot resolve it through the translucent dialog surface, does not block) present at a similar order of magnitude to G5's own accepted baseline. |
| Reduced motion | met | `check-reduced-motion.mjs` (worktree version) against the **actual production build**: `136 ok, 0 FAIL, 1 skip`; `[role="dialog"] animationName=none`; `overlay animationName=none`. The dialog genuinely does not animate under `prefers-reduced-motion: reduce`, and all 24 neutralised hover sites (T29) hold — the Tailwind `!important` specificity fix survived `next build`'s real CSS output, which was the explicit risk this gate was asked to re-check. The one `skip` reproduces the same, already-justified `[class*="group"]` selector artifact recorded at G5 run 3 (`hero-section.tsx:94`) — not a new gap. |
| Metadata / sitemap / robots / OG / JSON-LD | met | `robots.txt` and `sitemap.xml` correct and reachable. Zero `certificate` substring anywhere in rendered HTML. "1.100 rotas" appears only as descriptive prose/diagram content, never as a badge or headline (AC9 holds). No fabricated "100,000+" claim rendered anywhere (OQ2 holds). JSON-LD carries `Person`, `Organization`, `CollegeOrUniversity`, `EducationalOrganization`, `PostalAddress`, `WebSite` — consistent with `PRODUCT.md`. `git diff portfolio...fix/accessibility-hardening -- app/layout.tsx app/opengraph-image.tsx app/sitemap.ts app/robots.ts app/manifest.ts` is empty: none of these files were touched by this spec, so any pre-existing quirk in them (see § Findings) is out of this gate's regression scope by definition. |

## Findings

### minor — `og:image`/`twitter:image` resolve to a Vercel branch-alias host, not `metadataBase`

- **Where:** rendered `<meta property="og:image">` / `<meta name="twitter:image">` on the deployed page.
- **What is wrong:** both resolve to `https://portfolio-git-fix-accessibility-hardening-devrmas-projects.vercel.app/opengraph-image?...` instead of the `https://devrma.com` domain `app/layout.tsx:33`'s `metadataBase` declares. The image itself is reachable (`200`, correct 1200×630 PNG) — this is a wrong-host problem, not a broken-image problem.
- **What correct looks like:** this is standard Next.js behaviour for the file-convention `opengraph-image` route on Vercel (it resolves its own absolute URL from the deployment's host, not from `metadataBase`, unless explicitly overridden) and it is pre-existing: `app/opengraph-image.tsx` has zero diff against the `portfolio` base branch. Not introduced by this spec, not a regression, and it will resolve correctly once served from the production domain. No gate action; recording it because the team-lead's brief asked for OG image correctness to be checked explicitly.

### minor — `app/manifest.ts`'s `description` still reads the pre-redesign narrative

- **Where:** `/manifest.webmanifest` → `"description":"Portfolio of Rafael Martins Alves - Full Stack Developer"`.
- **What is wrong:** says "Full Stack Developer", not "Tech Lead" — stale relative to the narrative this spec establishes everywhere else on the page.
- **What correct looks like:** `git diff portfolio...fix/accessibility-hardening -- app/manifest.ts` is empty — no task in `plan.md` touches this file, so it is out of this spec's declared scope, not a regression it introduced. Flagged for a future pass (this reviewer never edits source).

## Disclosure — a false negative in my own first keyboard-cycle probe, corrected before being trusted

My first pass at AC16 hammered `Tab` 25 times with no pacing between presses across all 4 dialogs in one script run; dialog #0 (iShip) came back `closedOnEsc=false, focusReturned=false` while dialogs #1–3 passed clean. Rather than report that as a defect, I re-ran a paced version (60 ms between tabs, one dialog cycle at a time) and dialog #0 passed identically to the other three, repeatably. The same first pass also produced two script bugs, not product defects: a `document.getElementById()` call against a React 19 `useId` value containing a `:` broke as a CSS selector, and a text-based close-button locator (looking for visible "Close"/"Fechar" text) matched nothing because the close label is `sr-only`. All three are recorded here so the pattern (aggressive, unpaced keyboard automation producing an artifact that looks like a focus-trap failure) is visible, not silently discarded — the corrected, paced re-runs are what AC16's `met` verdict above is based on.

## Checked and clean

- **Isolation discipline** — the shared repository's working tree (`git status`) is unchanged from before this run to after; all cross-branch reads and tool runs happened inside a removed `git worktree` in the session scratchpad, never in the shared tree, per lesson 006.
- **All 4 case dialogs** — open/trap/`Esc`/focus-return, live, keyboard-only, individually verified, on the real deployment.
- **All 9 project images** — confirmed rendering as actual `<img>`/`next/image` elements (not the `MediaPlate` alt-text fallback) in every dialog opened; none silently fell back.
- **Heading ladder, both locales, all 4 dialogs** — no skip, no duplication, matches G5's own recorded shape.
- **Nav parity and active-section tracking** — both viewports, both locales.
- **CLS (0.0029) and LCP (632 ms, text element)** — no regression risk from the new media plates or from font loading.
- **`preview.mjs` and `check-reduced-motion.mjs` as instruments** — read the worktree's copy of both in full; both genuinely enumerate what they claim to (4 dialog-opens per page combination; live-DOM class enumeration for reduced motion), not a pass by not looking.
- **Metadata/sitemap/robots/JSON-LD content correctness and no certificate remnants** — confirmed by direct inspection of the served HTML/text, not by trusting `STATUS.md`.

## Difference between local (G5) and deployed (G8) behaviour

None found that changes any verdict. Every number re-measured here (axe violations, console errors, reduced-motion probe result, heading ladders, image byte sizes, CLS) matches G5 run 3's local findings in shape and magnitude. The one thing this gate could only prove on the real deployment — that the reduced-motion `!important` specificity fix survives Tailwind's actual production CSS output rather than `next dev`'s — held.
