# 0100 — Implementation plan

> Owner: tech-lead · Gate: `plan`

This plan is binding on the `frontend-dev`. **No task leaves a decision open.** Every path, prop name, TypeScript type, Tailwind class, locale key, crop box and motion value is stated here. Where `design.md` and `copy.md` disagreed, the conflict is resolved in § Reconciliation below and the resolution is what you build — do not re-open it.

Anything genuinely ambiguous goes into `STATUS.md` § Blockers and back to the tech-lead. Do not improvise, and do not trim copy to fit a layout (`copy.md` § Open items 4).

---

## Architecture

### Approach

Three independent changes, sequenced so the tree compiles and the suite is green after every task:

1. **Subtract first.** The certificates feature, the two vanity hero metrics, the inline iShip/iSend case blocks and the simulated telemetry HUD come out before anything new goes in. Every deletion is enumerated file by file (AC1, AC2).
2. **Then the foundation.** Nine WebP derivatives into `public/projects/`, one new non-locale data module `data/cases.ts`, and the full locale key migration in both languages.
3. **Then the surface.** Four new molecules, one new organism, two edits to shipped primitives. `ProjectsSection`, `ExperienceSection` and `HeroSection` are rewired last, each in its own task.

### Component tree (atomic level in brackets)

```
app/page.tsx
└── MainLayout [template]
    ├── HeroSection [organism]                          — edit (T18)
    │   ├── CounterNumber [atom]                        — reuse, years cell only
    │   └── ScrollIndicator [atom]                      — reuse, targetId "experience"
    ├── ExperienceSection [organism]                    — edit (T17)
    │   ├── CareerPhaseCard [molecule]  × 3             — NEW (T16)
    │   └── Tabs / ExperiencePosition / EducationCard   — reuse, untouched
    ├── ProjectsSection [organism]                      — rewrite (T15)
    │   ├── CaseCard [molecule]  × 4                    — NEW (T14)
    │   │   ├── MediaPlate [molecule]                   — NEW (T10)
    │   │   ├── CaseSchematic [molecule]  (iSend only)  — NEW (T11)
    │   │   └── Dialog / DialogTrigger [ui]             — reuse (Radix)
    │   │       └── CaseDialog [organism]               — NEW (T13)
    │   │           ├── MediaPlate [molecule]  × 1..3
    │   │           ├── CasePillar [molecule]  × 3      — NEW (T12)
    │   │           └── ArchitectureBeam [molecule]     — reuse, relocated (T9)
    │   └── ProjectCard [molecule]  × 4                 — reuse, untouched
    ├── SkillsSection [organism]                        — untouched
    └── ContactSection [organism]                       — untouched
```

`CertificatesSection` [organism] and `CertificateCard` [molecule] are **deleted** (T3).

### Data flow

- **Non-locale case facts** (crop targets, image dimensions, `sizes`, technology sets, plate year, which case owns the architecture beam) live in `data/cases.ts`, typed and exported as `casesData`. They are product names and numerals, never translated (`copy.md` § Technology sets).
- **Every user-visible string** is read through `useLanguage().t(key)` inside the component. `data/cases.ts` holds **no strings that render** — locale keys are derived from the case `id` (`projects.cases.${id}.title`), exactly as `ProjectsSection` already derives `projects.items.${project.id}.title`.
- **Dialog state is local to each card.** Each `CaseCard` owns its own `<Dialog>` (uncontrolled). This is what buys AC16 for free: Radix traps focus, closes on `Esc`, restores focus to the trigger and sets `aria-modal` + `inert` on the rest. No hand-rolled modal, no shared `selectedCase` state, no focus bookkeeping.

### Dialog / focus-trap decision (AC16)

The repository already ships `components/ui/dialog.tsx` on `@radix-ui/react-dialog@1.1.4`. It is used verbatim. Two edits only (T8): the close control grows to `h-11 w-11 sm:h-9 sm:w-9` for the 44px touch target, and it gains an optional `closeLabel` prop so its `sr-only` text stops being the hardcoded English `"Close"` (AC21). Nothing else about the primitive changes. Its only current consumer, `certificates-section.tsx`, is deleted by T3, so `CaseDialog` is the sole consumer by the time T8 lands.

### Locale migration strategy

Keys are added in one task (T7) and retired **in the same task that deletes their last consumer** — never before, so no intermediate state renders a raw key string on the page. The retirement points are:

| Keys retired | Retired in |
|---|---|
| `nav.certificates`, `certificates.*`, `a11y.viewCertificate` | T3 |
| `a11y.scrollToSkills` | T18 |
| `hero.stats.certificates`, `hero.stats.companies` | T18 |
| `projects.cases.iship.{productionBadge,challengeTitle,architectureTitle,resultTitle}` | T15 |
| `projects.cases.isend.{telemetryUrl,activeRoutesBadge,apmCategory,apmTitle,apmDesc,qualityCategory,qualityTitle,qualityDesc,asyncCategory,asyncTitle,asyncDesc,challengeTitle,architectureTitle,resultTitle}` | T15 |

`en.ts` and `pt-BR.ts` are edited in the same commit, always, with identical key paths and identical nesting order (AC21).

### Test strategy — which file proves which AC

| AC | Proven by |
|---|---|
| AC1, AC2 | `app/__tests__/page.test.tsx` (no certificates section), `components/__tests__/navigation.test.tsx` (no `#certificates` item) + the `grep` in T3 § Done when |
| AC3, AC4 | `components/__tests__/hero-section.test.tsx` — exactly three `<dt>`/`<dd>` pairs, education caption asserts no completed degree |
| AC5 | `components/__tests__/navigation.test.tsx` — five items, exact order; `hooks/__tests__/use-active-section.test.tsx` — the new section list |
| AC6 | `app/__tests__/page.test.tsx` — DOM order assertion |
| AC7 | `components/__tests__/career-phase-card.test.tsx` + `components/__tests__/experience-section.test.tsx` — three phases rendered, tabs still present |
| AC8, AC9 | `components/__tests__/case-card.test.tsx` — every field present on all four; the `h3` is the trigger's accessible name |
| AC11, AC14 | `components/__tests__/media-plate.test.tsx` — `alt` is required and rendered; `components/__tests__/case-dialog.test.tsx` — every gallery plate has an alt |
| AC12 | `components/__tests__/case-schematic.test.tsx` — `role="img"`, `<title>` present, dashed strokes; `media-plate.test.tsx` — `variant="diagram"` renders `border-dashed` and the note |
| AC15 | `components/__tests__/case-dialog.test.tsx` — three pillars + stack list; beam present for iShip only |
| AC16 | `components/__tests__/case-card.test.tsx` — open by `Enter`, close by `Esc`, focus returns to the trigger (real Radix, **not** mocked) |
| AC19 | `pnpm build`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test` in T19 |
| AC20 | reduced-motion cases in `case-card`, `career-phase-card`, `media-plate`, `architecture-beam` tests; `pnpm test:coverage` in T19 |
| AC21 | `locales/__tests__/parity.test.ts` (new, T7) — structural key-path diff between the two locales |

Conventions match `components/__tests__/`: query by accessible role and name, assert observable behaviour, mock `@/components/language-provider` with a translation map, mock `next/image` as a plain `<img>`. **Exception:** `case-card.test.tsx` must *not* mock `@radix-ui/react-dialog` — the whole point of AC16 is that the real primitive traps and restores focus.

---

## Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Modal with focus trap, `Esc`, focus return, `aria-modal` | `@radix-ui/react-dialog` via the existing `components/ui/dialog.tsx` | Already installed and already wrapped. Gives all of AC16 with zero new code. A hand-rolled modal would re-implement four behaviours Radix has and would need its own tests for each. |
| Image optimisation / responsive sizing | `next/image` | Already the repo's image path. `sizes` values come from `design.md` § Asset spec table. |
| Reduced-motion gating | `useReducedMotion()` from `framer-motion` + the Tailwind `motion-reduce:` variant | Both already used in this repo (`scroll-indicator.tsx`, `architecture-beam.tsx`). |
| Diagram rendering (iSend) | Hand-written inline `<svg>` | No chart or diagram library. Five static nodes and four edges is less code than any dependency's setup, and AC12 needs full control of stroke style. |
| Image derivative generation | Python + Pillow (`PIL 12.2.0`, present on the machine) | Build-time tooling, not a runtime dependency. Nothing is added to `package.json`. |
| Lightbox / carousel / zoom | **None** | Out of scope per `spec.md` § Out of scope. |

**No new npm dependency is added by this spec.**

---

## Reconciliation — where `design.md` and `copy.md` disagreed

Binding. These are resolved; build what this table says.

| # | Conflict | Resolution |
|---|---|---|
| R1 | `design.md` § The iSend schematic specifies **four** nodes with ≤14-char labels. `copy.md` ships **five** node label/sublabel pairs, up to 31 chars. | **Copy wins on content, design wins on treatment.** Five nodes, in the geometry specified in T11. Line art only, dashed unfilled nodes, exactly one `primary` edge, no chrome — every AC12 signal `design.md` demanded is preserved. |
| R2 | `design.md` § The specimen plate reserves a ≤10-char "kind" slot in the caption strip. `copy.md` ships no key for it. | Two new keys, `projects.case.kindCapture` / `projects.case.kindDiagram`, with the exact strings in T7. Derived mechanically from the designer's own wording ("capture" / "diagram"). Flagged in `STATUS.md` for `content-writer` confirmation at G5. |
| R3 | `copy.md` § `projects.cases.isend.schema.caption` must be "2 lines, always visible" (AC12). `design.md`'s caption strip has no room for a sentence. | `MediaPlate` gains an optional `note` prop rendered as a second line **below** the caption strip, inside the bezel. iSend passes `schema.caption`; the other three pass nothing. No new row in the card anatomy, so AC8 symmetry holds. |
| R4 | `design.md` § ScrollIndicator needs "a new label key". `copy.md` ships none. | New key `a11y.scrollToExperience`, strings in T7, derived from the retired `a11y.scrollToSkills` pattern and `nav.experience`. Flagged for `content-writer` confirmation at G5. |
| R5 | `design.md` § Layout puts a "mono 11px uppercase caption slot" on the divider between the phase grid and the tabs. `copy.md` ships no key for it. | **The caption is dropped.** The divider renders as a bare `h-px w-full bg-border/60` rule, `aria-hidden`. Nothing is invented, the visual separation survives, and no orphan key is created. |
| R6 | `copy.md` ships `projects.cases.a1.shots.home`, `.homeMobile`, `.setupMobile`. `design.md` § Asset spec does **not** ship those three captures (`a1-home-*` is a product value proposition; only two of four mobile captures ship, per OQ4). | **The three keys are not added.** Adding a key with no consumer breaks AC21's "no orphaned keys". `design.md` measured the assets and its exclusion reasoning is explicitly AC9/OQ4-grounded. |
| R7 | `copy.md` ships `projects.case.close` ("Fechar" / "Close"). `design.md` uses the Radix icon-only close, whose accessible name is `a11y.closeCase`. | **`projects.case.close` is not added** — no consumer. `a11y.closeCase` is used as the close control's `sr-only` label (T8 `closeLabel` prop). |
| R8 | `design.md` § Accessibility says the card trigger announces as `"<engineering headline>, button"`. `copy.md` ships `a11y.openCase` = "Abrir o case de engenharia: {title}", declared as "accessible name of the trigger". | **Copy wins.** `aria-label={t("a11y.openCase", { title })}` on the trigger. The accessible name still contains the visible headline verbatim, so WCAG 2.5.3 (Label in Name) holds, and the SR user is told the control opens a case. |
| R9 | `copy.md` § Open items 1 and 2 flag `data/experience.tsx` `institution: "Faculdade Positivo"` and a `terminal.cvEducation` that asserts a completed degree. | **Both ruled in scope by the orchestrator** (see `STATUS.md` decisions log). Fixed in T2, narrowly: the institution string and one locale key per language, nothing else. |
| R10 | `design.md` § Layout gives the hero credential cell three lines (label / value / caption). `copy.md` ships only **two** strings per credential. | Two lines per cell — `dt` = label, `dd` = value. `copy.md`'s own constraint notes assign the roles unambiguously (`hero.stats.education` is "label line, same slot as `hero.stats.experience`"). No third line is invented, and the `dt` is not uppercased because a 46–50-char uppercase mono label overflows the cell. See T18. |

---

## Tasks

19 tasks. Every task must leave `pnpm build`, `pnpm lint`, `pnpm exec tsc --noEmit` and `pnpm test` green on its own.

Shared constant used throughout, matching the repo's existing idiom:

```ts
const EASE = [0.23, 1, 0.32, 1] as const;
```

---

### T1 — Clear the three pre-existing `tsc` errors

- **Files:**
  - `components/__tests__/project-card.test.tsx` (edit)
  - `hooks/__tests__/use-mobile.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** n/a
- **What to build:**
  1. `components/__tests__/project-card.test.tsx:73` — the test passes `githubUrl={null}` to a prop typed `githubUrl?: string`. The **test** is wrong, not the component: `data/projects.tsx` gives every project a `githubUrl` string, and only `liveUrl` and `image` are nullable there. Change the line to `githubUrl={undefined}`. Do **not** widen `ProjectCardProps.githubUrl` — that would make the type lie about the data.
  2. `hooks/__tests__/use-mobile.test.tsx:86` and `:96` — remove both `// @ts-expect-error` comment lines (and only those two lines). The expressions below them (`delete window.ontouchstart` and `window.ontouchstart = null`) type-check cleanly, which is what TS2578 is reporting. Keep the surrounding explanatory behaviour of the tests unchanged; do not add replacement comments.
- **Tests:** no new test. The existing `project-card.test.tsx` and `use-mobile.test.tsx` cases must still pass unchanged in behaviour.
- **Done when:** `pnpm exec tsc --noEmit` exits 0 with no output, and `pnpm test components/__tests__/project-card.test.tsx hooks/__tests__/use-mobile.test.tsx` is green — advances **AC19**.

---

### T2 — Correct two factual contradictions in the record

- **Files:**
  - `data/experience.tsx` (edit)
  - `locales/pt-BR.ts` (edit)
  - `locales/en.ts` (edit)
- **Depends on:** none
- **Reuse:** n/a
- **What to build:**
  1. `data/experience.tsx:126` — `institution: "Faculdade Positivo"` → `institution: "Universidade Positivo"`. The same record's `description` (line 130), `copy.md`, and the spec's Evidence table all say *Universidade* Positivo; the record contradicts itself. **Change nothing else in that record** — not `inProgress`, not `period`, not `startDate`, not `degree`, not `achievements`.
  2. `locales/pt-BR.ts:375` — `terminal.cvEducation` currently asserts a completed degree. Replace the value with:
     `"Formação: Engenharia de Software (Universidade Positivo) · conclusão em dez. 2026"`
  3. `locales/en.ts:375` — same key. Replace the value with:
     `"Education: Software Engineering (Universidade Positivo) · in progress, ends Dec 2026"`

     Both strings mirror the framing the hero ships in `copy.md` § `hero.stats.education`. The interactive terminal is otherwise out of scope: **change only this one key per locale.**
- **Tests:** `data/__tests__/data.test.ts` (edit) — add to the existing `"validates experience and academic datasets"` case:
  ```ts
  const softwareEngineering = academicData.find((edu) => edu.id === "software-engineering");
  expect(softwareEngineering?.institution).toBe("Universidade Positivo");
  expect(softwareEngineering?.inProgress).toBe(true);
  ```
  `components/__tests__/interactive-terminal.test.tsx` — run it; if it asserts the old `cvEducation` text, update the expectation to the new string. Do not change anything else in that file.
- **Done when:** `pnpm test data/__tests__/data.test.ts components/__tests__/interactive-terminal.test.tsx` green, and `grep -rn "Faculdade Positivo" data locales` returns nothing — advances **AC3**, **AC23**.

---

### T3 — Remove the certificates feature, end to end

- **Files:**
  - `components/organisms/certificates-section.tsx` (delete)
  - `components/molecules/certificate-card.tsx` (delete)
  - `data/certificates.tsx` (delete)
  - `components/__tests__/certificates-section.test.tsx` (delete)
  - `components/__tests__/certificate-card.test.tsx` (delete)
  - `app/page.tsx` (edit)
  - `app/__tests__/page.test.tsx` (edit)
  - `components/organisms/navigation.tsx` (edit)
  - `components/__tests__/navigation.test.tsx` (edit)
  - `data/__tests__/data.test.ts` (edit)
  - `app/globals.css` (edit)
  - `next.config.mjs` (edit)
  - `locales/en.ts` (edit)
  - `locales/pt-BR.ts` (edit)
- **Depends on:** T2
- **Reuse:** `components/molecules/marquee.tsx` **stays** — `skills-section.tsx` still uses it. Do not delete it.
- **What to build:**
  1. Delete the five files listed above.
  2. `app/page.tsx` — remove the `CertificatesSection` import and its JSX element. Leave the remaining section order alone for now (T4 reorders it).
  3. `app/__tests__/page.test.tsx` — remove the `certificates-section` `vi.mock` block and the `"certificates-section"` entry from the `sections` array.
  4. `components/organisms/navigation.tsx` — remove `"certificates"` from `NAV_SECTIONS`. Leave the remaining order alone for now (T4 reorders it).
  5. `components/__tests__/navigation.test.tsx` — remove `"nav.certificates"` from the `translations` map and change `expect(NavItemMock).toHaveBeenCalledTimes(6)` to `5`.
  6. `data/__tests__/data.test.ts` — remove the `certificatesData` import and the entire `"validates certificates dataset"` case.
  7. `app/globals.css` — delete the `.certificate-item { … }` rule (line ~201) and the blank line after it. Nothing else in that file changes.
  8. `next.config.mjs` — delete the `img-c.udemycdn.com` and `i.vimeocdn.com` entries from `images.remotePatterns`. They were only ever used by `data/certificates.tsx`. Keep `stopwatch.devrma.com` (used by `data/projects.tsx`).
  9. Both locale files — delete `nav.certificates`, the entire `certificates: { … }` object (lines ~255–256 through its closing brace, 36 string values each), and `a11y.viewCertificate`. Delete the identical key paths from both files in the same edit.
- **Tests:** the two deleted test files are gone; the three edited ones must pass.
- **Done when:**
  - `pnpm test app components data` green;
  - `grep -rniE "certificate" app components data hooks lib locales` returns **nothing** (the only permitted survivor list is empty — there are none);
  - `pnpm build` green
  — advances **AC1**, **AC2**, **AC21**.

---

### T4 — Five navigation items and the new page order

- **Files:**
  - `components/organisms/navigation.tsx` (edit)
  - `app/page.tsx` (edit)
  - `components/__tests__/navigation.test.tsx` (edit)
  - `app/__tests__/page.test.tsx` (edit)
  - `hooks/__tests__/use-active-section.test.tsx` (edit)
- **Depends on:** T3
- **Reuse:** `hooks/use-active-section.tsx` — **no change to the hook**. It already sorts by `boundingClientRect.top`, so it tracks whatever order the page renders. Only the section list it is given changes.
- **What to build:**
  1. `components/organisms/navigation.tsx` —
     ```ts
     const NAV_SECTIONS = ["about", "experience", "projects", "skills", "contact"];
     ```
     Nothing else in the file changes; `navItems`, `handleNavClick` and the `MobileMenu` hand-off already derive from this array, so the mobile menu inherits the order for free.
  2. `app/page.tsx` — section order becomes exactly:
     ```tsx
     <HeroSection />
     <ExperienceSection />
     <ProjectsSection />
     <SkillsSection />
     <ContactSection />
     ```
- **Tests:**
  - `components/__tests__/navigation.test.tsx` — add a case `"renders five items in page order"` asserting `NavItemMock.mock.calls.map(([p]) => p.href)` equals `["#about", "#experience", "#projects", "#skills", "#contact"]`, and that the same array reaches `MobileMenuMock` via its `navItems` prop (assert on `MobileMenuMock.mock.calls[0][0].navItems.map((i) => i.href)`).
  - `app/__tests__/page.test.tsx` — the `sections` array becomes `["hero-section", "experience-section", "projects-section", "skills-section", "contact-section"]`; the existing `compareDocumentPosition` loop then proves DOM order.
  - `hooks/__tests__/use-active-section.test.tsx` — change the `sections` fixture from `["about", "skills", "projects"]` to `["about", "experience", "projects"]` and update the ids created in `beforeEach` and the `entryFor(...)` calls accordingly (`"skills"` → `"experience"` throughout). The assertions and the topmost-wins logic are unchanged.
- **Done when:** `pnpm test app/__tests__/page.test.tsx components/__tests__/navigation.test.tsx hooks/__tests__/use-active-section.test.tsx` green — advances **AC5**, **AC6**.

---

### T5 — Generate the nine WebP derivatives into `public/projects/`

- **Files:**
  - `.specs/0100-engineering-proof-redesign/assets/build-webp.py` (create)
  - `public/projects/iship-card.webp` (create)
  - `public/projects/a1-card.webp` (create)
  - `public/projects/electrolux-card.webp` (create)
  - `public/projects/a1-setup.webp` (create)
  - `public/projects/a1-completed.webp` (create)
  - `public/projects/a1-mobile-acuity.webp` (create)
  - `public/projects/a1-mobile-completed.webp` (create)
  - `public/projects/electrolux-ishihara.webp` (create)
  - `public/projects/electrolux-report.webp` (create)
- **Depends on:** none
- **Reuse:** Pillow (`PIL 12.2.0`) is installed. `cwebp` and ImageMagick are also present but are not used — Pillow's WebP encoder is what produced `design.md`'s measured sizes.
- **What to build:**
  1. `public/projects/` does not exist. Create it.
  2. Write `.specs/0100-engineering-proof-redesign/assets/build-webp.py` — a standalone, re-runnable script (the crop boxes are the executable record of the rebuild contract). It resolves paths relative to the repository root, iterates the table below and writes each output:
     ```python
     from PIL import Image
     img = Image.open(SRC).convert("RGB")
     if BOX is not None:
         img = img.crop(BOX)
     img.resize(OUT, Image.LANCZOS).save(DST, "WEBP", quality=82, method=6)
     ```
  3. Sources are `.specs/0100-engineering-proof-redesign/assets/screenshots/<name>.png` except row 1, whose source is `public/app-iship.png`. Crop boxes are `(left, top, right, bottom)` in source pixels. **Use these numbers verbatim** — they were measured, and re-deriving them is how the app header or the Snellen rows get cut:

     | Source | Crop box | Output px | Target file |
     |---|---|---|---|
     | `public/app-iship.png` | `None` (full 2560×1440) | `(1280, 720)` | `public/projects/iship-card.webp` |
     | `a1-test-acuity-desktop.png` | `(760, 0, 3080, 1450)` | `(1200, 750)` | `public/projects/a1-card.webp` |
     | `electrolux-acuity-desktop.png` | `(850, 230, 2990, 1567)` | `(1200, 750)` | `public/projects/electrolux-card.webp` |
     | `a1-test-setup-desktop.png` | `(1180, 700, 2740, 1320)` | `(1248, 496)` | `public/projects/a1-setup.webp` |
     | `a1-test-completed-desktop.png` | `(1180, 640, 2660, 1380)` | `(1200, 600)` | `public/projects/a1-completed.webp` |
     | `a1-test-acuity-mobile.png` | `(0, 0, 825, 1466)` | `(619, 1100)` | `public/projects/a1-mobile-acuity.webp` |
     | `a1-test-completed-mobile.png` | `(0, 0, 825, 1466)` | `(619, 1100)` | `public/projects/a1-mobile-completed.webp` |
     | `electrolux-color-desktop.png` | `(870, 560, 2970, 1870)` | `(1280, 798)` | `public/projects/electrolux-ishihara.webp` |
     | `electrolux-report-desktop.png` | `(1380, 140, 2470, 1730)` | `(880, 1283)` | `public/projects/electrolux-report.webp` |

  4. The nine `.webp` files **are committed**. The PNG sources **stay** in `.specs/0100-engineering-proof-redesign/assets/screenshots/` and are not moved, not copied into `public/`, and not deleted.
  5. `public/app-iship.png` **stays exactly where it is.** It becomes unreferenced after T15; deleting or moving it is a human approval point and is not in this plan (`AGENTS.md` §4).
- **Tests:** no unit test — these are binary artifacts. The check is the assertion in § Done when.
- **Done when:** `ls -la public/projects/` shows all nine files, every one is **≤ 300 KB** (the largest, `electrolux-ishihara.webp`, is expected around 149 KB), and `python3 -c "from PIL import Image; print(Image.open('public/projects/a1-card.webp').size)"` prints `(1200, 750)` — advances **AC18**.

---

### T6 — `data/cases.ts` — the non-locale case record

- **Files:**
  - `data/cases.ts` (create)
  - `data/__tests__/data.test.ts` (edit)
- **Depends on:** T5
- **Reuse:** follows the shape idiom of `data/projects.tsx` — a plain exported const array, no JSX, no strings that render to the user.
- **What to build:** create `data/cases.ts` exactly as follows. Technology sets are copied verbatim from `copy.md` § Technology sets — **do not add, reorder or invent a technology**. `year` values are derived from the role period in `data/experience.tsx` and use an en dash (`–`, U+2013).

  ```ts
  export type CaseId = "iship" | "isend" | "a1" | "electrolux";

  export type CasePlate = {
    src: string;
    width: number;
    height: number;
    sizes: string;
    /** suffix under `projects.cases.<id>.shots.` */
    altKey: string;
    aspect: "16/10" | "9/16";
  };

  export type EngineeringCase = {
    id: CaseId;
    year: string;
    variant: "capture" | "diagram";
    /** absent when variant === "diagram" */
    cover?: Omit<CasePlate, "altKey" | "aspect">;
    technologies: string[];
    /** rendered in the dialog's evidence gallery, 2-up */
    evidence: CasePlate[];
    /** rendered in the dialog as a 2-col row of portrait plates */
    mobileEvidence: CasePlate[];
    hasArchitectureBeam: boolean;
  };

  export const casesData: EngineeringCase[] = [
    {
      id: "iship",
      year: "2026",
      variant: "capture",
      cover: {
        src: "/projects/iship-card.webp",
        width: 1280,
        height: 720,
        sizes: "(max-width: 1024px) 100vw, 600px",
      },
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "Apache Kafka",
        "Apache Avro",
        "Python (AWS Lambda)",
        "React 19",
        "Vite",
        "New Relic",
        "Docker",
      ],
      evidence: [],
      mobileEvidence: [],
      hasArchitectureBeam: true,
    },
    {
      id: "isend",
      year: "2025–2026",
      variant: "diagram",
      technologies: [
        "Laravel",
        "PHP",
        "MySQL",
        "Python (AWS Lambda)",
        "GitHub Actions",
        "SonarQube",
        "New Relic",
        "Docker",
      ],
      evidence: [],
      mobileEvidence: [],
      hasArchitectureBeam: false,
    },
    {
      id: "a1",
      year: "2022–2024",
      variant: "capture",
      cover: {
        src: "/projects/a1-card.webp",
        width: 1200,
        height: 750,
        sizes: "(max-width: 1024px) 100vw, 600px",
      },
      technologies: [
        "Laravel",
        "PHP",
        "MySQL",
        "React.js",
        "TypeScript",
        "Docker",
        "Python",
        "GitHub Actions",
      ],
      evidence: [
        {
          src: "/projects/a1-setup.webp",
          width: 1248,
          height: 496,
          sizes: "(max-width: 640px) 100vw, 340px",
          altKey: "setup",
          aspect: "16/10",
        },
        {
          src: "/projects/a1-completed.webp",
          width: 1200,
          height: 600,
          sizes: "(max-width: 640px) 100vw, 340px",
          altKey: "completed",
          aspect: "16/10",
        },
      ],
      mobileEvidence: [
        {
          src: "/projects/a1-mobile-acuity.webp",
          width: 619,
          height: 1100,
          sizes: "(max-width: 640px) 50vw, 170px",
          altKey: "acuityMobile",
          aspect: "9/16",
        },
        {
          src: "/projects/a1-mobile-completed.webp",
          width: 619,
          height: 1100,
          sizes: "(max-width: 640px) 50vw, 170px",
          altKey: "completedMobile",
          aspect: "9/16",
        },
      ],
      hasArchitectureBeam: false,
    },
    {
      id: "electrolux",
      year: "2022–2024",
      variant: "capture",
      cover: {
        src: "/projects/electrolux-card.webp",
        width: 1200,
        height: 750,
        sizes: "(max-width: 1024px) 100vw, 600px",
      },
      technologies: ["Laravel", "PHP", "MySQL", "React.js", "TypeScript", "Docker"],
      evidence: [
        {
          src: "/projects/electrolux-ishihara.webp",
          width: 1280,
          height: 798,
          sizes: "(max-width: 640px) 100vw, 340px",
          altKey: "color",
          aspect: "16/10",
        },
        {
          src: "/projects/electrolux-report.webp",
          width: 880,
          height: 1283,
          sizes: "(max-width: 640px) 100vw, 340px",
          altKey: "report",
          aspect: "16/10",
        },
      ],
      mobileEvidence: [],
      hasArchitectureBeam: false,
    },
  ];
  ```

  Note the card cover for `a1` is the acuity capture, so its alt is `projects.cases.a1.shots.acuity`; for `electrolux` it is the acuity capture, alt `projects.cases.electrolux.shots.acuity`; for `iship` the alt key is `projects.cases.iship.alt` and for `isend` it is `projects.cases.isend.alt`. The cover alt key is resolved in `CaseCard` (T14), not stored here.
- **Tests:** `data/__tests__/data.test.ts` (edit) — add a `"validates engineering cases dataset"` case asserting: exactly four entries, ids in the order `["iship", "isend", "a1", "electrolux"]`, every entry has a non-empty `technologies` array, exactly one entry has `hasArchitectureBeam: true`, exactly one entry has `variant: "diagram"` and that entry has no `cover`, and every `capture` entry has a `cover` whose `src` starts with `/projects/`.
- **Done when:** `pnpm test data/__tests__/data.test.ts` green, `pnpm exec tsc --noEmit` clean — advances **AC8**, **AC23**.

---

### T7 — Locale migration: add every new key to both languages

- **Files:**
  - `locales/pt-BR.ts` (edit)
  - `locales/en.ts` (edit)
  - `locales/__tests__/parity.test.ts` (create)
- **Depends on:** T3
- **Reuse:** the `{title}` interpolation pattern already used by `a11y.expandPositions`.
- **What to build:** add the keys below. **Strings are transcribed verbatim from `copy.md`** — every value, both languages. Do not paraphrase, do not shorten, do not fix punctuation. Keep the two files in identical key order.

  **`hero`** — replace `headline`; inside `hero.stats` keep `experience`, add four keys (the two retired keys are removed in T18):
  - `hero.headline`, `hero.stats.educationValue`, `hero.stats.education`, `hero.stats.leadershipValue`, `hero.stats.leadership`

  **`projects`** — replace `title`, `description`, `openSourceTitle`; add `openSourceDescription`.

  **`projects.case`** (new object, shared pillar headings):
  - `challengeTitle`, `architectureTitle`, `resultTitle`, `stackTitle`, `evidenceTitle`, `responsiveTitle`, `open`
  - plus the two R2 keys, which are **not** in `copy.md`:

    | Key | pt-BR | en |
    |---|---|---|
    | `projects.case.kindCapture` | `Captura` | `Capture` |
    | `projects.case.kindDiagram` | `Diagrama` | `Diagram` |

  **`projects.cases.iship`** — replace `badge`, `team`, `title`, `subtitle`, `challenge`, `architecture`, `result`, `tagline`; add `systemName`, `status`, `diagramTitle`, `alt`.

  **`projects.cases.isend`** — replace `badge`, `team`, `title`, `subtitle`, `challenge`, `architecture`, `result`, `tagline`; add `systemName`, `status`, `alt`, and the nested `schema` object: `title`, `caption`, `core`, `coreSub`, `db`, `dbSub`, `async`, `asyncSub`, `apm`, `apmSub`, `ci`, `ciSub`.

  **`projects.cases.a1`** (new) — `badge`, `team`, `title`, `systemName`, `status`, `subtitle`, `challenge`, `architecture`, `result`, `tagline`, and `shots`: `setup`, `acuity`, `completed`, `acuityMobile`, `completedMobile`.
  **Do not add** `shots.home`, `shots.homeMobile`, `shots.setupMobile` — see R6.

  **`projects.cases.electrolux`** (new) — `badge`, `team`, `title`, `systemName`, `status`, `subtitle`, `challenge`, `architecture`, `result`, `tagline`, and `shots`: `acuity`, `color`, `report`.

  **`experience.phases`** (new object, sits inside the existing `experience` object, after `description`) — `title`, `description`, and three phase objects `foundation`, `leadership`, `scale`, each with `number`, `badge`, `period`, `title`, `context`, `description`.
  `experience.progression.*` is **kept** (`copy.md` § Not deleted, deliberately).

  **`a11y`** — add `closeCase`, `caseDialog`, `openCase`, `profilePhoto`, and the R4 key:

  | Key | pt-BR | en |
  |---|---|---|
  | `a11y.scrollToExperience` | `Ir para a seção Experiência` | `Go to Experience section` |

  **Do not add** `projects.case.close` — see R7.

- **Tests:** `locales/__tests__/parity.test.ts` (create). No mocks. It imports both locale modules and:
  1. flattens each into a sorted array of dot-joined key paths;
  2. `expect(ptPaths).toEqual(enPaths)` — full structural parity, so a key added to one file and forgotten in the other fails the suite;
  3. asserts every leaf is a non-empty `string` in both files;
  4. asserts a handful of spot keys exist: `projects.case.kindDiagram`, `projects.cases.a1.shots.acuity`, `projects.cases.electrolux.shots.report`, `experience.phases.scale.title`, `a11y.scrollToExperience`;
  5. asserts the retired paths are absent: `certificates`, `nav.certificates`, `a11y.viewCertificate`.
- **Done when:** `pnpm test locales` green and `pnpm exec tsc --noEmit` clean — advances **AC21**.

---

### T8 — `DialogContent`: 44px close target and a localisable close label

- **Files:**
  - `components/ui/dialog.tsx` (edit)
  - `components/__tests__/ui-dialog.test.tsx` (edit)
- **Depends on:** T3
- **Reuse:** `@radix-ui/react-dialog` — everything else about the primitive is untouched.
- **What to build:**
  1. Widen the `DialogContent` props to accept one extra prop:
     ```tsx
     type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
       closeLabel?: string;
     };
     ```
     Destructure `{ className, children, closeLabel = "Close", ...props }`. Pass `closeLabel` into the existing `<span className="sr-only">` in place of the hardcoded `"Close"`. Do not forward `closeLabel` to the Radix element.
  2. Change the `DialogPrimitive.Close` classes from `h-8 w-8` to `h-11 w-11 sm:h-9 sm:w-9`, and move it from `right-3 top-3` to `right-3 top-3` (unchanged). Add `motion-reduce:transition-none` to its existing transition class list. Everything else on that element stays.
  3. Add `motion-reduce:animate-none` to the `cn(...)` base class string of **both** `DialogOverlay` and `DialogContent`, so the open/close animation is suppressed under `prefers-reduced-motion` while the focus trap, `Esc` and focus restoration are untouched (`design.md` § Motion).
- **Tests:** `components/__tests__/ui-dialog.test.tsx` (edit) — keep the existing Radix mock and the existing case, and add:
  - `"renders the default close label"` — the `sr-only` span contains `"Close"` when no prop is passed;
  - `"uses the provided close label"` — passing `closeLabel="Fechar o case"` renders that string in the `sr-only` span;
  - `"sizes the close control for touch"` — the close element has classes `h-11`, `w-11`, `sm:h-9`, `sm:w-9`;
  - `"suppresses the entrance animation under reduced motion"` — overlay and content both carry `motion-reduce:animate-none`.
- **Done when:** `pnpm test components/__tests__/ui-dialog.test.tsx` green, `pnpm lint` clean — advances **AC16**, **AC21**, **AC22**.

---

### T9 — `ArchitectureBeam`: reduced-motion on the dashed beam

- **Files:**
  - `components/molecules/architecture-beam.tsx` (edit)
  - `components/__tests__/architecture-beam.test.tsx` (create)
- **Depends on:** none
- **Reuse:** the component is otherwise untouched — it is relocated by T13, not rewritten.
- **What to build:** on the `<line>` element carrying `animate-[dash_20s_linear_infinite]`, add `motion-reduce:animate-none`. The existing `motion-reduce:stroke-dashoffset-0 [stroke-dashoffset:0]` classes stay. Under reduced motion the beam degrades to a static dashed line; the two packet `<circle>`s already carry `motion-reduce:hidden` and are unchanged. **No other edit to this file in this task.**
- **Tests:** `components/__tests__/architecture-beam.test.tsx` (create). Mock `@/components/language-provider` with a `t: (key) => key` identity and mock `framer-motion`'s `motion.div` to a plain `div` (same shape as `projects-section.test.tsx`). Cases:
  - `"renders the four architecture nodes"` — four node titles present;
  - `"suppresses the beam animation under reduced motion"` — `container.querySelector("line")` has class `motion-reduce:animate-none`;
  - `"hides the packet dots under reduced motion"` — every `circle` has class `motion-reduce:hidden`.
- **Done when:** `pnpm test components/__tests__/architecture-beam.test.tsx` green — advances **AC20**, **AC22**.

---

### T10 — `MediaPlate` molecule — the specimen plate

- **Files:**
  - `components/molecules/media-plate.tsx` (create)
  - `components/__tests__/media-plate.test.tsx` (create)
- **Depends on:** T5, T7
- **Reuse:** `cn()` from `lib/utils`, `next/image`.
- **What to build:** `"use client"`. There is exactly **one** media frame in this feature and this is it — used by all four case cards and by every image in every detail view.

  ```tsx
  interface MediaPlateProps {
    variant: "capture" | "diagram";
    kindLabel: string;
    year: string;
    alt: string;
    aspect: "16/10" | "9/16";
    src?: string;
    width?: number;
    height?: number;
    sizes?: string;
    note?: string;
    priority?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
  ```

  Behaviour:
  - `variant="capture"` requires `src`, `width`, `height`, `sizes` and renders `<Image>`. `variant="diagram"` ignores them and renders `children`.
  - `priority` defaults to `false` and **is never set to `true` by any consumer in this spec** — the hero portrait is the LCP element and keeps `priority` alone (`design.md` § Notes for the tech-lead).
  - One piece of local state only: `const [hasFailed, setHasFailed] = useState(false)`, set by the `<Image onError>` handler. When `hasFailed` is true the inner well renders `<span className="px-4 text-center text-xs text-muted-foreground">{alt}</span>` instead of the image; the plate stays fully functional.

  Markup and classes, exactly:

  ```tsx
  const ASPECT_CLASS = { "16/10": "aspect-[16/10]", "9/16": "aspect-[9/16]" } as const;

  <figure
    className={cn(
      "group/plate rounded-xl border border-border/70 bg-muted p-2",
      variant === "diagram" && "border-dashed",
      className,
    )}
  >
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-lg bg-muted/60 ring-1 ring-border/60 transition-opacity duration-200 ease-out-expo dark:opacity-90 dark:group-hover/plate:opacity-100 dark:group-focus-within/plate:opacity-100 dark:group-hover:opacity-100 dark:group-focus-within:opacity-100",
        ASPECT_CLASS[aspect],
      )}
    >
      {/* image | children | alt fallback */}
    </div>
    <figcaption className="mt-2 flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[11px] font-medium text-muted-foreground">
      <span>{kindLabel}</span>
      <span>{year}</span>
    </figcaption>
    {note ? (
      <p className="mt-1.5 font-mono text-[11px] font-medium leading-snug text-muted-foreground">{note}</p>
    ) : null}
  </figure>
  ```

  The `<Image>` gets `className="h-full w-full object-cover object-top"`, plus `alt`, `src`, `width`, `height`, `sizes`, `onError`.

  Binding constraints from `design.md` § Accessibility intent, which the reviewer will check: the caption strip stays at `text-muted-foreground` with **no opacity modifier** and no smaller than `text-[11px] font-medium` (it is the tightest contrast pair in the system at 4.6:1 in light theme). The opacity attenuation is deliberately **kept** under `prefers-reduced-motion` — opacity is not a vestibular trigger, and suppressing it would strand reduced-motion users on the dimmed capture. Do not add `motion-reduce:` to it.
- **Tests:** `components/__tests__/media-plate.test.tsx` (create). Mock `next/image` as a plain `<img>` forwarding `alt`, `src` and `onError`. Cases:
  - `"renders a capture with its alt text and caption"` — `getByRole("img", { name: … })`, kind label and year both visible;
  - `"renders diagram children instead of an image"` — `variant="diagram"` with a child `<svg data-testid="schematic" />`: the child is present and `queryByRole("img")` for the `<img>` element is absent;
  - `"marks a diagram plate with a dashed frame"` — the `<figure>` has class `border-dashed`; a capture plate does not;
  - `"renders the note when provided"` and `"omits the note when not provided"`;
  - `"falls back to the alt text when the image fails"` — `fireEvent.error(img)`, then the alt string is present as text;
  - `"keeps the glare attenuation under reduced motion"` — the inner well carries `dark:opacity-90` and does **not** carry any `motion-reduce:` class;
  - `"applies the requested aspect ratio"` — `aspect="9/16"` yields `aspect-[9/16]`.
- **Done when:** `pnpm test components/__tests__/media-plate.test.tsx` green, `pnpm lint` clean — advances **AC11**, **AC12**, **AC18**.

---

### T11 — `CaseSchematic` molecule — the iSend diagram

- **Files:**
  - `components/molecules/case-schematic.tsx` (create)
  - `components/__tests__/case-schematic.test.tsx` (create)
- **Depends on:** T7
- **Reuse:** `useLanguage()` from `components/language-provider`, `useId()` from React.
- **What to build:** `"use client"`. No props. Static inline SVG, **line art only**: no fills, no gradients, no window chrome, no traffic-light dots, no address bar, no status pill, no fake telemetry numbers.

  Root element:
  ```tsx
  <svg
    viewBox="0 0 800 500"
    preserveAspectRatio="xMidYMid meet"
    role="img"
    aria-labelledby={`${id}-title`}
    aria-describedby={`${id}-desc`}
    className="h-full w-full"
  >
    <title id={`${id}-title`}>{t("projects.cases.isend.schema.title")}</title>
    <desc id={`${id}-desc`}>{t("projects.cases.isend.alt")}</desc>
    …
  </svg>
  ```
  `id` comes from `useId()`, so the schematic can render twice on the page (card + dialog) without duplicate ids.

  **Node rendering** (one local sub-component or a `.map`, your choice — but identical output):
  ```
  <rect x y width height rx="10" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 3" />
  <text x={x + 24} y={y + 34} fontFamily="var(--font-mono, monospace)" fontSize="15" fill="hsl(var(--muted-foreground))">{label}</text>
  <text x={x + 24} y={y + 58} fontFamily="var(--font-mono, monospace)" fontSize="13" fill="hsl(var(--muted-foreground))">{sublabel}</text>
  ```
  Five nodes, labels/sublabels from these keys in this order:

  | Node | label key | sublabel key |
  |---|---|---|
  | `db` | `projects.cases.isend.schema.db` | `…schema.dbSub` |
  | `async` | `…schema.async` | `…schema.asyncSub` |
  | `core` | `…schema.core` | `…schema.coreSub` |
  | `apm` | `…schema.apm` | `…schema.apmSub` |
  | `ci` | `…schema.ci` | `…schema.ciSub` |

  **Two layouts, one viewBox**, toggled purely by CSS — no JS, no measurement:

  `<g className="hidden sm:block">` — centre-spine layout:
  | Node | x | y | w | h |
  |---|---|---|---|---|
  | `db` | 40 | 40 | 300 | 80 |
  | `async` | 460 | 40 | 300 | 80 |
  | `core` | 250 | 200 | 300 | 100 |
  | `apm` | 40 | 380 | 300 | 80 |
  | `ci` | 460 | 380 | 300 | 80 |

  Edges (`<line>`, `strokeWidth="1"`, `markerEnd`):
  | From → To | x1,y1 → x2,y2 | stroke |
  |---|---|---|
  | db → core | `190,120 → 310,200` | `hsl(var(--border))` |
  | async → core | `610,120 → 490,200` | `hsl(var(--border))` |
  | **core → apm** | `310,300 → 190,380` | **`hsl(var(--primary))`** |
  | core → ci | `490,300 → 610,380` | `hsl(var(--border))` |

  `<g className="sm:hidden">` — stacked layout. Five full-width nodes at `x=40, width=720, height=80`, `y` = `10, 110, 210, 310, 410`, in the order `db, async, core, apm, ci`. A left rail at `x=20` drawn as four `<line>` segments joining consecutive node mid-points (`y` = 50, 150, 250, 350, 450) plus a 20-unit horizontal stub from `x=20` to `x=40` at each mid-point. The rail segment from `250` to `350` (core → apm) is `hsl(var(--primary))`; the other three are `hsl(var(--border))`.

  **Exactly one `primary` edge in each layout** — the core → apm link, because the case headline is about making the monolith observable. Everything else is `border`. This is the Signal Rarity Rule; do not colour a second edge.

  **Arrowheads:** two `<marker>`s in `<defs>`, ids `${id}-arrow` and `${id}-arrow-primary`, `markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"`, each containing `<path d="M0,0 L6,3 L0,6 Z" />` filled with `hsl(var(--border))` and `hsl(var(--primary))` respectively.

  The `<defs>`, both `<g>` wrappers' decorative rails and the edges need no individual `aria-hidden` — the `role="img"` on the root already collapses the subtree to a single image node for assistive technology.
- **Tests:** `components/__tests__/case-schematic.test.tsx` (create). Mock `@/components/language-provider` with a map returning distinct strings for the twelve `schema.*` keys plus `projects.cases.isend.alt`. Cases:
  - `"exposes itself as a single image with a diagram title"` — `getByRole("img")` and its accessible name is the `schema.title` string;
  - `"describes the diagram for screen readers"` — the `<desc>` content is the `isend.alt` string;
  - `"renders all five node labels and sublabels"` — all ten strings present;
  - `"draws nodes as dashed, unfilled strokes"` — every `rect` has `fill="none"` and `stroke-dasharray="4 3"`;
  - `"accents exactly one edge per layout"` — count of elements with `stroke="hsl(var(--primary))"` is exactly `2` (one per layout `<g>`);
  - `"renders no window chrome"` — `container.querySelectorAll("circle")` is empty and no element has a `fill` other than `none` or the two marker fills.
- **Done when:** `pnpm test components/__tests__/case-schematic.test.tsx` green — advances **AC12**, **AC13**.

---

### T12 — `CasePillar` molecule

- **Files:**
  - `components/molecules/case-pillar.tsx` (create)
  - `components/__tests__/case-pillar.test.tsx` (create)
- **Depends on:** none
- **Reuse:** this is an **extraction** of markup that already exists inline three times in `projects-section.tsx` (the `rounded-xl border … p-5` block with an icon + mono uppercase `h4` + prose). Nothing is designed here.
- **What to build:** server-safe (no `"use client"`, no hooks, no state).

  ```tsx
  import type { LucideIcon } from "lucide-react";

  interface CasePillarProps {
    icon: LucideIcon;
    iconClassName: string;
    title: string;
    body: string;
    children?: React.ReactNode;
  }
  ```

  ```tsx
  <div className="rounded-lg border border-border/60 bg-card/50 p-4">
    <div className="mb-3 flex items-center gap-2">
      <Icon className={cn("h-4 w-4", iconClassName)} aria-hidden="true" />
      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">{title}</h4>
    </div>
    <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">{body}</p>
    {children}
  </div>
  ```

  `children` exists solely so the iShip dialog can drop `ArchitectureBeam` inside pillar 2. The pillar **title is `text-foreground`, never the accent colour** — the accent lives on the icon only, because `text-amber-600` on white is 3.6:1, which passes the non-text threshold but not AA for text (`design.md` § Accessibility intent).
- **Tests:** `components/__tests__/case-pillar.test.tsx` (create). Cases:
  - `"renders the title as a level-4 heading and the body"` — `getByRole("heading", { level: 4 })`;
  - `"hides the icon from assistive technology"` — the rendered `svg` has `aria-hidden="true"`;
  - `"keeps the accent on the icon and not on the title"` — the `h4` has class `text-foreground` and does not contain `text-amber`/`text-cyan`/`text-emerald`;
  - `"renders children below the body"` — a child test node is present.
- **Done when:** `pnpm test components/__tests__/case-pillar.test.tsx` green — advances **AC15**, **AC22**.

---

### T13 — `CaseDialog` organism — the detail view

- **Files:**
  - `components/organisms/case-dialog.tsx` (create)
  - `components/__tests__/case-dialog.test.tsx` (create)
- **Depends on:** T6, T7, T8, T9, T10, T11, T12
- **Reuse:** `components/ui/dialog.tsx`, `components/molecules/media-plate.tsx`, `components/molecules/case-pillar.tsx`, `components/molecules/case-schematic.tsx`, `components/molecules/architecture-beam.tsx`, `components/ui/badge.tsx`.
- **What to build:** `"use client"`. This component renders **only** the `DialogContent` subtree — the `<Dialog>` and `<DialogTrigger>` live in `CaseCard` (T14), which is what gives Radix the trigger to return focus to.

  ```tsx
  interface CaseDialogProps {
    engineeringCase: EngineeringCase;
  }
  ```

  Root:
  ```tsx
  <DialogContent
    className="grid max-h-[90dvh] max-w-3xl grid-rows-[auto_1fr] gap-0 overflow-hidden p-0"
    closeLabel={t("a11y.closeCase")}
  >
  ```

  **Row 1 — header, does not scroll.** `<div className="border-b border-border/60 bg-background/95 px-5 py-4 pr-16 backdrop-blur-xl">` containing, in order:
  1. the neutral role badge — `<span className="inline-flex items-center rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">{t(\`projects.cases.${id}.badge\`)}</span>`;
  2. `<DialogTitle className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{t(\`projects.cases.${id}.title\`)}</DialogTitle>`;
  3. `<DialogDescription className="font-mono text-xs text-muted-foreground">{t(\`projects.cases.${id}.systemName\`)} · {t(\`projects.cases.${id}.team\`)}</DialogDescription>`.

  `DialogTitle` is required by Radix and is what `aria-labelledby` resolves to, so the announced dialog name is the engineering headline — never the product name.

  **Row 2 — body, the scroll container.**
  ```tsx
  <div
    className="overflow-y-auto p-5 space-y-8 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring"
    tabIndex={0}
    role="group"
    aria-label={t("a11y.caseDialog", { title: t(`projects.cases.${id}.title`) })}
  >
  ```
  Without `tabIndex={0}` a long dialog whose only focusable control is the close button cannot be scrolled by keyboard. Contents, in this order:

  1. **Primary visual** — `MediaPlate` at `aspect="16/10"`, full width. For `variant === "capture"`: `src`/`width`/`height`/`sizes` from `engineeringCase.cover`, `alt` = the cover alt key (see T14's `COVER_ALT_KEY` map — export it from `data/cases.ts`? **No** — define the map once in `components/molecules/case-card.tsx` and import it here from a shared module `lib/case-keys.ts`, created in T14 and consumed by both). `kindLabel` = `t("projects.case.kindCapture")`. For `variant === "diagram"`: `kindLabel` = `t("projects.case.kindDiagram")`, `note` = `t("projects.cases.isend.schema.caption")`, children = `<CaseSchematic />`. `year` = `engineeringCase.year` in both branches.
  2. **Three pillars**, `<div className="space-y-4">` — **stacked rows at every width, never a 3-column grid**:
     | # | icon | `iconClassName` | title key | body key |
     |---|---|---|---|---|
     | 1 | `Activity` | `text-amber-600 dark:text-amber-400` | `projects.case.challengeTitle` | `projects.cases.${id}.challenge` |
     | 2 | `Cpu` | `text-cyan-700 dark:text-cyan-400` | `projects.case.architectureTitle` | `projects.cases.${id}.architecture` |
     | 3 | `CheckCircle2` | `text-emerald-700 dark:text-emerald-400` | `projects.case.resultTitle` | `projects.cases.${id}.result` |

     When `engineeringCase.hasArchitectureBeam` is true (iShip only), pillar 2 receives as `children`:
     ```tsx
     <div className="mt-4">
       <h5 className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
         {t("projects.cases.iship.diagramTitle")}
       </h5>
       <ArchitectureBeam />
     </div>
     ```
     This is what satisfies AC15's "the diagram appears in the detail view and no longer inline on the page".
  3. **Technology set** — `<div className="border-t border-border/60 pt-5">`, a mono uppercase 11px `<h4>` with `t("projects.case.stackTitle")`, then **the full list, no `+N` truncation**: `engineeringCase.technologies.map(...)` into `<Badge variant="outline" className="border-border/80 bg-muted/60 font-mono text-xs text-muted-foreground">`.
  4. **Evidence gallery** — rendered **only when `engineeringCase.evidence.length > 0`**. Heading `<h4>` with `t("projects.case.evidenceTitle")`, then `<div className="grid gap-3 sm:grid-cols-2">` of `MediaPlate`s, each with `alt = t(\`projects.cases.${id}.shots.${plate.altKey}\`)`, `kindLabel = t("projects.case.kindCapture")`, `year = engineeringCase.year`, and the plate's own `aspect`/`sizes`/`width`/`height`.
  5. **Responsive row** — rendered **only when `engineeringCase.mobileEvidence.length > 0`**. Heading `<h4>` with `t("projects.case.responsiveTitle")`, then `<div className="grid grid-cols-2 gap-3">` (two columns at **every** width — two portrait plates side by side is the point of the row) of `MediaPlate`s with `aspect="9/16"`.

  **Empty state is absence.** When a case has no extra plates, neither section renders — heading included. No placeholder, no "no images available", no empty grid.

  **The dialog contains no links and no buttons other than close.** A1 and Electrolux have no public URL and inventing one would breach AC13. Do not add a "visit site" affordance to any case.

  The three section headings (3, 4, 5) all use `className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground"`.
- **Tests:** `components/__tests__/case-dialog.test.tsx` (create). Mock `@/components/language-provider` (identity `t` that also handles `{title}` interpolation), `next/image`, and `@/components/molecules/architecture-beam` (to a `<div data-testid="architecture-beam" />`). **Do not mock the Radix dialog** — render inside an open `<Dialog open>` wrapper. Cases:
  - `"states the problem, the architecture and the outcome"` — the three pillar headings and the three body strings are present (AC15);
  - `"lists the full technology set without truncation"` — all ten iShip technologies present, and no `+` overflow chip;
  - `"renders the architecture diagram only for iShip"` — `architecture-beam` testid present for `iship`, absent for the other three;
  - `"renders the evidence gallery only when plates exist"` — two plates for `a1`, and for `iship` neither the gallery heading nor any gallery image;
  - `"renders the responsive row only for A1"` — two 9:16 plates for `a1`, none for `electrolux`;
  - `"uses the engineering headline as the dialog name"` — `getByRole("dialog")` accessible name equals the `title` string, not the `systemName`;
  - `"exposes the body as a keyboard-reachable scroll region"` — the scroll container has `tabindex="0"` and a non-empty `aria-label`;
  - `"renders the iSend schematic with its diagram note"` — for `isend`, the `schema.caption` string is visible.
- **Done when:** `pnpm test components/__tests__/case-dialog.test.tsx` green, `pnpm exec tsc --noEmit` clean — advances **AC15**, **AC16**, **AC13**.

---

### T14 — `CaseCard` molecule — one card, four times

- **Files:**
  - `lib/case-keys.ts` (create)
  - `components/molecules/case-card.tsx` (create)
  - `components/__tests__/case-card.test.tsx` (create)
- **Depends on:** T13
- **Reuse:** `components/ui/dialog.tsx`, `components/ui/badge.tsx`, `components/molecules/media-plate.tsx`, `components/molecules/case-schematic.tsx`, `components/organisms/case-dialog.tsx`, `cn()` from `lib/utils`, `useReducedMotion` from `framer-motion`.
- **What to build:**

  **`lib/case-keys.ts`** — the one place that maps a case id to its cover alt key, imported by both `CaseCard` and `CaseDialog`:
  ```ts
  import type { CaseId } from "@/data/cases";

  export const COVER_ALT_KEY: Record<CaseId, string> = {
    iship: "projects.cases.iship.alt",
    isend: "projects.cases.isend.alt",
    a1: "projects.cases.a1.shots.acuity",
    electrolux: "projects.cases.electrolux.shots.acuity",
  };
  ```
  Update T13's `CaseDialog` import to use it (this is the only edit T14 makes to that file).

  **`components/molecules/case-card.tsx`** — `"use client"`.
  ```tsx
  interface CaseCardProps {
    engineeringCase: EngineeringCase;
    index: number;
  }
  ```

  Outer element — entrance motion, reduced-motion aware:
  ```tsx
  const prefersReducedMotion = useReducedMotion();

  <motion.div
    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: prefersReducedMotion ? 0.15 : 0.4,
      delay: prefersReducedMotion ? 0 : index * 0.06,
      ease: EASE,
    }}
    className="h-full"
  >
  ```

  Inside it, a `<Dialog>` per card, and inside that an `<article>`:
  ```tsx
  <article className="group relative flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl transition-[border-color,box-shadow,transform] duration-[180ms] ease-out-expo hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl active:scale-[0.99] motion-reduce:transform-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100">
  ```
  Under reduced motion the lift and the press scale are suppressed but the **border-colour and shadow change are kept**, so the card still confirms hover.

  The seven rows, in order — **every field is present on every case; none is optional** (AC8):

  1. **Media well** — `MediaPlate`, `aspect="16/10"`. `capture` cases pass `src`/`width`/`height`/`sizes` from `engineeringCase.cover` and `alt={t(COVER_ALT_KEY[id])}`, `kindLabel={t("projects.case.kindCapture")}`. The `isend` case passes `variant="diagram"`, `kindLabel={t("projects.case.kindDiagram")}`, `note={t("projects.cases.isend.schema.caption")}`, `alt={t("projects.cases.isend.alt")}` and `<CaseSchematic />` as children. `year={engineeringCase.year}` in both branches. Never `priority`.
  2. **Role badge** — `<span className="inline-flex w-fit items-center rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">{t(\`projects.cases.${id}.badge\`)}</span>`. **All four badges are neutral** — no per-case accent colour.
  3. **Headline + trigger** —
     ```tsx
     <h3 className="text-lg font-semibold leading-snug tracking-tight text-balance text-foreground md:text-xl">
       <DialogTrigger asChild>
         <button
           type="button"
           aria-label={t("a11y.openCase", { title })}
           className="text-left after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background"
         >
           {title}
         </button>
       </DialogTrigger>
     </h3>
     ```
     One focusable element per card, whole-card hit area via the stretched `after` pseudo-element, no nested interactive elements. The focus ring is drawn on the pseudo-element, not the text.
  4. **System line** — `<p className="truncate font-mono text-xs text-muted-foreground">{t(\`projects.cases.${id}.systemName\`)}</p>`.
  5. **Body** — `<p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{t(\`projects.cases.${id}.subtitle\`)}</p>`.
  6. **Tech chips** — the first **5** of `engineeringCase.technologies` as `<Badge variant="outline" className="border-border/80 bg-muted/60 font-mono text-xs text-muted-foreground">`, plus, when `technologies.length > 5`, one more chip with the same classes reading `` `+${technologies.length - 5}` ``. Wrapper `<ul className="flex flex-wrap gap-2">`, each chip in an `<li>`.
  7. **Footer** — `<div className="mt-auto flex items-center gap-1 border-t border-border/50 pt-4 font-mono text-xs text-primary" aria-hidden="true">{t("projects.case.open")}<ArrowRight className="h-3.5 w-3.5 transition-transform duration-[180ms] ease-out-expo group-hover:translate-x-0.5 motion-reduce:transform-none" /></div>`. Decorative and `aria-hidden` — the trigger in row 3 is the only announced control.

  After the `</article>`, still inside the `<Dialog>`: `<CaseDialog engineeringCase={engineeringCase} />`.

  **How the challenge outranks the product name (AC9), measured:** headline 20px / weight 600 / `text-foreground`; system line 12px / weight 400 / `text-muted-foreground` / monospace. Do not change either.
- **Tests:** `components/__tests__/case-card.test.tsx` (create). Mock `@/components/language-provider` and `next/image`; mock `@/components/molecules/architecture-beam`. **Do not mock `@radix-ui/react-dialog`** and **do not mock `framer-motion`** wholesale — if you need `motion.div` simplified, mock only `motion` and keep the real `useReducedMotion`. Cases:
  - `"presents every structural field for all four cases"` — parameterised over `casesData`: role badge, headline, system line, body and at least one chip present for each (AC8);
  - `"names the trigger after the engineering headline"` — `getByRole("button", { name: … })` where the accessible name contains the `title` string and not the `systemName` (AC9, WCAG 2.5.3);
  - `"truncates the chip list with an overflow count"` — iShip (10 technologies) shows 5 chips plus `+5`; Electrolux (6) shows 5 plus `+1`;
  - `"opens the detail view from the keyboard"` — `await user.tab()` to the trigger, `await user.keyboard("{Enter}")`, then `getByRole("dialog")` is present (AC16);
  - `"closes on Escape and returns focus to the trigger"` — open it, `await user.keyboard("{Escape}")`, then the dialog is gone and `document.activeElement` is the trigger button (AC16);
  - `"closes from the close control and returns focus"` — same, via `getByRole("button", { name: t("a11y.closeCase") })`;
  - `"drops the vertical entrance offset under reduced motion"` — with `useReducedMotion` stubbed to `true`, the rendered `motion.div` receives `initial` without a `y` key and `delay: 0`;
  - `"suppresses the hover lift under reduced motion"` — the `<article>` carries `motion-reduce:transform-none` and still carries `hover:border-primary/40`.
- **Done when:** `pnpm test components/__tests__/case-card.test.tsx` green, `pnpm exec tsc --noEmit` clean — advances **AC8**, **AC9**, **AC16**, **AC20**.

---

### T15 — `ProjectsSection` rewrite and retirement of the old case keys

- **Files:**
  - `components/organisms/projects-section.tsx` (rewrite)
  - `components/__tests__/projects-section.test.tsx` (rewrite)
  - `locales/pt-BR.ts` (edit)
  - `locales/en.ts` (edit)
- **Depends on:** T14
- **Reuse:** `SectionHeading`, `ProjectCard`, `projectsData`, `casesData`, `CaseCard`.
- **What to build:**
  1. **Delete** from `projects-section.tsx`: the `ISHIP_TECH` and `ISEND_TECH` consts, both bespoke inline `<Card>` case blocks in their entirety, the inline `<Image src="/app-iship.png">`, the inline `<ArchitectureBeam />`, the three-column pillar grids, and **the whole simulated telemetry HUD** — the dark panel, the three traffic-light dots, `telemetryUrl` and `activeRoutesBadge`. It is deleted, not adapted: it is the simulated interface AC12 forbids and it carries the retired routes boast. The imports of `Activity`, `ArrowRight`, `CheckCircle2`, `Cpu`, `Image`, `ArchitectureBeam`, `Badge`, `Card*` go with it.
  2. The section becomes:
     ```tsx
     <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-16 py-20 md:py-28">
       <SectionHeading id="projects-heading" title={t("projects.title")} description={t("projects.description")} />

       <div className="grid gap-6 lg:grid-cols-2">
         {casesData.map((engineeringCase, index) => (
           <CaseCard key={engineeringCase.id} engineeringCase={engineeringCase} index={index} />
         ))}
       </div>

       <div className="mt-16 border-t border-border/60 pt-10">
         <div className="mb-3 flex items-center gap-3">
           <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
             {t("projects.openSourceTitle")}
           </h3>
           <div className="h-px flex-1 bg-border/60" aria-hidden="true" />
         </div>
         <p className="mb-6 max-w-prose text-sm text-muted-foreground">
           {t("projects.openSourceDescription")}
         </p>

         <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
           {/* the existing projectsData map and <ProjectCard> block, unchanged */}
         </div>
       </div>
     </section>
     ```
     The case grid is `lg:grid-cols-2`, **not** `md:` — at 768 a two-up card is ~360px, which crushes a 16:10 plate plus a two-line headline plus three body lines. The open-source grid goes `sm:grid-cols-2 xl:grid-cols-4` (it is currently `sm:grid-cols-2 2xl:grid-cols-4`); subordination is by position and density, and no imagery is added to it.
     The existing `motion.div` wrapper and per-index delay around each `ProjectCard` stay exactly as they are — `ProjectCard` and its 3D tilt are untouched.
  3. Delete from **both** locale files: `projects.cases.iship.{productionBadge,challengeTitle,architectureTitle,resultTitle}` and `projects.cases.isend.{telemetryUrl,activeRoutesBadge,apmCategory,apmTitle,apmDesc,qualityCategory,qualityTitle,qualityDesc,asyncCategory,asyncTitle,asyncDesc,challengeTitle,architectureTitle,resultTitle}`.
- **Tests:** `components/__tests__/projects-section.test.tsx` (rewrite). Keep the existing mocking idiom (`SectionHeading`, `ProjectCard`, `framer-motion.motion.div`) and add a `CaseCard` mock rendering `<article data-testid={\`case-${props.engineeringCase.id}\`} />`. Cases:
  - `"renders the four production cases in evidence order"` — four `case-*` testids, in DOM order `iship, isend, a1, electrolux`, each receiving its `index` (AC8);
  - `"keeps the open-source strip below the production cases"` — the open-source heading node follows the last case node by `compareDocumentPosition` (AC17);
  - `"still renders every open-source project"` — the existing `projectCardMock` assertions, preserved;
  - `"no longer renders the architecture diagram inline"` — no `architecture-beam` testid anywhere in the section (AC15);
  - `"renders no fabricated environment string"` — `container.textContent` does not match `/\.interno|internal\/telemetry|ACTIVE DISPATCH/i` (AC13).
- **Done when:** `pnpm test components/__tests__/projects-section.test.tsx locales` green, `pnpm build` green, and `grep -rn "telemetryUrl\|activeRoutesBadge\|app-iship.png" app components locales` returns nothing — advances **AC8**, **AC12**, **AC13**, **AC15**, **AC17**, **AC18**.

---

### T16 — `CareerPhaseCard` molecule

- **Files:**
  - `components/molecules/career-phase-card.tsx` (create)
  - `components/__tests__/career-phase-card.test.tsx` (create)
- **Depends on:** T7
- **Reuse:** `cn()` from `lib/utils`, `useReducedMotion` from `framer-motion`.
- **What to build:** `"use client"`.
  ```tsx
  interface CareerPhaseCardProps {
    number: string;
    badge: string;
    period: string;
    title: string;
    context: string;
    description: string;
    emphasis: "muted" | "foreground" | "primary";
    index: number;
  }
  ```

  Identity comes from **an escalation of emphasis within one hue family**, never from three different accent colours:
  ```ts
  const EMPHASIS = {
    muted: { card: "border-border/70 hover:border-border", accent: "text-muted-foreground" },
    foreground: { card: "border-border hover:border-border", accent: "text-foreground" },
    primary: { card: "border-primary/40 bg-primary/5 hover:border-primary/60", accent: "text-primary" },
  } as const;
  ```

  Root is a `<motion.li>` (the parent renders an `<ol>`, so `01/02/03` is conveyed structurally and not only visually):
  ```tsx
  <motion.li
    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      duration: prefersReducedMotion ? 0.15 : 0.4,
      delay: prefersReducedMotion ? 0 : index * 0.06,
      ease: EASE,
    }}
    className={cn(
      "flex h-full flex-col rounded-xl border bg-card/50 p-5 backdrop-blur-xl transition-[border-color,transform] duration-[180ms] ease-out-expo hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:hover:translate-y-0",
      EMPHASIS[emphasis].card,
    )}
  >
  ```
  Contents, in order:
  1. `<div className="flex items-baseline justify-between gap-2 font-mono text-[11px]">` with `<span className={cn("font-bold", EMPHASIS[emphasis].accent)}>{number}</span>` and `<span className="text-muted-foreground">{period}</span>`;
  2. `<span className={cn("mt-2 w-fit rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px]", EMPHASIS[emphasis].accent)}>{badge}</span>`;
  3. `<h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-foreground text-balance">{title}</h3>`;
  4. `<p className="mt-1 font-mono text-xs text-muted-foreground">{context}</p>`;
  5. `<p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>`.

  The card is **not interactive** — no `tabIndex`, no `onClick`, no focus styles.
- **Tests:** `components/__tests__/career-phase-card.test.tsx` (create). Render inside an `<ol>`. Mock `framer-motion`'s `motion.li` only; keep the real `useReducedMotion`. Cases:
  - `"renders every phase field"` — number, badge, period, title, context and description all present;
  - `"exposes the phase as a list item with a level-3 heading"` — `getByRole("listitem")`, `getByRole("heading", { level: 3 })`;
  - `"is not interactive"` — `queryByRole("button")` and `queryByRole("link")` are both null;
  - `"escalates emphasis by phase"` — `emphasis="primary"` yields `border-primary/40`, `emphasis="muted"` yields `border-border/70`;
  - `"drops the vertical offset and the stagger under reduced motion"` — with `useReducedMotion` stubbed to `true`, `initial` has no `y` and `transition.delay` is `0`;
  - `"suppresses the hover lift under reduced motion"` — the element carries `motion-reduce:transform-none`.
- **Done when:** `pnpm test components/__tests__/career-phase-card.test.tsx` green — advances **AC7**, **AC20**.

---

### T17 — `ExperienceSection`: the ascent made legible

- **Files:**
  - `components/organisms/experience-section.tsx` (edit)
  - `components/__tests__/experience-section.test.tsx` (edit)
- **Depends on:** T16
- **Reuse:** `CareerPhaseCard`, `SectionHeading`. The `Tabs`, the timeline, `ExperiencePosition`, `EducationCard`, the expand/collapse behaviour and `formatDurationRange` are **untouched** — they are the verification layer beneath the summary.
- **What to build:**
  1. Between `<SectionHeading>` and `<Tabs>`, and **replacing** the current centred `experience.progression` pill block, insert:
     ```tsx
     <div className="mb-10">
       <h3 className="text-center text-xl font-semibold tracking-tight text-foreground text-balance">
         {t("experience.phases.title")}
       </h3>
       <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
         {t("experience.phases.description")}
       </p>

       <ol className="mt-8 grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3 md:gap-4">
         {PHASES.map((phase, index) => (
           <CareerPhaseCard key={phase.id} index={index} {...} />
         ))}
       </ol>
     </div>

     <div className="mb-6 mt-10 h-px w-full bg-border/60" aria-hidden="true" />
     ```
     The divider carries **no caption** — see R5.
  2. `PHASES` is a module-level const of three entries holding only the id, the locale sub-path and the emphasis; every string is read through `t()` inside the map:
     ```ts
     const PHASES = [
       { id: "foundation", emphasis: "muted" },
       { id: "leadership", emphasis: "foreground" },
       { id: "scale", emphasis: "primary" },
     ] as const;
     ```
     Each card gets `number={t(\`experience.phases.${phase.id}.number\`)}` and the same pattern for `badge`, `period`, `title`, `context`, `description`.
  3. The `experience.progression.*` keys are **not deleted** (`copy.md` § Not deleted, deliberately) — but the pill that consumed them is removed, so they become unreferenced. Keep the keys and remove the pill and the now-unused `TrendingUp` import. Record this in `STATUS.md` as the one intentional key survivor under AC2, with `copy.md` as the justification.
- **Tests:** `components/__tests__/experience-section.test.tsx` (edit). Keep every existing case. Add:
  - `"summarises the career as three ordered phases"` — `getAllByRole("listitem")` within the phase list is length 3, and the three phase titles appear in the order foundation → leadership → scale (AC7);
  - `"places the phase summary above the tabs"` — `compareDocumentPosition` proves the `<ol>` precedes the `TabsList`;
  - `"keeps the detailed tabs intact"` — both tab triggers still render and the professional timeline still lists every company from `experienceData`;
  - `"no longer renders the progression pill"` — the `experience.progression.label` string is absent.
- **Done when:** `pnpm test components/__tests__/experience-section.test.tsx` green — advances **AC7**.

---

### T18 — `HeroSection`: three load-bearing credentials

- **Files:**
  - `components/organisms/hero-section.tsx` (edit)
  - `components/__tests__/hero-section.test.tsx` (edit)
  - `locales/pt-BR.ts` (edit)
  - `locales/en.ts` (edit)
- **Depends on:** T4, T7
- **Reuse:** `CounterNumber` (years cell only), `ScrollIndicator`, `ButtonLink`, `Button`.
- **What to build:**
  1. Replace the `stats` array with three cells of **identical shape**: one `dt` (the label line) and one `dd` (the value line), in that order, in all three. `copy.md`'s own constraint notes settle which string is which — `hero.stats.education` is declared "label line, **same slot as `hero.stats.experience`**", and `hero.stats.educationValue` is declared "same visual slot as the years number". So:

     ```ts
     const credentials = [
       { id: "experience", label: translate("hero.stats.experience"), value: `${yearsOfExperience}+`, isCounter: true },
       { id: "education", label: translate("hero.stats.education"), value: translate("hero.stats.educationValue"), isCounter: false },
       { id: "leadership", label: translate("hero.stats.leadership"), value: translate("hero.stats.leadershipValue"), isCounter: false },
     ] as const;
     ```

     | Cell | `dt` (label line) | `dd` (value line) |
     |---|---|---|
     | 1 | `hero.stats.experience` | `<CounterNumber value={`${yearsOfExperience}+`} />` |
     | 2 | `hero.stats.education` | `hero.stats.educationValue` |
     | 3 | `hero.stats.leadership` | `hero.stats.leadershipValue` |

     No cell has a third line: `copy.md` ships exactly two strings per credential, and `design.md`'s optional caption row has no content to carry. Do not invent one, and do not repeat a string across `dt` and `dd`.

     Markup per cell, identical for all three:
     ```tsx
     <div className="group cursor-default select-none py-2 transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transform-none sm:px-4 sm:py-0">
       <dt className="font-mono text-[11px] leading-snug tracking-[0.025em] text-muted-foreground">{label}</dt>
       <dd className="mt-1 text-base font-semibold leading-tight text-foreground transition-colors duration-150 ease-out group-hover:text-primary">
         {isCounter ? <CounterNumber value={value} /> : value}
       </dd>
     </div>
     ```
     The `dt` is **not** `uppercase`. `design.md` budgeted an 18-char mono uppercase label; `hero.stats.education` is 46 chars in pt-BR and 50 in en, and uppercasing it would both overflow the cell and read as shouting a university name. Sentence-case mono at 11px keeps all three labels on one line at 390 (~50 chars × 6.6px ≈ 330px inside a 326–380px cell, with `leading-snug` allowing a second line rather than a clip if a locale grows). `CounterNumber` is used **only** for cell 1; it already renders non-numeric values verbatim and already honours `prefers-reduced-motion`.
  2. Strip wrapper — outer unchanged, inner replaced:
     ```tsx
     <div className="rounded-2xl border border-border/70 bg-card/30 p-1.5 shadow-sm backdrop-blur-xl">
       <dl className="grid grid-cols-1 divide-y divide-border/60 rounded-xl border border-border/40 bg-card/50 p-3.5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
     ```
     Each cell is the `<div className="group …">` block given in step 1. The current `pl-4` on `statIndex > 0` and the `text-2xl md:text-3xl font-mono font-bold` treatment are both **deleted** — one oversized number beside two text cells re-creates the vanity-metric read this spec exists to remove, and `grid-cols-3` truncates all three labels at 390.
  3. Profile image `alt` — replace the hardcoded `"Rafael Martins Alves, desenvolvedor full stack"` with `{t("a11y.profilePhoto")}`.
  4. `ScrollIndicator` — `targetId="experience"` and `label={t("a11y.scrollToExperience")}`.
  5. Delete from **both** locale files: `hero.stats.certificates`, `hero.stats.companies`, `a11y.scrollToSkills`.
- **Tests:** `components/__tests__/hero-section.test.tsx` (edit). Extend the translation map with the five new hero keys and `a11y.profilePhoto`, `a11y.scrollToExperience`. Keep every existing case except the two that assert the old alt and the old scroll target. Add:
  - `"shows exactly three credentials"` — the `<dl>` contains exactly three `dt` and three `dd` elements (AC4);
  - `"names no certification count and no company count"` — the rendered text does not contain the strings `"Certifications"`, `"Certificações"`, `"Companies"` or `"Empresas"`, and no `dd` is the literal `"14"` or `"2"` (AC4);
  - `"states the education without asserting a completed degree"` — the education caption is rendered and does not match `/bacharel|bachelor|graduado|graduated/i` (AC3);
  - `"keeps the computed years of experience"` — the existing case, unchanged;
  - `"points the scroll indicator at the trajectory"` — `scrollIndicatorMock` called with `{ targetId: "experience", label: "Go to Experience section" }` (AC5, AC6);
  - `"describes the profile picture from the locale"` — the `alt` equals the `a11y.profilePhoto` value (AC21);
  - `"stacks the credential strip on small viewports"` — the `<dl>` carries `grid-cols-1` and `sm:grid-cols-3`.
- **Done when:** `pnpm test components/__tests__/hero-section.test.tsx locales` green, and `grep -rn "desenvolvedor full stack\|scrollToSkills\|stats.certificates\|stats.companies" app components locales` returns nothing — advances **AC3**, **AC4**, **AC21**.

---

### T19 — Full-suite verification and coverage

- **Files:** none expected. If a check fails, fix the offending file and say so in `STATUS.md`.
- **Depends on:** T1–T18
- **Reuse:** n/a
- **What to build:** run, in this order, and fix anything red:
  1. `pnpm lint`
  2. `pnpm exec tsc --noEmit`
  3. `pnpm test`
  4. `pnpm test:coverage` — record the line/branch/function/statement numbers in `STATUS.md`. Coverage must be **at or above** the pre-change baseline. The two deleted certificate test files also remove their two source files from the denominator, so the expected movement is neutral-to-up; if it dropped, the gap is in a new component and the missing cases go back into that component's test file, not into a blanket `/* v8 ignore */`.
  5. `pnpm build`
  6. `grep -rn "\.interno\|internal/telemetry\|adamrobo\.com\.br\|ACTIVE DISPATCH" app components data locales` — must return nothing (AC13).
  7. `grep -rniE "certificate" app components data hooks lib locales` — must return nothing (AC2).
  8. `node .agents/tools/preview.mjs --out .specs/0100-engineering-proof-redesign/evidence` — zero axe-core violations at `critical` or `serious` and zero console errors, at 1440 and 390, dark and light (AC22).
- **Tests:** the whole suite.
- **Done when:** all eight checks pass and the coverage delta is recorded in `STATUS.md` — advances **AC19**, **AC20**, **AC22**.

---


## Commit grouping

Contiguous task ranges the `release-manager` can turn into context-scoped commits. Every range builds and passes tests on its own.

| Commit | Tasks | Suggested subject |
|---|---|---|
| 1 | T1–T2 | `fix(quality): clear type debt and align the education record` |
| 2 | T3–T4 | `feat(nav): remove certificates and invert the narrative order` |
| 3 | T5–T7 | `feat(cases): add case assets, data module and locale keys` |
| 4 | T8–T9 | `fix(a11y): enlarge the dialog close target and gate the beam animation` |
| 5 | T10–T12 | `feat(cases): add the media plate, schematic and pillar molecules` |
| 6 | T13–T14 | `feat(cases): add the case card and its detail dialog` |
| 7 | T15 | `feat(projects): present four production cases as engineering proof` |
| 8 | T16–T17 | `feat(experience): summarise the career as three phases` |
| 9 | T18 | `feat(hero): replace vanity metrics with load-bearing credentials` |

T19 produces no diff of its own; if it does, that fix belongs in the commit of the task that caused it.

---

## Risks

| Risk | Signal it happened |
|---|---|
| The four case headlines (72–81 chars in `copy.md`, against `design.md`'s 72-char budget) push a third line at 1440 and break the 2×2 grid's vertical rhythm. `projects.cases.a1.title` (81 en) and `…iship.title` (81 en) are the exposed ones. | A case card in the top row is visibly taller than its neighbour at 1440. **The developer does not trim the string** — it goes back to the `content-writer` (`copy.md` § Open items 4). |
| `experience.phases.leadership.title` (51 pt / 60 en) overflows the phase card at 390. | Three-line title in a card that budgeted two. Same rule: back to the writer, not to an ellipsis. |
| The five-node schematic (R1) overruns its 16:10 viewBox at 390 and the sublabels clip. | `…schema.ciSub` ("Cobertura e quality gate por PR", 31 chars) is cut mid-word on the iSend card at 390. Fix is geometry inside T11's `sm:hidden` layout, never a shorter string. |
| `dark:group-hover/plate:opacity-100` does not fire because the card's `group` and the plate's `group/plate` collide in Tailwind's variant ordering. | The capture stays dimmed on hover in dark theme at 1440. Check that both the named and unnamed group variants are present on the inner well. |
| Radix renders `DialogContent` in a portal, so `case-card.test.tsx`'s focus-return assertion reads `document.activeElement` from the wrong tree. | The `Esc` test passes but the focus-return assertion is `body`. The fix is `await waitFor(...)` around the assertion — Radix restores focus asynchronously. Do not weaken the assertion to "not null". |
| The `a1-card.webp` crop (`top = 0`) is re-derived by hand and cuts the application header, or the Electrolux report crop is re-derived and leads with the client wordmark. | The A1 card shows Snellen rows with no header, or a large Electrolux wordmark is the first thing in the report plate — an AC10 failure. Use the boxes in T5 verbatim. |
| Coverage drops below baseline because `case-dialog.tsx` and `case-card.tsx` have branches (diagram vs capture, beam vs no beam, gallery vs empty) that only one fixture exercises. | `pnpm test:coverage` branch percentage falls. Parameterise the card and dialog tests over all four entries of `casesData`, which is what T13 and T14 already specify. |
| `public/app-iship.png` (1.2 MB) is deleted "for tidiness" after T15 leaves it unreferenced. | `git status` shows a deletion in `public/`. It is a human approval point (`AGENTS.md` §4) and is **not** in this plan. |

---

## Run 2 — audit bounce (G5, bounce 1 of 2)

`reports/audit.md` rejected G5 with two blocking and two moderate findings. `reports/qa.md` passed. Triage below; the destination of every finding is recorded in `STATUS.md` § Triage. T20–T25 are the tasks that come back to `frontend-dev`. Nothing here reopens G1, G2 or G3.

**Ruling on the contrast blocker (AC22): ordinary work, inside the tech-lead's authority. Not a human approval point.** All three failing pairs are fixed by substituting foreground values that **already exist** — one semantic token already declared in `app/globals.css`, and one light-theme shade this spec's own `design.md` § Tokens already sanctions. **No variable in `app/globals.css` changes, no entry in `tailwind.config.ts` changes, and `DESIGN.md` is not amended.** Measured (sRGB relative luminance, WCAG 2.1 formula, alpha composited exactly as the browser does):

| Element | Composited background | Current foreground | Ratio | Prescribed foreground | Ratio |
|---|---|---|---|---|---|
| `hero.badge` text, light | `bg-primary/10` over `bg-background` = `rgb(224,234,250)` | `text-primary` = `hsl(217 91% 48%)` | **4.47** ✗ | `text-secondary-foreground` = `hsl(217 91% 45%)` — already declared at `app/globals.css:20` | **4.95** ✓ |
| `hero.badge` text, dark | `rgb(12,28,40)` | `text-primary` = `hsl(199 89% 48%)` | 6.05 ✓ | unchanged (`dark:text-primary`) | 6.05 ✓ |
| skills "Live" pill, light | `bg-emerald-500/10` over `bg-card/50` over `bg-background` = `rgb(228,245,242)` | `text-emerald-400` | **1.71** ✗ | `text-emerald-700` — `design.md:231` already ships `text-emerald-700 dark:text-emerald-400` as "the AA-safe counterpart" | **4.87** ✓ |
| skills "Live" pill, dark | `rgb(19,25,33)` | `text-emerald-400` | 8.58 ✓ | unchanged (`dark:text-emerald-400`) | 8.58 ✓ |
| `CuritibaClock`, light | `bg-card/50` over `bg-background` = `rgb(252,252,254)` | `text-emerald-500` | **2.47** ✗ | `text-emerald-700` | **5.35** ✓ |
| `CuritibaClock`, dark | `rgb(17,20,27)` | `text-emerald-500` | 6.9 ✓ | `dark:text-emerald-400` | 9.81 ✓ |

The three light shades that were *rejected*: `text-primary` kept with a heavier `bg-primary/20` (changes the badge's surface, which is a design decision and needs the designer); `emerald-600` (3.35 and 3.68 — still fails 4.5); a new `--telemetry-foreground` variable in `globals.css` (a `DESIGN.md` system change, and therefore a human approval point — avoided precisely because it is not needed).

**All three are fixed here, not deferred to a follow-up spec.** Only the hero badge sits on this spec's surface; the "Live" pill and the clock are in files no task T1–T19 touched. Deferring them is nevertheless wrong: AC22 is worded "zero axe-core violations at `critical` or `serious`" and `AGENTS.md` §4.1 admits no partial pass, so a follow-up spec cannot unblock this gate — G5 and G8 would keep rejecting 0100 until the other two are fixed anyway. The diff is three class strings applying values that already exist, with no new surface. That is cheaper than a spec.

---

### T20 — Clear the three light-theme contrast failures (AC22)

- **Files:**
  - `components/organisms/hero-section.tsx` — edit
  - `components/organisms/skills-section.tsx` — edit
  - `components/atoms/curitiba-clock.tsx` — edit
- **Depends on:** none
- **Reuse:** the `--secondary-foreground` token already declared at `app/globals.css:20` / `.dark` at `:53`, exposed as `text-secondary-foreground` by `tailwind.config.ts`; and the `text-emerald-700 dark:text-emerald-400` pairing already shipped by this batch at `components/organisms/case-dialog.tsx:96` and specified in `design.md` § Tokens, row "Pillar 3 icon". Introduce no new class family and no new variable.
- **What to build:** three class substitutions, nothing else. Do not touch any background, border or opacity.
  1. `hero-section.tsx:124` — the badge wrapper. Replace `text-primary` with `text-secondary-foreground dark:text-primary`. The rest of the class string (`border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium … shadow-sm backdrop-blur-md`) is unchanged. The two `bg-primary` ping dots inside it are **not** text and are **not** changed.
  2. `skills-section.tsx:74` — the "Live" pill `<span>`. Replace `text-emerald-400` with `text-emerald-700 dark:text-emerald-400`. Apply the identical substitution to the icon tile at `skills-section.tsx:66` (same class token) so the card does not ship two different greens side by side in light theme; the tile's `border-emerald-500/30 bg-emerald-500/10` and both `bg-emerald-400` dots are unchanged.
  3. `curitiba-clock.tsx:26` — replace `text-emerald-500` with `text-emerald-700 dark:text-emerald-400`.
- **Out of scope, deliberately:** `hero-section.tsx:202-203` (the copy-email confirmation), `architecture-beam.tsx:93`, `project-card.tsx:113` and `interactive-terminal.tsx` also carry `text-emerald-400`. `axe-core` did not flag them (the terminal and the beam render on dark surfaces; the copy confirmation is transient and was not in the captured state). Do **not** sweep them in this task — an unflagged change is scope the gate did not ask for. They are recorded in `STATUS.md` as a follow-up candidate.
- **Tests:** `components/__tests__/hero-section.test.tsx` — add `"keeps the hero badge on the AA-safe foreground in light theme"`: render, get the element containing `hero.badge`, assert `toHaveClass("text-secondary-foreground", "dark:text-primary")` and `not.toHaveClass("text-primary")` on that element's own class list. Do **not** add a jsdom test for the emerald substitutions — jsdom cannot compute contrast and a class-presence assertion there would be the same empty guarantee that produced the blocker in T21. The real check for all three is step 3 of "Done when".
- **Done when:**
  1. `pnpm test components/__tests__/hero-section.test.tsx` green;
  2. `grep -rn "text-emerald-400\|text-emerald-500" components/organisms/skills-section.tsx components/atoms/curitiba-clock.tsx` returns only lines carrying the `dark:` prefix or a `bg-`/`border-` utility;
  3. `node .agents/tools/preview.mjs --out .specs/0100-engineering-proof-redesign/evidence` reports **zero** `color-contrast` entries at `serious` or `critical` in `report.json`, in all four combinations (1440/390 × light/dark).

  Advances **AC22**.

---

### T21 — Make the dialog's reduced-motion override actually win the cascade

- **Files:** `components/ui/dialog.tsx` — edit
- **Depends on:** none
- **Reuse:** nothing new. Tailwind 3's `!` important modifier (`package.json:46`, `tailwindcss ^3.4.19`) — the same escape hatch the framework documents for exactly this conflict.
- **What to build:** `motion-reduce:animate-none` (specificity `0-1-0`) loses to Radix's `data-[state=open]:animate-in` (`0-2-0`), so the override is dead code in a real browser while the dialog is open. The fix is to raise the override out of the specificity contest entirely:
  1. `dialog.tsx:24` (`DialogOverlay`) — replace `motion-reduce:animate-none` with `motion-reduce:!animate-none motion-reduce:!transition-none`. The `transition-all duration-200 ease-out` on this element is a second animated channel and is suppressed for the same reason.
  2. `dialog.tsx:45` (`DialogContent`) — replace `motion-reduce:animate-none` with `motion-reduce:!animate-none`. The `duration-200 ease-out` pair on this element is inert without a `transition-*` utility; leave it.
  3. Change nothing else. Do **not** remove the `data-[state=*]:animate-in/animate-out/zoom/slide` utilities — they are the motion path for users who did not ask for reduced motion, and `design.md` § Motion still requires them.
  4. Do **not** reach for `useReducedMotion()` here: `dialog.tsx` is a `ui/` primitive with no client state of its own, and the CSS-level fix is one modifier against a hook, a `useState` and a re-render. Rung 4 of the ladder.
- **Tests:** `components/__tests__/ui-dialog.test.tsx:107` — amend `"suppresses the entrance animation under reduced motion"` to assert `toHaveClass("motion-reduce:!animate-none")` on both overlay and content, and additionally `expect(overlay).toHaveClass("motion-reduce:!transition-none")`. **Rename it** to `"carries the important reduced-motion override on overlay and content"` — the old name claimed a behaviour jsdom cannot observe, and the honest name is half the fix. The behavioural proof is T22.
- **Done when:** `pnpm test components/__tests__/ui-dialog.test.tsx` green **and** T22's browser probe exits `0`. The jsdom test alone does not close this task.

  Advances **AC16**, **AC22** and `design.md` § Motion.

---

### T22 — A check that would actually have caught it: a real-browser reduced-motion probe

- **Files:** `.agents/tools/check-reduced-motion.mjs` — create
- **Depends on:** T21
- **Reuse:** `playwright`'s `chromium`, already a dependency and already driven by `.agents/tools/preview.mjs`. Copy that file's `arg()`, `isUp()`, `waitForServer()` and server-spawn block verbatim rather than reinventing them; do not refactor `preview.mjs` to share them — two small duplicated helpers beat a premature extraction, and `preview.mjs` must not change shape inside a bounce.
- **What to build:** a standalone script that opens the page in a context with `reducedMotion: 'reduce'`, activates a trigger, and asserts the resulting element's **computed** `animationName` is `none`. The defect this exists to catch is "a `motion-reduce:` utility is present in the class list but loses the cascade" — which is invisible to jsdom and invisible to `axe-core`, and is therefore currently invisible to every gate in this pipeline.

  ```
  node .agents/tools/check-reduced-motion.mjs [--port 3100] [--base-url <url>] \
       [--trigger '#projects article button'] [--target '[role="dialog"]']
  ```

  - Flags, with these exact defaults: `--port` `3100`; `--base-url` `null` (when absent, spawn `pnpm exec next dev -p <port>` exactly as `preview.mjs` does and wait for it); `--trigger` `#projects article button`; `--target` `[role="dialog"]`.
  - Body: `chromium.launch()` → `browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } })` → `page.goto(base)` → assert `await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches) === true` (if this is false the probe is meaningless and must exit `1` with `"the reduced-motion context did not apply"`) → `await page.locator(trigger).first().click()` → `await page.locator(target).waitFor({ state: 'visible' })`.
  - Then read, for the target **and** for the overlay (`page.locator('[data-state="open"].inset-0').first()`), `getComputedStyle(el).animationName` and `.transitionProperty`.
  - **Pass** = `animationName === 'none'` for both. **Fail** = anything else.
  - Print one line per element: `ok|FAIL <selector> animationName=<value>`. `process.exit(1)` on any failure, `0` otherwise. Close the browser and kill the spawned server in a `finally`, same as `preview.mjs`.
  - No test framework, no fixtures, no report file. This is a gate probe, not a suite.
- **Tests:** none — the script *is* the test. Do not write a Vitest wrapper for it.
- **Done when:** `node .agents/tools/check-reduced-motion.mjs` prints `ok` for both elements and exits `0` **after** T21, and — verify this explicitly — exits `1` with `animationName=enter` when run against a `git stash`-ed tree that still has the non-important class. A check that cannot fail is not a check; paste both outputs into `STATUS.md`.

  Advances **AC16**, and closes the test-shaped hole named in `reports/audit.md`.

---

### T23 — Repair the heading hierarchy inside the case dialog (AC15)

- **Files:**
  - `components/molecules/architecture-beam.tsx` — edit
  - `components/molecules/case-pillar.tsx` — edit
  - `components/organisms/case-dialog.tsx` — edit
  - `locales/en.ts` — edit
  - `locales/pt-BR.ts` — edit
- **Depends on:** none
- **Reuse:** `SECTION_HEADING_CLASS` at `case-dialog.tsx:14` — the class string does not change on any of these headings, only the tag does.
- **What to build:** `ArchitectureBeam` still carries the section header it was given in its original skills-section home. Inside the dialog that header is a structurally-higher `h3` nested under an `h4`/`h5`, and its text restates both of them. The whole dialog ladder is rebuilt once, so there is no skipped level left anywhere in the subtree:

  | Element | now | after |
  |---|---|---|
  | `DialogTitle` (case headline) | `h2` | `h2` — unchanged |
  | `CasePillar` title (`case-pillar.tsx:18`) | `h4` | **`h3`** |
  | Stack title (`case-dialog.tsx:103`) | `h4` | **`h3`** |
  | Evidence title (`case-dialog.tsx:120`) | `h4` | **`h3`** |
  | Responsive title (`case-dialog.tsx:142`) | `h4` | `h4` — unchanged; it nests under the evidence `h3` |
  | Diagram title (`case-dialog.tsx:89`) | `h5` | **`h4`** — it nests under pillar 2's `h3` |
  | `ArchitectureBeam` own section header (`architecture-beam.tsx:80-86`) | `h3` + description `<p>` | **deleted** |
  | `ArchitectureBeam` node titles (`architecture-beam.tsx:184`) | `h4` | **`h5`** — they nest under the diagram `h4` |

  Result, in DOM order: `h2` → `h3` → `h3` → `h4` → `h5`×4 → `h3` → `h3` → `h4`. No skip, no duplication.

  1. `architecture-beam.tsx` — delete the inner `<div>` at lines 74–87 that wraps the cyan ping dot, the `<h3>` and the `architectureDescription` `<p>`. Keep the chip row (`AVRO / JSON` + `zeroDataLoss`) and the header shell, changing the shell's classes to `mb-6 flex flex-wrap items-center gap-2 border-b border-border/60 pb-5` — the `flex-col sm:flex-row … justify-between` split existed only to separate the deleted title block from the chips, and with one child left `justify-between` would strand the chips on the left. The chips' own inner `<div className="flex items-center gap-2 font-mono text-xs …">` stays.
  2. The `h3` was the only consumer of `skills.bento.architectureTitle` and `skills.bento.architectureDescription`. Delete both keys from **both** `locales/en.ts` (`:47-48`) and `locales/pt-BR.ts` (`:47-49`) — AC21 forbids orphaned keys, and this is the same mechanical retirement applied to the `tagline` keys in T19. Do not touch any other `skills.bento.*` key; `nodeDriverApp`, `nodeBff`, `nodeKafka`, `nodeCloud`, `zeroDataLoss` and `liveBadge` all still have consumers. Confirm with `grep -rn "bento.architectureTitle\|bento.architectureDescription" app components data lib` returning nothing **before** deleting.
  3. Tag swaps per the table. No class string changes anywhere except the beam header shell in step 1.
- **Tests:**
  - `components/__tests__/case-dialog.test.tsx` — add `"nests the dialog headings without skipping a level"`: render the dialog for the `iship` fixture opened, collect `container.querySelectorAll("h1,h2,h3,h4,h5,h6")`, map to `Number(tag[1])`, and assert no element is more than one level deeper than the minimum level seen before it (a plain loop over `levels`, tracking the running max-allowed — no library). Assert the first level is `2`.
  - `components/__tests__/architecture-beam.test.tsx` — add `"does not render its own section heading"`: `expect(container.querySelector("h3")).toBeNull()` and `expect(screen.queryByText("skills.bento.architectureTitle")).toBeNull()`. Amend the existing `"renders the four architecture nodes"` to also assert the node titles are `h5` (`container.querySelectorAll("h5")` has length 4). The `ArchitectureBeam` mock in `case-dialog.test.tsx:28` and `case-card.test.tsx:30` stays as it is.
  - `locales/__tests__/parity.test.ts` — add `"skills.bento.architectureTitle"` and `"skills.bento.architectureDescription"` to the retired-key list alongside the `certificates` entries, in the same shape.
- **Done when:** `pnpm test components/__tests__/case-dialog.test.tsx components/__tests__/architecture-beam.test.tsx locales` green, `pnpm exec tsc --noEmit` clean, and `grep -rn "architectureTitle" locales/` returns only `projects.case.architectureTitle` and `terminal.architectureTitle` — advances **AC15**, **AC21**.

---

### T24 — Let the Electrolux report plate show the whole document

- **Files:**
  - `components/molecules/media-plate.tsx` — edit
  - `data/cases.ts` — edit
- **Depends on:** none
- **Reuse:** `ASPECT_CLASS` at `media-plate.tsx:22` — extend the map, do not add a branch to the render body.
- **What to build:** `design.md` § Asset spec row 9 generated `electrolux-report.webp` at **880×1283 (0.686:1, portrait)** with the crop box chosen specifically "to keep the whole occupational-health document — worker data, anamnesis, the vision and colour tables, **the signature block**". `MediaPlate`'s `aspect` union (`"16/10" | "9/16"`) — which **this plan specified in T10** — cannot express that ratio, so `data/cases.ts:157` assigns `"16/10"` and `object-cover object-top` discards the bottom 57% of the document, including the signature block that the case headline and `projects.cases.electrolux.shots.report`'s alt text both name. This is a plan defect, not a design one: `design.md`'s intent is unambiguous and the implementation had no way to express it. It does **not** go back to the `product-designer`, and it changes no token.
  1. `media-plate.tsx:12` — widen the prop type to `aspect: "16/10" | "9/16" | "11/16"`.
  2. `media-plate.tsx:22` — `const ASPECT_CLASS = { "16/10": "aspect-[16/10]", "9/16": "aspect-[9/16]", "11/16": "aspect-[11/16]" } as const;`
  3. `data/cases.ts:157` — the `electrolux-report.webp` entry's `aspect` becomes `"11/16"`. Change nothing else in that entry; `width: 880`, `height: 1283` and `sizes` are correct.
  4. Keep `object-cover object-top`. `11/16 = 0.6875` against the asset's `880/1283 = 0.6859` crops **0.23% off the bottom** — sub-pixel at every rendered width, so the signature block renders in full. Do **not** switch this plate to `object-contain`: it would letterbox the `bg-muted/60` well inside the bezel and break the plate's uniform treatment across all nine images.
  5. Expect the plate to be visibly taller than the `16/10` Ishihara plate beside it in the `sm:grid-cols-2` evidence gallery. That is correct and intended — the two plates are top-aligned and the grid row grows. Do not add a `col-span`, a `self-` utility or a height clamp to even them up.
- **Tests:** `components/__tests__/media-plate.test.tsx` — add `"frames a portrait document at its own ratio"`: render with `aspect="11/16"` and assert the well carries `aspect-[11/16]`; and add an `11/16` row to whatever aspect table the existing test parameterises, so the union and the map cannot drift apart. If no such test file exists, create it following `components/__tests__/case-card.test.tsx`'s conventions and cover the three aspects plus the `hasFailed` alt-text fallback.
- **Done when:** `pnpm test components/__tests__/media-plate.test.tsx` green, `pnpm exec tsc --noEmit` clean, and a manual open of the Electrolux dialog at 1440 and at 390 shows the signature block — capture both to `evidence/electrolux-dialog-run2.png` and say so in `STATUS.md`. Advances **AC15**, **AC18**.

---

### T25 — Re-verify the batch end to end

- **Files:** none expected.
- **Depends on:** T20–T24
- **Reuse:** T19's checklist.
- **What to build:** rerun T19's eight checks **in order**, plus two more:
  9. `node .agents/tools/check-reduced-motion.mjs` — exits `0`.
  10. open each of the four case dialogs at 1440 and 390, light and dark, and confirm the heading ladder from T23 and the Electrolux plate from T24 by eye; the screenshots go to `evidence/`.

  Record the coverage numbers again. Coverage must stay at or above the 97.99% statements / 97.65% functions recorded in run 1 — T23 deletes no covered branch and T20 changes only class strings, so a drop means a new test is missing, not that the baseline moved.
- **Tests:** the whole suite.
- **Done when:** all ten checks pass and the numbers are in `STATUS.md` — advances **AC15**, **AC16**, **AC18**, **AC19**, **AC20**, **AC21**, **AC22**.

---

## Commit grouping — run 2

| Commit | Tasks | Suggested subject |
|---|---|---|
| 10 | T20 | `fix(a11y): raise light-theme contrast on the badge, live pill and clock` |
| 11 | T21–T22 | `fix(a11y): make the dialog honour prefers-reduced-motion` |
| 12 | T23 | `fix(a11y): repair the heading ladder inside the case dialog` |
| 13 | T24 | `fix(cases): show the whole occupational-health report` |

T25 produces no diff of its own.

## Risks — run 2

| Risk | Signal it happened |
|---|---|
| The `!` important modifier in T21 is written Tailwind-4 style (`animate-none!`) and silently compiles to nothing. | `check-reduced-motion.mjs` still reports `animationName=enter`. This repo is Tailwind **3** (`package.json:46`) — the `!` goes **before** the utility, after the variant: `motion-reduce:!animate-none`. |
| T22's probe is written so it can never fail — wrong selector, or the click silently misses and the target never appears. | It exits `0` against the broken tree too. The task requires proving the failing run; a probe that passes on a stashed, unfixed tree is worthless and must be fixed before T21 is accepted. |
| T20 is over-applied: someone sweeps every `text-emerald-400` in the repo to keep the greens consistent. | `git diff --stat` shows `interactive-terminal.tsx`, `project-card.tsx` or `architecture-beam.tsx` in the run-2 diff. Those render on dark surfaces, `axe-core` did not flag them, and changing them is unrequested scope. |
| T23's heading swap breaks a test that queried a dialog heading by `level`. | `pnpm test` reports a `getByRole("heading", { level: 4 })` miss. No current test does this (checked), so a failure here means a test was written against the old ladder during this run — fix the test, not the ladder. |
| T24's taller plate makes the evidence gallery look unbalanced and someone "fixes" it with a height clamp. | The Electrolux report plate is cropped again, by a different mechanism. The whole point of the task is that this image is portrait; an even grid row is not worth the signature block. |
| The contrast fix is applied to the badge's `bg-primary/10` instead of its text, to get a bigger ratio margin. | `git diff` shows a background or opacity change in `hero-section.tsx:124`. That **is** a design decision and it is not authorised — text only. |

---

## Run 3 — audit bounce (G5, bounce 2 of 2)

`reports/qa.md` **passou** (run 2), com um achado menor sobre o próprio probe. `reports/audit.md` **rejeitou** (run 2) com dois blockers novos, ambos em superfícies que nenhum gate jamais exercitou. **Esta é a última chance deste gate: uma terceira rejeição para o pipeline e vai para o humano (`AGENTS.md` §4.3).** Por isso as tarefas abaixo não corrigem só as duas instâncias — elas fecham as duas *classes* e tapam os dois buracos estruturais de ferramenta que deixaram as instâncias passarem.

### Ruling sobre o token do figcaption (Blocker A): autoridade do tech-lead, **não** é ponto de aprovação humana

Medi eu mesmo, em Chromium real (`next dev` na 3111, `@axe-core/playwright` com `.include('[role="dialog"]')`, os 4 dialogs × {1440, 390} × {light, dark} = 16 combinações), lendo também a cadeia de ancestrais com `getComputedStyle`. O diagnóstico do relatório está certo no "onde" e errado no "quanto":

- O fundo compositado **não** tem sangria de translucidez. A cadeia é `SPAN(transparent) → FIGCAPTION(transparent) → FIGURE bg=rgb(225,231,239) opaco`. O `bg-background/95 backdrop-blur-xl` do `DialogContent` fica **abaixo** de uma superfície opaca e não participa.
- A falha é **exatamente 4.23:1**, `#5e6d82` sobre `#e1e7ef`, idêntica nas 8 combinações de **light** (4 dialogs × 2 viewports), e **zero violações em dark** (`#99a2b2` sobre `#1e2029` = 6.31:1, passa). A faixa "1.63:1 – 3.96:1" e as falhas em dark do relatório não se reproduzem; o defeito real é único, determinístico e só em light.
- Além dos dois `<span>` do figcaption, o mesmo par reprova no `<p>` da `note` (dialog iSend) — mesma medição, 4.23:1.

Ratios medidos/calculados (fórmula WCAG 2.1, sRGB, alpha compositado como o browser faz) para os candidatos, contra **as duas superfícies em que `MediaPlate` renderiza** — `bg-muted` (o pior caso) e `bg-card` (o card na página):

| Candidato | light sobre `bg-muted` | light sobre `bg-card` | dark sobre `bg-muted` | dark sobre `bg-card` | Veredito |
|---|---|---|---|---|---|
| `text-muted-foreground` (atual) | **4.23** ✗ | 5.27 ✓ | 6.31 ✓ | 7.15 ✓ | reprova |
| `text-secondary-foreground dark:text-primary` (o par do T20) | 4.82 ✓ | 6.00 ✓ | 5.67 ✓ | 6.42 ✓ | rejeitado — margem de 0.32 e pinta a legenda de azul, violando a *Signal Rarity Rule* do `DESIGN.md` |
| `text-foreground` | 13.25 ✓ | 16.48 ✓ | 14.85 ✓ | 16.82 ✓ | rejeitado — iguala a legenda ao corpo e apaga o degrau tipográfico do AC9 |
| **`text-foreground/70`** (prescrito) | **5.48** ✓ | **6.10** ✓ | **7.90** ✓ | **8.65** ✓ | **escolhido** |
| `text-foreground/65` | 4.70 ✓ | 5.17 ✓ | 6.98 ✓ | 7.54 ✓ | rejeitado — margem de 0.20 sobre o piso |

`text-foreground/70` é o token `--foreground` já declarado (`app/globals.css:8` / `.dark` `:41`) com o modificador de opacidade que este repo já usa em toda parte (`text-foreground/70` literalmente já existe em `components/molecules/mobile-nav-item.tsx:24`). **Nenhuma variável de `app/globals.css` muda, nenhuma entrada de `tailwind.config.ts` muda, `DESIGN.md` não é emendado** — a legenda continua sendo "Telemetry Slate Text" em papel, mais escura o bastante para o piso AA. Provado ao vivo antes de prescrever: injetei `color: hsl(0 0% 12% / 0.7)` (e a contraparte dark) via `addStyleTag` nas mesmas 16 combinações e o axe passou de 1 violação `color-contrast` por dialog em light para **0 em light e 0 em dark**.

### Ruling sobre a classe do Blocker B: varredura por medição, não por inspeção

O elemento do `hero-section.tsx:166` é uma instância. A classe é: *qualquer* utilitário `hover:`/`group-hover:` de transform pareado apenas com um `motion-reduce:transform-none` pelado, que perde a disputa de especificidade (`0-2-0` vs `0-1-0`) exatamente enquanto o elemento está sob o cursor. Enumerei a classe a partir do DOM vivo (as classes Tailwind estão no `class` do elemento): **128 elementos** carregam um transform de hover/focus, **118 sem nenhum `motion-reduce:`**, resolvendo para **24 sítios de origem**, listados no T29. Medi a correção no elemento do blocker antes de prescrever: `transform: none` em repouso → `matrix(1,0,0,1,0,-2)` no hover hoje; com `motion-reduce:hover:translate-y-0` adicionado em runtime, `matrix(1,0,0,1,0,0)` no hover. A variante composta vence porque o Tailwind emite `motion-reduce` depois de `hover` na mesma layer, com especificidade igual.

`active:scale-*` fica **fora** de escopo deliberadamente: é feedback de pressão, momentâneo, não é movimento de interface não solicitado, o auditor não o apontou, e `case-card.tsx:44` já mostra o padrão (`motion-reduce:active:scale-100`) para quem quiser no futuro. Registrado em `STATUS.md`.

### O que deixou os dois passarem, e como fica fechado

| Buraco | Consequência | Fechado por |
|---|---|---|
| `preview.mjs` nunca abre um dialog — o axe só vê a primeira pintura | nenhum gate jamais rodou axe dentro de um `CaseDialog`; Blocker A viveu dois runs | **T26** |
| `axe` devolve `incomplete` (não `violation`) para texto sobre ancestrais translúcidos — o mesmo figcaption **no card** nunca apareceu no `report.json` | falhas reais viram silêncio | **T26** (grava `incomplete` de `color-contrast` no `report.json`) |
| `check-reduced-motion.mjs` tem `--trigger`/`--target` fixos em um dialog e checa dois elementos | estruturalmente incapaz de ver Blocker B | **T28** |
| o mesmo probe chama `process.exit(1)` dentro do `try`, antes do `finally` | vaza browser e dev server (achado menor do `qa-engineer`) | **T28** |

---

### T26 — `preview.mjs` roda axe com cada case dialog aberto, e grava os `incomplete`

- **Files:** `.agents/tools/preview.mjs` — edit
- **Depends on:** none
- **Reuse:** o próprio laço `routes × VIEWPORTS × THEMES` do arquivo, o `AxeBuilder` já importado (`preview.mjs:12`) e o seletor de trigger que o `check-reduced-motion.mjs` já usa por default: `#projects article button`. Não crie um script novo, não extraia helpers, não mude a assinatura da CLI.
- **What to build:** dentro do laço existente, **depois** do `axe` de página e antes do `context.close()`:
  1. `const triggers = page.locator('#projects article button')`; `const count = await triggers.count()`.
  2. Para `i` de `0` a `count - 1`: `await triggers.nth(i).click()`; `await page.locator('[role="dialog"]').waitFor({ state: 'visible' })`; `await page.waitForTimeout(400)` (deixa a animação de entrada assentar); rode `new AxeBuilder({ page }).include('[role="dialog"]').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze()`; empurre o resultado; `await page.keyboard.press('Escape')`; `await page.locator('[role="dialog"]').waitFor({ state: 'hidden' })`.
  3. Grave em `report.pages[].dialogs` — um array de `{ index, axeViolations }`, com `axeViolations` na **mesma forma** que o de página (`id`, `impact`, `help`, `nodes`, `targets`), mais `ratios: v.nodes.map(n => n.any?.[0]?.data?.contrastRatio ?? null)` quando `v.id === 'color-contrast'`. A chave `axeViolations` de página não muda de forma — o acréscimo é aditivo e nenhum consumidor existente quebra.
  4. Acrescente, **tanto na página quanto em cada dialog**, `contrastIncomplete: axe.incomplete.filter(v => v.id === 'color-contrast').map(v => ({ nodes: v.nodes.length, targets: v.nodes.slice(0,5).map(n => n.target.join(' ')) }))`. O axe devolve `incomplete` quando não consegue resolver o fundo por trás de um ancestral translúcido — foi assim que o mesmo figcaption, no card, nunca apareceu em nenhum `report.json`. `incomplete` é informativo: **não** entra no `process.exit`.
  5. O `process.exit` final passa a considerar também as violações de dialog: `const violations = report.pages.flatMap(p => [...p.axeViolations, ...p.dialogs.flatMap(d => d.axeViolations)])`. As duas linhas de `console.log` de resumo passam a imprimir, por combinação, `dialogs: N violações` e `contrast incomplete: N`.
  6. Nada mais muda: viewports, temas, screenshots, `consoleErrors`, headings, `imagesMissingAlt` ficam idênticos.
- **Tests:** nenhum. A ferramenta é o teste; não escreva wrapper Vitest (mesma regra do T22).
- **Done when:** `node .agents/tools/preview.mjs --out .specs/0100-engineering-proof-redesign/evidence-run3` **executado antes do T27** sai com código `1` e o `report.json` mostra, em **light** (1440 e 390) e em todos os 4 dialogs, entradas `color-contrast` com `ratios` contendo `4.23`; em dark, zero. Cole essa saída no `STATUS.md`: é o "falha antes" exigido pela lição 002. Fecha o buraco de gate que deixou o Blocker A passar dois runs.

---

### T27 — `MediaPlate`: legenda, nota e fallback acima do piso AA (AC22)

- **Files:**
  - `components/molecules/media-plate.tsx` — edit
  - `components/__tests__/media-plate.test.tsx` — edit
- **Depends on:** T26
- **Reuse:** o token `--foreground` já declarado em `app/globals.css:8` (`.dark` em `:41`), exposto como `text-foreground`; o modificador `/70` já em uso em `components/molecules/mobile-nav-item.tsx:24`. Sem variável nova, sem classe nova, sem `dark:` variante — o par funciona nos dois temas.
- **What to build:** três substituições de classe, nada mais. **Não** toque em background, borda, opacidade, `aspect`, `object-*` nem no `<Image>`.
  1. `media-plate.tsx:59` — o fallback de imagem quebrada: `text-muted-foreground` → `text-foreground/70`.
  2. `media-plate.tsx:77` — o `<figcaption>`: `text-muted-foreground` → `text-foreground/70`. O resto da string (`mt-2 flex items-center justify-between border-t border-border/60 pt-2 font-mono text-[11px] font-medium`) fica igual.
  3. `media-plate.tsx:82` — o `<p>` da `note`: `text-muted-foreground` → `text-foreground/70`.
- **Deliberadamente fora de escopo:** os badges `bg-muted/60 … text-muted-foreground` em `case-dialog.tsx:32,109`, `case-card.tsx:70,99,109`, `project-card.tsx:152`, `architecture-beam.tsx:157`. Medi os quatro dialogs nas 16 combinações: **o axe não reprova nenhum deles** (o `/60` sobre `bg-card`/`bg-background` sobe o fundo o bastante). Mudar o que o gate não apontou é escopo que ninguém pediu — mesma regra do T20. O T26 passa a vigiá-los para sempre.
- **Tests:** `components/__tests__/media-plate.test.tsx` — acrescente `"mantém legenda, nota e fallback no foreground AA-safe"`: renderize com `note="n"` e assert que o `<figcaption>` e o `<p>` da nota têm `toHaveClass("text-foreground/70")` e `not.toHaveClass("text-muted-foreground")`; force o fallback (dispare `error` no `<img>`, como o teste do `hasFailed` já faz) e faça a mesma asserção no `<span>`. **Não** tente afirmar contraste em jsdom — jsdom não computa cor; a prova real é o passo 1 de "Done when" (lição 002).
- **Done when:**
  1. `node .agents/tools/preview.mjs --out .specs/0100-engineering-proof-redesign/evidence-run3` sai `0` e o `report.json` traz **zero** entradas `color-contrast` em `pages[].axeViolations` **e** em `pages[].dialogs[].axeViolations`, nas 4 combinações — o mesmo comando que saía `1` no T26;
  2. `pnpm test components/__tests__/media-plate.test.tsx` verde;
  3. `grep -n "text-muted-foreground" components/molecules/media-plate.tsx` não retorna nada.

  Avança **AC22**.

---

### T28 — O probe de reduced-motion passa a enumerar a classe, não uma instância

- **Files:** `.agents/tools/check-reduced-motion.mjs` — edit
- **Depends on:** none
- **Reuse:** o próprio arquivo — `arg()`, `waitForServer()`, `isUp()`, o bloco de spawn e o contexto `reducedMotion: 'reduce'` ficam como estão. Mantenha **intacta** a checagem de `animationName` do dialog (T22): ela é o guarda de regressão do T21 e não pode sair.
- **What to build:** o probe ganha uma segunda fase, genérica, e para de vazar processos.
  1. **Correção do achado do `qa-engineer` (linhas 69–72):** o `process.exit(1)` do "the reduced-motion context did not apply" está dentro do `try`, antes do `finally`, e mata o node com o browser e o dev server vivos. Troque por `exitCode = 1` + `throw new Error('the reduced-motion context did not apply')` — ou por um `console.log` + `exitCode = 1` seguido de um early-return do bloco. A regra: **nenhum `process.exit` antes do `finally`**; o único `process.exit(exitCode)` é o último statement do arquivo, como já é. Varra o arquivo: não pode sobrar nenhum outro.
  2. **Fase 2 — enumeração a partir do DOM vivo.** As classes Tailwind estão literalmente no atributo `class`, então a lista de candidatos não precisa ser mantida à mão. Dentro do mesmo contexto `reducedMotion: 'reduce'`:
     ```js
     const CANDIDATE = /(?:^|\s)((?:group-)?(?:hover|focus|focus-visible|focus-within|group-focus-within):-?(?:translate|scale|rotate|skew)[^\s]*)/g
     ```
     `page.evaluate` percorre `document.querySelectorAll('*')`, casa `CANDIDATE` contra `typeof el.className === 'string' ? el.className : ''`, e devolve, para cada acerto, um identificador estável: `{ utils, signature }` onde `signature` é a string de classe inteira (serve para o dev achar o sítio de origem com `grep`). Marque cada elemento com `el.setAttribute('data-rm-probe', String(i))` na mesma passada, para o Playwright poder endereçá-lo depois por `[data-rm-probe="i"]`.
     Para cada candidato, em série: leia `getComputedStyle(el).transform` em repouso; depois `hover` no **gatilho correto** — o próprio elemento quando o utilitário é `hover:`/`focus*:`, e `el.closest('[class*="group"]')` quando é `group-hover:`/`group-focus-within:` (o probe resolve isso no browser e devolve o `data-rm-probe` do gatilho); espere `250ms`; releia `transform`. **Falha = os dois valores diferem.** Elementos fora da viewport: role até eles com `scrollIntoViewIfNeeded()` antes; se ainda assim não forem visíveis ou não forem hoveráveis, imprima `skip <signature>` e **conte os skips no resumo** — um probe que pula em silêncio é o mesmo buraco de novo.
  3. **Fase 3 — repetir a fase 2 com um dialog aberto.** Depois da checagem de `animationName`, com o dialog ainda visível, rode a mesma enumeração restrita a `[role="dialog"] *` (pega o botão de fechar do `dialog.tsx:51` e as plates, que não existem no DOM com o dialog fechado). Feche com `Escape` ao final.
  4. **Saída:** uma linha por elemento, `ok|FAIL|skip <utils> <primeiros 60 chars da signature> rest=<transform> hover=<transform>`, e um resumo final `N ok, N FAIL, N skip`. Qualquer `FAIL` → `exitCode = 1`. Sem framework, sem fixtures, sem arquivo de report.
  5. Mantenha as flags atuais e seus defaults. Acrescente apenas `--only-dialog` (pula a fase 2) para quem quiser um run curto; sem ela, roda tudo.
- **Tests:** nenhum. O script é o teste.
- **Done when:** rodado **antes do T29**, contra a árvore atual, o probe sai `1` e a lista de `FAIL` inclui `hover:-translate-y-0.5` com a signature do `hero-section.tsx:166` (`group cursor-default select-none py-2 …`), com `rest=none hover=matrix(1, 0, 0, 1, 0, -2)` — o valor que eu mesmo medi. Cole a saída completa no `STATUS.md`: ela é, ao mesmo tempo, o "falha antes" da lição 002 e a lista de trabalho do T29. Nenhum processo `chromium` ou `next dev` fica vivo depois (`pgrep -f "next dev -p 3100"` vazio). Avança **AC16** e fecha o buraco de gate que deixou o Blocker B passar.

---

### T29 — Neutralizar o transform sob `prefers-reduced-motion` em toda a classe, não só no hero

- **Files:** edit, nesta ordem —
  - `components/organisms/hero-section.tsx` (linhas 94, 154, **166**)
  - `components/atoms/logo.tsx` (13)
  - `components/atoms/language-toggle.tsx` (27)
  - `components/ui/dialog.tsx` (51)
  - `components/molecules/architecture-beam.tsx` (148, 164)
  - `components/molecules/case-card.tsx` (122)
  - `components/molecules/contact-method.tsx` (14)
  - `components/molecules/interactive-terminal.tsx` (254)
  - `components/molecules/project-card.tsx` (88, 96)
  - `components/molecules/skill-card.tsx` (10, 12)
  - `components/organisms/experience-section.tsx` (149, 286)
  - `components/organisms/footer.tsx` (51)
  - `components/organisms/skills-section.tsx` (31, 33, 47, 49, 63, 66)
  - `components/__tests__/hero-section.test.tsx` — edit
- **Depends on:** T28
- **Reuse:** o padrão que este repo **já** acertou em `components/molecules/case-card.tsx:44` e `components/molecules/career-phase-card.tsx:48` — a variante composta, com a mesma especificidade da regra de hover. Não invente utilitário, não escreva CSS em `globals.css`, não use `!important`, não introduza `useReducedMotion()` em nenhum destes arquivos.
- **What to build:** em cada sítio, **acrescente** o neutralizador composto ao final da string de classe. Não remova nenhum `motion-reduce:transform-none` existente (ele cobre o estado de repouso) e não altere nenhuma outra classe. O mapeamento é mecânico e não admite julgamento:

  | Utilitário presente | Acrescente |
  |---|---|
  | `hover:-translate-y-*` / `hover:translate-y-*` | `motion-reduce:hover:translate-y-0` |
  | `hover:translate-x-*` | `motion-reduce:hover:translate-x-0` |
  | `group-hover:translate-x-*` | `motion-reduce:group-hover:translate-x-0` |
  | `group-hover:-translate-y-*` / `group-hover:translate-y-*` | `motion-reduce:group-hover:translate-y-0` |
  | `hover:scale-*` | `motion-reduce:hover:scale-100` |
  | `group-hover:scale-*` | `motion-reduce:group-hover:scale-100` |
  | `group-hover:rotate-*` | `motion-reduce:group-hover:rotate-0` |
  | `focus-visible:*`/`focus-within:*` de transform, se o T28 apontar algum | mesma regra, trocando o prefixo |

  Sítios já corretos, **não** mexa: `case-card.tsx:44` e `career-phase-card.tsx:48` (ambos já compõem `motion-reduce:hover:translate-y-0`).
- **Deliberadamente fora de escopo:** `active:scale-*` (`button.tsx:8`, `dialog.tsx:51`, `case-card.tsx:44`, `project-card.tsx:164,176`, `hero-section.tsx:182,189,197`, `interactive-terminal.tsx:254`, `skill-card.tsx:10`). É feedback de pressão momentâneo, o auditor não o apontou, e o probe do T28 não o mede. Registrado em `STATUS.md` como candidato de follow-up.
- **Tests:** `components/__tests__/hero-section.test.tsx` — acrescente `"neutraliza o deslocamento das células de credencial sob reduced motion"`: renderize, pegue o container da célula de credencial pelo seu `<dt>`/`<dd>` acessível, e assert `toHaveClass("motion-reduce:transform-none", "motion-reduce:hover:translate-y-0")`. Esse teste sozinho **não** fecha a tarefa — é uma asserção de presença de classe em jsdom, exatamente o que a lição 002 diz não provar nada. A prova é o "Done when" 1. Não escreva o mesmo teste para os outros 21 sítios: seriam 21 asserções vazias; o probe cobre todos de uma vez.
- **Done when:**
  1. `node .agents/tools/check-reduced-motion.mjs` sai `0`, com `0 FAIL` no resumo e o mesmo número de elementos enumerados do run do T28 (se o total cair, algum elemento sumiu do DOM e a correção está errada);
  2. `pnpm test components/__tests__/hero-section.test.tsx` verde;
  3. `pnpm build` limpo e `pnpm exec tsc --noEmit` limpo;
  4. `git diff --stat` lista **exatamente** os arquivos acima e nada mais.

  Avança **AC16** e `design.md` § Motion.

---

### T30 — Re-verificar o lote inteiro

- **Files:** nenhum esperado.
- **Depends on:** T26–T29
- **Reuse:** a checklist do T25, sem cortes.
- **What to build:** rode os dez passos do T25 e mais três:
  11. `node .agents/tools/preview.mjs --out .specs/0100-engineering-proof-redesign/evidence-run3` — sai `0`, zero `color-contrast` em página **e** em dialog, nas 4 combinações; registre também quantos `contrastIncomplete` sobraram (informativo, não bloqueia).
  12. `node .agents/tools/check-reduced-motion.mjs` — sai `0`, `0 FAIL`, e registre `N ok / N skip`. **Todo `skip` precisa de uma linha de justificativa no `STATUS.md`** dizendo por que aquele elemento não pôde ser medido.
  13. `pgrep -f "next dev"` vazio depois de cada um dos dois — o vazamento do achado menor do `qa-engineer` não pode voltar por outra porta.

  A cobertura tem de ficar em ou acima de 97.99% statements / 97.65% functions. Nenhuma tarefa deste run remove ramo coberto.
- **Tests:** a suíte inteira.
- **Done when:** os treze passos passam e os números estão no `STATUS.md`, com as saídas "antes" (T26, T28) e "depois" coladas lado a lado. Avança **AC15**, **AC16**, **AC18**, **AC19**, **AC20**, **AC21**, **AC22**.

---

## Commit grouping — run 3

| Commit | Tasks | Suggested subject |
|---|---|---|
| 14 | T26 | `chore(gates): run axe inside every case dialog` |
| 15 | T27 | `fix(a11y): raise the media plate caption above the AA floor` |
| 16 | T28 | `chore(gates): probe reduced motion across every hover transform` |
| 17 | T29 | `fix(a11y): neutralise hover transforms under reduced motion` |

T30 não produz diff.

## Risks — run 3

| Risco | Sinal de que aconteceu |
|---|---|
| O T27 é feito antes do T26 e ninguém consegue provar que o defeito existia. | Não há saída "falha antes" no `STATUS.md`. A ordem T26 → T27 é o ponto inteiro da tarefa; sem o run que sai `1`, o T27 é indistinguível de uma mudança cosmética — e é literalmente a lição 002. |
| `text-foreground/70` é escrito como `text-foreground/[0.7]` ou vira um `dark:` par desnecessário. | `grep "text-foreground/70"` não casa nos três pontos, ou o diff traz uma variante `dark:`. O par serve aos dois temas (7.90:1 em dark); uma variante `dark:` só adiciona superfície para divergir. |
| O T29 vira uma varredura cega: alguém adiciona `motion-reduce:*` em todo lugar, inclusive em `active:`, e quebra o feedback de pressão. | `git diff --stat` traz `button.tsx` ou mais arquivos que os 15 listados. A lista de arquivos do T29 é fechada; ela veio de medição, não de intuição. |
| Alguém "resolve" o T29 com uma regra global em `globals.css` do tipo `*:hover { transform: none !important }`. | O `DialogContent` salta para o canto quando o cursor entra nele — ele depende de `translate-x-[-50%] translate-y-[-50%]` estáticos. Foi exatamente por isso que a regra global foi rejeitada aqui; a variante composta é cirúrgica. |
| O probe do T28 fica verde por pular tudo. | `N ok` pequeno e `N skip` grande. O resumo existe para isso; o T30 exige justificar cada `skip` por escrito. |
| O axe dentro do dialog fica instável (clica antes da animação assentar, mede durante o fade). | Violações que aparecem e somem entre runs. O `waitForTimeout(400)` depois de `waitFor({ state: 'visible' })` é obrigatório, não decorativo. |
| O `report.json` muda de forma e quebra quem já o lê. | O `qa-engineer` ou o auditor reclamam de campo ausente. O acréscimo é **aditivo**: `pages[].axeViolations` fica idêntico; `dialogs` e `contrastIncomplete` são chaves novas. |
