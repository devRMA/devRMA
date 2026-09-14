# 0100 — Design

> Owner: product-designer · Gate: `design`

This brief is binding on the `tech-lead` and the `frontend-dev`. Every value here is either an existing `DESIGN.md` token, an existing Tailwind class already used in this repository, or a number derived from a source file. **System change: none.** Nothing below requires a new token, a new colour, or a change to the type ramp.

The `content-writer` owns every string. Where a string is needed, this document names a **slot**, its content type, its length budget and its priority — never the words.

---

## References

Benchmarked live, not from memory. Each row names the specific technique taken and whether it survives a ten-second read.

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| **rauchg.com** (Guillermo Rauch) | Zero imagery, zero chrome: every entry is a line of type plus exactly one quantitative anchor (the view count). The metric next to an item is chosen because it signals authority, never because it decorates. | Transfers directly to the hero correction. The failure the spec describes — "14 certifications" — is a decorative metric. Rauch's page proves an engineering-leadership reader accepts a *sparse* set of signals as long as each one is load-bearing. Our hero drops to three credentials, all load-bearing. |
| **linear.app** | Product captures are shown with rounded corners, a soft inset and **no heavy border**, rendered in their native theme with minimal decorative treatment; the screenshot behaves as an artifact embedded in the page, not as a hero banner. Feature blocks run headline → 1–2 sentence body → `Learn more →`. | Two things transfer. (1) The capture is subordinate to the headline above it — exactly the AC9 requirement that the engineering problem outrank the product name. (2) Never re-theme a capture to match the page; frame it instead. Linear ships light UI on a light page; we ship light UI on a dark page, so the frame has to do more work — see **The specimen plate** below. |
| **brianlovin.com** | Side projects are listed as *name + one clause*, with no imagery at all, sitting below the writing. Subordination is achieved by position and by density, not by shrinking. | This is the AC17 answer for the open-source strip. It stays textual and dense beneath the four production cases; we do not add imagery to it to "balance" the page. |
| **emcasestudies.com** (Engineering Management Case Studies) | Every entry is framed by the *situation and the decision*, and the company appears as context after the problem is stated. | The exact grammar of AC9. On our case cards the engineering problem is the `h3`; the system name and client are a 12px mono line underneath. |
| Screenshot-tooling practice (`screenhance`, `playmockup`) | Documented rule: keep the capture in its native theme and add a **tonal band of padding around it** so it reads as an embedded artifact rather than a hole punched in the page. | This is the whole solution to the light-captures-on-a-dark-page problem, and it is the reason the frame is a neutral `bg-muted` bezel rather than a dark or a light one. |

---

## The specimen plate — how all eleven captures are presented

This is the central problem the brief names, so it is decided once and applied everywhere. There is exactly **one** media frame in this feature, used identically by all four cases and by every image in every detail view.

**Considered and rejected**

1. *Full-bleed capture inside the card.* A 3840×2002 light screenshot at 604px wide in a dark card is the glare rectangle. Rejected.
2. *CSS-darkening the light captures (`brightness`, `invert`, a dark overlay) so they match the page.* Rejected on truth grounds: the reader would be looking at a UI that does not exist. The spec exists to stop exactly that class of misrepresentation.
3. *A macOS-style window chrome with traffic lights and an address bar.* Rejected: AC13 forbids fabricated hostnames, and a chrome strip with three coloured dots is a simulated browser — the same failure at a smaller scale. It also fails AC12 by making the iSend schematic look captured.
4. *Different frames for light captures and dark captures.* Rejected: it destroys the structural symmetry AC8 requires and doubles the component surface.

**Chosen: a neutral-tone bezel with a figure caption.**

```
┌─ outer: rounded-xl border border-border/70 bg-muted p-2 ───────┐
│  ┌─ inner: rounded-lg overflow-hidden ring-1 ring-border/60 ─┐ │
│  │                                                           │ │
│  │   the capture, aspect-[16/10], object-cover object-top    │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│  ── caption strip: mono 11px, border-t border-border/60 ──────  │
│  [source-kind slot]                                   [year]    │
└─────────────────────────────────────────────────────────────────┘
```

Why it works for both polarities without special-casing: `bg-muted` sits **between** the two extremes in both themes. In dark it is `hsl(228 16% 14%)` — lighter than the page (`6%`) and the card (`9%`), darker than a `#f9f9f9` A1 capture, and one step off the `#1e1e1e` Electrolux card. In light it is `hsl(214 32% 91%)` — darker than the white card and the light capture, much lighter than the dark Electrolux capture. So in all four combinations the eye crosses **two** 8px steps instead of one hard cut, and the `ring-border/60` keeps the dark Electrolux capture from dissolving into the dark bezel. One frame, four combinations, no branch.

Glare control at rest, fidelity on demand: in **dark theme only**, the inner image wrapper rests at `dark:opacity-90` and returns to `opacity-100` on `group-hover` and `group-focus-within`, 200ms `ease-out-expo`. Light theme never dims. This is a rest-state attenuation of a visual, not a re-colouring of the UI, and full fidelity is one hover or one Tab away. No filter, no invert, no overlay.

The caption strip sits **below** the image, inside the bezel. Below reads as a figure caption; above reads as fake window chrome. Left slot = the source kind (writer: one word, ≤10 chars, "capture" / "diagram"). Right = the year, taken from `data/experience.tsx`, rendered `font-mono` — factual, not invented, and it is what makes the iSend tile self-declare as a diagram (AC12).

---

## Hierarchy

- **1s** — the `h1`: *Rafael Martins Alves* / the role line in `text-primary`. Nothing on the page competes with it. The four case cards are below the fold at 1440 and cannot steal the first second.
- **5s** — the hero credential strip (three cells: years / education / scope), then the three trajectory phase cards, read left to right, `01 → 02 → 03`, with emphasis escalating from muted to primary. The ascent is legible before any product name appears.
- **30s** — the four case cards. Each one gives the engineering problem as its largest element; the system name, client and stack are the second read; the detail dialog is the third.

The page order (hero → experience → projects → skills → contact, per AC6) means an evaluator meets the engineer, then the ascent, then the evidence. No product name appears above the fold.

---

## Layout

### Desktop (1440)

Container unchanged: `.container-page` (`max-w-7xl px-4 md:px-6`) → 1232px of content at 1440.

**Hero** — unchanged two-column grid (`md:grid-cols-2`, photo `md:order-last`). The only structural change is the metric strip, below.

**Hero credential strip** — replaces the current numeric `dl`. Outer wrapper unchanged (`rounded-2xl border border-border/70 bg-card/30 p-1.5 backdrop-blur-xl`). Inner: `grid grid-cols-1 divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0 rounded-xl bg-card/50 p-3.5 border border-border/40`. Three cells, **identical shape**:

```
dt  mono uppercase 11px text-muted-foreground tracking-[0.025em]   ← the label
dd  text-base font-semibold text-foreground leading-tight          ← the value
    mono 11px text-muted-foreground                                ← the caption
```

*Considered:* keeping the big `text-3xl font-mono` treatment for the years cell only. **Rejected** — one oversized number beside two text cells re-creates exactly the vanity-metric read the spec is deleting, and it visually ranks "5" above "Tech Lead". All three cells are typographically equal; `CounterNumber` is retained but now animates inside a `text-base` `dd`, so the count-up survives without the scoreboard.

**Trajectory phases** — three cards in `grid gap-4 md:grid-cols-3`, placed where the current single `progression` pill sits, i.e. between `SectionHeading` and the tabs. Each card `flex h-full flex-col rounded-xl border bg-card/50 p-5 backdrop-blur-xl`, so the anchor-chip row bottom-aligns across all three regardless of body length.

Between the phase grid and the tabs: `mt-10 mb-6 flex items-center gap-3` → mono 11px uppercase caption slot + `h-px flex-1 bg-border/60`. This is the *exact* divider idiom already used for `projects.openSourceTitle`; reusing it tells the reader the tabs are the verification layer under the summary, at zero new cost.

**Cases** — `grid gap-6 lg:grid-cols-2`. Four cards, 2×2, each ~604px wide. Below the four, `mt-16 border-t border-border/60 pt-10`, then the existing open-source divider heading and the existing `ProjectCard` grid at `grid gap-4 sm:grid-cols-2 xl:grid-cols-4`.

**Detail dialog** — `max-w-3xl` (768px), `max-h-[90dvh]`, `grid grid-rows-[auto_1fr] overflow-hidden`. Row 1 is a non-scrolling sticky header; row 2 is the scroll container. This is what keeps the close button from scrolling away once `p-0` is applied.

### Mobile (390)

Content width 390 − 32 (`px-4`) = 358px.

**Hero credential strip** — one column, three stacked rows separated by `divide-y`. The current `grid-cols-3` truncates all three mono labels at 390; with the new text values it would be unreadable. Stacking is not optional.

**Trajectory phases** — `grid-cols-1 gap-3`, identical card anatomy, full width. The `01/02/03` index plus the year range keeps the ascent legible vertically.

**Cases** — one column, `gap-4`. The media well stays `aspect-[16/10]`; at 358px that is 224px tall, which still resolves the A1 Snellen rows and the Electrolux verdict labels at the crops specified below.

**Detail dialog** — `w-[calc(100%-2rem)]` (existing primitive), `max-h-[90dvh]`. The evidence gallery drops to one column except the pair of 9:16 mobile plates, which stay side by side at `grid-cols-2` because two portrait plates are the point of that row.

### Reflow

| Breakpoint | What changes |
|---|---|
| `<640` (`sm`) | Hero strip stacked; case grid 1-col; evidence gallery 1-col; open-source grid 1-col; pillar rows full width. |
| `≥640` (`sm`) | Hero strip → 3 columns with `divide-x`; evidence gallery → 2 columns; open-source grid → 2 columns. |
| `≥768` (`md`) | Trajectory phases → 3 columns. Hero → 2 columns (existing). |
| `≥1024` (`lg`) | **Case grid → 2 columns.** Deliberately `lg` and not `md`: at 768 a two-up case card is ~360px wide, which crushes a 16:10 plate plus a two-line headline plus three body lines into an unreadable column. Single column from 640 to 1023 is the correct answer, not a compromise. |
| `≥1280` (`xl`) | Open-source grid → 4 columns (subordination by density). |

---

## Components

| Component | Level | Status | Path |
|---|---|---|---|
| `HeroSection` | organism | **extend** — credential strip replaces numeric `dl`; `ScrollIndicator` target moves from `skills` to `experience` | `components/organisms/hero-section.tsx` |
| `CounterNumber` | atom | **reuse** — now inside a `text-base` `dd` | `components/atoms/counter-number.tsx` |
| `SectionHeading` | atom | **reuse** — unchanged on all sections | `components/atoms/section-heading.tsx` |
| `ScrollIndicator` | atom | **reuse** — new `targetId` + new label key | `components/atoms/scroll-indicator.tsx` |
| `CareerPhaseCard` | **molecule** | **new** — one trajectory phase | `components/molecules/career-phase-card.tsx` |
| `ExperienceSection` | organism | **extend** — the `progression` pill is replaced by the phase grid + divider; tabs and timeline untouched | `components/organisms/experience-section.tsx` |
| `MediaPlate` | **molecule** | **new** — the specimen plate: bezel + ring + image + caption strip. Used by every case card and every detail image. Accepts `src`/`alt`/`aspect`/`sizes`/`kindSlot`/`year`/`variant: "capture" \| "diagram"`; in `diagram` mode it renders `children` instead of an `Image` and switches the outer border to `border-dashed` | `components/molecules/media-plate.tsx` |
| `CaseSchematic` | **molecule** | **new** — the iSend diagram. Static inline SVG line art, no `Image`, no chrome | `components/molecules/case-schematic.tsx` |
| `CaseCard` | **molecule** | **new** — the four-case card, identical for all four | `components/molecules/case-card.tsx` |
| `CasePillar` | **molecule** | **new** — one of the three stacked pillars in the dialog (icon + mono title + prose) | `components/molecules/case-pillar.tsx` |
| `CaseDialog` | organism | **new** — the detail view | `components/organisms/case-dialog.tsx` |
| `Dialog*` | ui | **extend** — `DialogContent` close button grows to `h-11 w-11 sm:h-9 sm:w-9` for the 44px touch target. Safe: the only current consumer (`certificates-section`) is deleted by this spec, so `CaseDialog` is the sole consumer | `components/ui/dialog.tsx` |
| `ArchitectureBeam` | molecule | **reuse, relocated** — moves out of `ProjectsSection` into the *architecture* pillar of the **iShip** dialog only. Add the missing `motion-reduce:animate-none` on the dashed beam line | `components/molecules/architecture-beam.tsx` |
| `Badge` | ui | **reuse** — tech chips, all four cases, neutral variant only | `components/ui/badge.tsx` |
| `Card`, `Button`, `Tabs` | ui | **reuse** — unchanged | `components/ui/*` |
| `ProjectCard` | molecule | **reuse, untouched** — the open-source strip keeps its current design and its 3D tilt | `components/molecules/project-card.tsx` |
| `ProjectsSection` | organism | **extend** — the two bespoke inline case blocks are deleted and replaced by the `CaseCard` grid + `CaseDialog` | `components/organisms/projects-section.tsx` |
| `CertificateCard`, `CertificatesSection` | molecule / organism | **delete** (AC1/AC2) | — |

**Reuse note for the tech-lead.** The three-pillar block, the mono tech chip, the `h-px flex-1 bg-border/60` divider and the mono status pill all already exist inline in `projects-section.tsx`. `CasePillar` and the chip styling are *extractions* of existing markup, not inventions. Nothing new is designed where something existed.

---

### Case card anatomy — identical for all four (AC8)

Order top to bottom. Every field is present on every case; none is optional.

1. **Media well** — `MediaPlate`, `aspect-[16/10]`. iShip / A1 / Electrolux = `variant="capture"`. iSend = `variant="diagram"` wrapping `CaseSchematic`.
2. **Role badge** — `inline-flex items-center rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground`. Content = Rafael's position + period, from `data/experience.tsx`. **All four badges are neutral.** No per-case accent colour: the current blue-iShip / amber-iSend split is deleted, because a coloured badge is extra weight and AC8 requires equal weight.
3. **Headline — the engineering challenge.** `h3`, `text-lg md:text-xl font-semibold leading-snug tracking-tight text-foreground text-balance`. This is the largest text in the card and the accessible name of the card's trigger.
4. **System line.** `font-mono text-xs text-muted-foreground truncate`. This is where *iShip*, *iSend*, *Adam A1*, *Adam 4.0 @ Electrolux* live — one line, below the headline, at 12px muted mono.
5. **Body.** `text-sm text-muted-foreground leading-relaxed line-clamp-3`.
6. **Tech chips.** Up to 5 + a `+N` overflow chip. `Badge variant="outline"` with `border-border/80 bg-muted/60 font-mono text-xs text-muted-foreground`. Neutral for all four.
7. **Footer.** `mt-auto border-t border-border/50 pt-4`, mono 12px `text-primary` + `ArrowRight h-3.5 w-3.5`. **Decorative, `aria-hidden="true"`** — see the trigger pattern below.

**How the challenge outranks the product name (AC9), measured.** Headline 20px / weight 600 / `text-foreground`; system line 12px / weight 400 / `text-muted-foreground` / monospace. That is a **1.67× size ratio, a weight step, a colour-contrast step and a reading-order step** — four independent signals, all in the same direction. A reader skimming at 10s reads twenty-pixel semibold foreground text and nothing else.

**Structural symmetry with different imagery (OQ5).** Symmetry is carried by (a) the identical seven-row anatomy, (b) the identical `MediaPlate` at the identical `16/10`, (c) the identical bezel tokens, (d) the identical neutral badge and chip colours, (e) the identical trigger and hover behaviour. The *only* permitted divergence is the plate's border style — solid for a capture, dashed for the diagram — and that divergence is not decoration, it is the AC12 signal.

**The trigger — stretched link.** The card is `relative`; the `h3` contains a `DialogTrigger asChild` `<button>` whose text is the headline and which carries `after:absolute after:inset-0 after:rounded-2xl after:content-['']`. Result: one focusable element per card, whole-card hit area, accessible name = the engineering headline, no nested interactive elements. Focus ring is drawn on the pseudo-element: `focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-offset-2 focus-visible:after:ring-offset-background`.

---

### The iSend schematic (AC12)

`CaseSchematic` is a static inline `<svg>` with `role="img"` and an `<title>` fed from a locale slot. It is **line art only**:

- Four nodes in a row, each a `rounded-md` rectangle drawn with `stroke-width="1"`, `stroke-dasharray="4 3"`, `stroke="hsl(var(--border))"`, **no fill**.
- Node labels in `font-mono`, 11px, `fill="hsl(var(--muted-foreground))"` — four slots from the writer, ≤14 chars each.
- Connecting edges: 1px solid `hsl(var(--border))` with a small triangular arrowhead; exactly **one** edge uses `hsl(var(--primary))` — the one the case's headline is about. One accent, Signal Rarity Rule intact.
- No fills, no gradients, no window chrome, no traffic lights, no address bar, no status pill, no fake telemetry numbers. The entire existing "telemetry HUD" block in `projects-section.tsx` — dark panel, three traffic-light dots, `telemetryUrl`, `activeRoutesBadge` — is **deleted**, not adapted. It is the simulated interface AC12 forbids and the `activeRoutesBadge` is the retired "1,100+ routes" boast.

Three independent signals tell a reader this is drawn, not captured: dashed frame, dashed unfilled node strokes, and the caption strip's kind slot. Below `sm` the four nodes reflow to a 2×2 arrangement inside the same `16/10` viewBox — the SVG uses a fixed `viewBox` and two `<g>` layouts toggled by a `hidden sm:block` / `sm:hidden` pair, so no JS and no layout measurement.

---

### Case detail dialog

`DialogContent className="max-w-3xl p-0 gap-0 max-h-[90dvh] grid grid-rows-[auto_1fr] overflow-hidden"`.

**Row 1 — header (does not scroll).** `border-b border-border/60 bg-background/95 px-5 py-4 backdrop-blur-xl pr-16`:
- role badge (same neutral pill as the card)
- `DialogTitle` = the engineering headline, `text-xl md:text-2xl font-semibold tracking-tight`
- `DialogDescription` = the system line, `font-mono text-xs text-muted-foreground`

**Row 2 — body (`overflow-y-auto p-5 space-y-8`), in this order:**

1. **Primary visual** — `MediaPlate`, `aspect-[16/10]`, full dialog width, same treatment as the card. iSend shows `CaseSchematic` again at the larger size.
2. **Three pillars** — `space-y-4`, **stacked rows at every width**, never a 3-column grid. At 768px the dialog body is ~700px, so a `text-sm` prose line runs ~70ch, honouring the 70ch Prose Rule. Three columns at that width would be 210px each, and AC15 requires these pillars to carry real content (60–90 words), not the 25-word stubs they carry today. Each pillar: `rounded-lg border border-border/60 bg-card/50 p-4`; head row = icon + `font-mono text-xs font-bold uppercase tracking-wider`; body = `text-sm text-muted-foreground leading-relaxed max-w-prose`.
   - Pillar 1 **Problem** — `Activity`, `text-amber-400` (dark) / `text-amber-600` (light)
   - Pillar 2 **Architecture & trade-offs** — `Cpu`, `text-cyan-400` / `text-cyan-700`
   - Pillar 3 **Outcome & leadership** — `CheckCircle2`, `text-emerald-400` / `text-emerald-700`
   - These three accents are already the established telemetry trio in this codebase and DESIGN.md sanctions them "contextually"; they appear one per pillar on an icon only, never simultaneously on a surface, so the clash rule holds. The light-theme shades are the AA-safe counterparts — see **Tokens**.
3. **`ArchitectureBeam` — iShip only**, rendered immediately after pillar 2's prose, inside pillar 2. This satisfies AC15 (diagram lives in the detail view) and removes it from the page.
4. **Technology set** — `border-t border-border/60 pt-5`; mono uppercase 11px label slot + the **full** chip list (no `+N` truncation here).
5. **Evidence gallery** — present only where extra plates exist. `grid gap-3 sm:grid-cols-2` of `MediaPlate`s. The nested mobile-plate row is `grid grid-cols-2 gap-3` at every width.
   - iShip: none. iSend: none. A1: setup, completed, + the two 9:16 mobile plates (OQ4 — optional, detail view only). Electrolux: Ishihara plates, occupational-health report.
   - **Empty state:** when a case has no extra plates the whole section — heading included — is not rendered. No placeholder, no "no images available", no empty grid.

**Keyboard and focus (AC16)** — delivered by the Radix primitive, which already traps focus, closes on `Esc`, restores focus to the trigger, sets `aria-modal` and marks the rest inert. Requirements on top of it:
- `DialogContent` gets `aria-labelledby` wired to `DialogTitle` (Radix default) so the announced name is the engineering headline.
- The close control is the primitive's, enlarged to `h-11 w-11 sm:h-9 sm:w-9`. It is the first tabbable element after the content; the header reserves `pr-16` so it never overlaps the title at 390.
- Tab order inside: close → (body has no interactive content) → back to close. The dialog contains **no links and no buttons other than close**; A1 and Electrolux have no public URL and inventing one would breach AC13.
- The body scroll container gets `tabIndex={0}` and `role="group"` with an `aria-label` slot so a keyboard user can scroll it without a pointer. Without this a long dialog with a single focusable element is unscrollable by keyboard.

---

## Tokens

Only `DESIGN.md` tokens and the Tailwind semantic classes that map to them. No raw hex anywhere.

| Use | Token / class | Dark | Light |
|---|---|---|---|
| Page canvas | `bg-background` | `#090b10` | `#f7f9fc` |
| Card surface | `bg-card/50`–`bg-card/70` + `backdrop-blur-xl` | `#12151d` | `#ffffff` |
| Plate bezel | `bg-muted` | `hsl(228 16% 14%)` | `hsl(214 32% 91%)` |
| Plate outer border | `border-border/70` | `#272c38` | `#a3b8cc` |
| Plate inner ring | `ring-border/60` | `#272c38` | `#a3b8cc` |
| Caption strip text | `text-muted-foreground` `font-mono text-[11px]` | `#97a3b3` | `#5f6d7e` |
| Headline | `text-foreground` `text-lg md:text-xl font-semibold` | `#f1f5f9` | `#1f1f1f` |
| System line / body | `text-muted-foreground` | `#97a3b3` | `#5f6d7e` |
| Role badge | `border-border/70 bg-muted/60 text-muted-foreground` | — | — |
| Tech chip | `border-border/80 bg-muted/60 text-muted-foreground font-mono text-xs` | — | — |
| Phase 1 accent | `border-border/70` + `text-muted-foreground` | — | — |
| Phase 2 accent | `border-border` + `text-foreground` | — | — |
| Phase 3 accent | `border-primary/40 bg-primary/5` + `text-primary` | `#0ea5e9` | `#0b63eb` |
| Card trigger affordance | `text-primary` | `#0ea5e9` | `#0b63eb` |
| Focus ring | `ring-ring` + `ring-offset-background` | `#0ea5e9` | `#0b63eb` |
| Pillar 1 icon | `text-amber-400 dark:text-amber-400` / light `text-amber-600` | `#fbbf24` | `#d97706` |
| Pillar 2 icon | `text-cyan-700 dark:text-cyan-400` | `#22d3ee` | `#0e7490` |
| Pillar 3 icon | `text-emerald-700 dark:text-emerald-400` | `#34d399` | `#047857` |
| Radii | `rounded-2xl` cards / `rounded-xl` plate outer / `rounded-lg` plate inner / `rounded-full` pills | per `DESIGN.md` § Shapes | same |
| Spacing rhythm | `gap-3` (390) · `gap-4` phases · `gap-6` cases · `p-5` card · `p-2` bezel · `py-20 md:py-28` section | `DESIGN.md` § spacing | same |
| Easing | `ease-out-expo` = `cubic-bezier(0.23, 1, 0.32, 1)` | — | — |

**Phase identity without new tokens.** The three phases are distinguished by an *escalation of emphasis within one hue family*, not by three different accent colours. Phase 1 muted, phase 2 foreground, phase 3 primary. Three side-by-side accents (cyan / indigo / amber) was considered and rejected: DESIGN.md's clash rule forbids it, and it would make the earliest phase as loud as the current one — the opposite of the ascent the section exists to show.

---

## States

| Element | default | hover | focus-visible | active | disabled | loading | empty | error |
|---|---|---|---|---|---|---|---|---|
| **Case card** | `border-border/70 bg-card/60`, plate image `dark:opacity-90` | `border-primary/40`, `-translate-y-1`, `shadow-xl`, plate image `opacity-100`, footer arrow `translate-x-0.5` | ring on the trigger's `after` pseudo-element: `ring-2 ring-ring ring-offset-2 ring-offset-background`; identical visual to hover | `scale-[0.99]` | n/a — never disabled | plate shows the `bg-muted` bezel with the inner area at `bg-muted/60` until `onLoad`; no spinner | n/a — all four cases always have a visual | if the image fails, the plate keeps the bezel and renders the `alt` text centred at `text-xs text-muted-foreground`; the card stays fully functional |
| **Plate caption strip** | `text-muted-foreground` | unchanged | unchanged | unchanged | — | — | — | — |
| **Role badge / tech chip** | `border-border/70 bg-muted/60` | inherits the card hover only (no own hover — not interactive) | — | — | — | — | overflow chip `+N` only when >5 | — |
| **Phase card** | per-phase emphasis, `border`/`text` as in Tokens | `-translate-y-0.5`, border steps up one level (`/70 → /100`, primary `/40 → /60`) | n/a — not interactive | — | — | — | — | — |
| **Dialog trigger (`h3` button)** | text `text-foreground` | `text-foreground` (colour unchanged; the *card* reacts, not the text — keeps the headline from flickering) | as Case card | — | — | — | — | — |
| **Dialog overlay** | `bg-black/80 backdrop-blur-sm` | — | — | — | — | — | — | — |
| **Dialog close** | `opacity-70`, `h-11 w-11 sm:h-9 sm:w-9` | `opacity-100 scale-105` | `ring-2 ring-ring ring-offset-2` | `scale-95` | — | — | — | — |
| **Dialog body scroll region** | `overflow-y-auto`, `tabIndex={0}` | — | `ring-1 ring-ring ring-inset` when focused by keyboard | — | — | — | — | — |
| **Evidence gallery** | 2-col grid | plate image `opacity-100` per plate | per-plate ring if the plate is ever made interactive (it is not in this spec) | — | — | as Case card | **section not rendered at all** | as Case card |
| **Hero credential cell** | as Tokens | `-translate-y-0.5`, `dd` → `text-primary` | n/a — not interactive | — | — | `CounterNumber` animates from 0 on mount | n/a | n/a |
| **`CaseSchematic`** | dashed strokes at `border`, one `primary` edge | no hover state — it is a figure, not a control | — | — | — | n/a (inline SVG, no network) | n/a | n/a |

Both themes apply to every row. Where a class has no `dark:` prefix it is resolving a semantic token that already carries both values.

---

## Motion

Everything uses the house easing `cubic-bezier(0.23, 1, 0.32, 1)` (`ease-out-expo`). There are **no springs** in this feature: the only spring in the codebase is the `ProjectCard` 3D tilt (`{ damping: 22, stiffness: 240 }`), which is untouched and does not spread to the case cards. A springy case card would read as playful; PRODUCT.md's voice is not playful.

| Element | Trigger | Property | Duration | Easing | Reduced-motion fallback |
|---|---|---|---|---|---|
| Phase card entrance | `whileInView`, `once: true` | `opacity 0→1`, `y 16→0` | 400ms, stagger 60ms by index | `ease-out-expo` | `y` is dropped, `opacity 0→1` at 150ms, stagger 0. The reveal still happens — it does not become "no animation", it becomes a cross-fade. |
| Case card entrance | `whileInView`, `once: true` | `opacity 0→1`, `y 16→0` | 400ms, stagger 60ms | `ease-out-expo` | same as above |
| Case card hover lift | pointer enter | `translateY 0→-4px`, `box-shadow`, `border-color` | 180ms | `ease-out-expo` | `motion-reduce:transform-none` — the lift is suppressed; **the border-colour and shadow change are kept**, so the card still confirms hover. |
| Case card press | pointer down / `:active` | `scale 1→0.99` | 120ms | `ease-out-expo` | suppressed (`motion-reduce:scale-100`); focus/hover styling still confirms the press target |
| Plate glare release | `group-hover` / `group-focus-within`, dark theme only | `opacity 0.90→1` | 200ms | `ease-out-expo` | **kept.** Opacity is not a vestibular trigger and removing it would leave reduced-motion users permanently on the dimmed capture. |
| Footer arrow nudge | card hover | `translateX 0→2px` | 180ms | `ease-out-expo` | suppressed |
| Dialog open | trigger activate | `fade-in-0`, `zoom-in-95`, `slide-in-from-top-[48%]` (tailwindcss-animate, existing) | 200ms | `ease-out` (primitive) | `motion-reduce:animate-none` on both `DialogOverlay` and `DialogContent` → the dialog appears instantly. Focus trap, `Esc` and focus restoration are unaffected. |
| Dialog close | `Esc` / close / overlay | `fade-out-0`, `zoom-out-95` | 200ms | `ease-out` | `motion-reduce:animate-none` |
| `ArchitectureBeam` packet dots | always (in the iShip dialog) | SVG `cx` 0→100%, `opacity` | 4s loop | linear | already `motion-reduce:hidden` — the dots disappear, the static beam line and the four nodes remain |
| `ArchitectureBeam` dashed beam | always | `stroke-dashoffset` | 20s loop | linear | **currently missing** — add `motion-reduce:animate-none`; degrades to a static dashed line |
| `ArchitectureBeam` node entrance | mount | `opacity`, `y 16→0`, stagger 80ms | 300ms | `ease-out-expo` | `y` dropped, opacity-only, stagger 0 |
| `CounterNumber` in the hero | mount | numeric count-up | existing | existing | existing component behaviour is preserved; if it does not already honour `prefers-reduced-motion` it must render the final value immediately |
| Phase hover | pointer enter | `translateY 0→-2px`, `border-color` | 180ms | `ease-out-expo` | `motion-reduce:transform-none`, border change kept |

Implementation note for the developer: gate the framer-motion variants with `useReducedMotion()` from `framer-motion` (already a dependency) rather than duplicating variant objects; use the Tailwind `motion-reduce:` variant for the CSS-only transitions. Both paths must be covered by tests (AC20).

---

## Accessibility intent

**Contrast pairs verified (WCAG AA, both themes).** Ratios computed against the actual token values.

| Pair | Dark | Light |
|---|---|---|
| `foreground` on `card` | `#f1f5f9` on `#12151d` ≈ **16.9:1** | `#1f1f1f` on `#ffffff` ≈ **16.1:1** |
| `muted-foreground` on `card` | `#97a3b3` on `#12151d` ≈ **7.4:1** | `#5f6d7e` on `#ffffff` ≈ **5.3:1** |
| `muted-foreground` on the `muted` bezel (caption strip) | `#97a3b3` on `#1e222b` ≈ **6.5:1** | `#5f6d7e` on `#dfe5ec` ≈ **4.6:1** |
| `primary` on `card` | `#0ea5e9` on `#12151d` ≈ **6.4:1** | `#0b63eb` on `#ffffff` ≈ **5.6:1** |
| Pillar icon amber | `#fbbf24` on `#12151d` ≈ **10.6:1** | `#d97706` on `#ffffff` ≈ **3.6:1** — icon only, non-text, passes the 3:1 non-text threshold; the pillar title next to it is `text-foreground`, never the accent |
| Pillar icon cyan | `#22d3ee` on `#12151d` ≈ **10.4:1** | `#0e7490` on `#ffffff` ≈ **5.3:1** |
| Pillar icon emerald | `#34d399` on `#12151d` ≈ **9.8:1** | `#047857` on `#ffffff` ≈ **5.4:1** |

Two binding consequences: **(1)** the caption strip is the tightest pair in the system at 4.6:1 in light theme — it must stay at `text-muted-foreground` with no opacity modifier and no smaller than 11px `font-medium`. `text-muted-foreground/70` on the bezel would fail. **(2)** Pillar accent colours are used on icons only; pillar titles are `text-foreground`.

**Focus order.** Page: skip link → header → nav (5 items) → hero CTAs → ScrollIndicator → phase cards (non-interactive, skipped) → experience tabs → each case card's single trigger, in DOM order iShip → iSend → A1 → Electrolux → open-source cards → skills → contact. Inside the dialog: close → body scroll region → close (trapped). On close, focus returns to the originating card trigger — verified by test per AC16.

**Touch targets (≥44×44).** Case card trigger = the full card (≥358×~430 at 390). Dialog close = `h-11 w-11` below `sm`. Hero credential cells and plates are non-interactive and exempt. Tech chips are non-interactive. Nothing in this feature ships a target below 44px on mobile.

**What a screen reader announces.**
- Each case card: `"<engineering headline>, button"`. The system name, role badge, body and chips follow in DOM order as ordinary content. The product name is never the accessible name.
- Each plate: `<figure>` with the image's `alt` and the caption strip as `<figcaption>`. Per AC11 the `alt` slot must describe **the system's function and Rafael's authorship** and must not merely name the company — this is a copy constraint, enforced below.
- The `CaseSchematic`: `role="img"` with an `<title>` that says it is a diagram, so a non-sighted reader gets the same AC12 signal a sighted one gets from the dashed frame.
- Dialog: announced as a modal named by the engineering headline, described by the system line.
- Phase cards: an ordered list (`<ol>`), so `01/02/03` is conveyed structurally and not only visually.
- The hero credential strip stays a `<dl>`; each cell is `<dt>` label + `<dd>` value, so the pairing survives linearisation.
- Decorative: the footer arrow row, the plate bezel, and the schematic's edges are all `aria-hidden`.

**Language.** Per AC14 the captures are pt-BR product UI and are never translated or re-shot. Every plate's `alt` and every caption slot is localised, so an English reader gets the meaning of the frame in English without needing to read the pixels. No case's comprehension may depend on text inside an image — the designer's part of that contract is that the plate is never the only carrier of a fact; the pillars always state it in prose.

---

## Copy constraints

The writer never sees the rendered layout, so every slot that can break it is budgeted. Lengths are the **longer** of the two locales; pt-BR runs ~15–20% longer than en, so budget against pt-BR.

| Slot | Max length | Lines at 1440 / 390 |
|---|---|---|
| Hero credential label (`dt`) ×3 | 18 chars | 1 / 1 — mono uppercase, must not wrap |
| Hero credential value (`dd`) ×3 | 26 chars | 1 / 1 at 16px semibold in a ~380px cell |
| Hero credential caption ×3 | 34 chars | 1–2 / 1–2 |
| Hero education slot (cell 2) | value = course name ≤26 chars; caption = institution + status ≤34 chars | **OQ1 binding:** the value names the course, the caption names the institution and the in-progress status. Never a completed-degree title. |
| Phase title ×3 | 34 chars | 1–2 / 1–2 |
| Phase body ×3 | 140 chars | ≤3 / ≤4 |
| Phase anchor chips | 2–3 chips, ≤18 chars each | 1 row / ≤2 rows |
| Trajectory divider caption | 24 chars | 1 / 1 |
| Case role badge ×4 | 30 chars | 1 / 1 — must not wrap the pill |
| **Case headline ×4** | **72 chars** | **≤2 lines at 1440 (604px card, 20px semibold), ≤3 at 390.** A 73rd character pushes a third line at 1440 and breaks the 2×2 grid's vertical rhythm. |
| Case system line ×4 | 40 chars | 1 / 1 — `truncate`, so anything longer is silently cut |
| Case body ×4 | 180 chars | ≤3 / ≤3 (`line-clamp-3`) |
| Plate kind slot | 10 chars | 1 / 1 |
| Plate `alt` (×10) | 120 chars | AC11: names the system's function **and** Rafael's authorship; does not merely name the company |
| Dialog title (= case headline) | reuses the 72-char headline | ≤2 / ≤3 |
| Pillar title ×3 per case | 26 chars | 1 / 1 — mono uppercase |
| Pillar body ×3 per case | 60–90 words (~600 chars) | free-flowing, `max-w-prose` |
| Technology-set label | 24 chars | 1 / 1 |
| Evidence-gallery label | 24 chars | 1 / 1 |
| `CaseSchematic` node labels ×4 | 14 chars | 1 / 1 — inside a fixed SVG box, no wrapping is possible |
| `CaseSchematic` `<title>` | 100 chars | must state that it is a diagram |
| Dialog scroll-region `aria-label` | 40 chars | — |

**Truth constraints inherited by the copy.** No hostname or URL anywhere (AC13) — the plate caption carries a kind word and a year, nothing else. No quantitative claim on the A1 case (OQ2). "Electrolux" appears as engineering context only (OQ3). No case headline is a product value proposition (AC9).

---

## Asset spec table

Sources are `.specs/0100-engineering-proof-redesign/assets/screenshots/*.png`. Crop boxes are `(left, top, right, bottom)` in **source pixel coordinates**. All outputs are WebP at **quality 82, method 6**, written to `public/projects/`. Measured output sizes are from a dry run of exactly these boxes; all are far under the 300 KB cap (AC18).

| # | Source | Crop box (l, t, r, b) | Crop px | Output px | Ratio | Target file | Measured | `sizes` | Priority |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `public/app-iship.png` | none (full 2560×1440) | 2560×1440 | 1280×720 | 16:9 → rendered in a `16/10` plate with `object-cover object-top` | `public/projects/iship-card.webp` | **68 KB** | `(max-width: 1024px) 100vw, 600px` | `loading="lazy"` |
| 2 | `a1-test-acuity-desktop.png` | `(760, 0, 3080, 1450)` | 2320×1450 | 1200×750 | 16:10 | `public/projects/a1-card.webp` | **21 KB** | `(max-width: 1024px) 100vw, 600px` | `loading="lazy"` |
| 3 | `electrolux-acuity-desktop.png` | `(850, 230, 2990, 1567)` | 2140×1337 | 1200×750 | 16:10 | `public/projects/electrolux-card.webp` | **17 KB** | `(max-width: 1024px) 100vw, 600px` | `loading="lazy"` |
| 4 | `a1-test-setup-desktop.png` | `(1180, 700, 2740, 1320)` | 1560×620 | 1248×496 | 2.52:1 | `public/projects/a1-setup.webp` | **22 KB** | `(max-width: 640px) 100vw, 340px` | `loading="lazy"` |
| 5 | `a1-test-completed-desktop.png` | `(1180, 640, 2660, 1380)` | 1480×740 | 1200×600 | 2:1 | `public/projects/a1-completed.webp` | **20 KB** | `(max-width: 640px) 100vw, 340px` | `loading="lazy"` |
| 6 | `a1-test-acuity-mobile.png` | `(0, 0, 825, 1466)` | 825×1466 | 619×1100 | 9:16 | `public/projects/a1-mobile-acuity.webp` | **26 KB** | `(max-width: 640px) 50vw, 170px` | `loading="lazy"` |
| 7 | `a1-test-completed-mobile.png` | `(0, 0, 825, 1466)` | 825×1466 | 619×1100 | 9:16 | `public/projects/a1-mobile-completed.webp` | **35 KB** | `(max-width: 640px) 50vw, 170px` | `loading="lazy"` |
| 8 | `electrolux-color-desktop.png` | `(870, 560, 2970, 1870)` | 2100×1310 | 1280×798 | 16:10 | `public/projects/electrolux-ishihara.webp` | **149 KB** | `(max-width: 640px) 100vw, 340px` | `loading="lazy"` |
| 9 | `electrolux-report-desktop.png` | `(1380, 140, 2470, 1730)` | 1090×1590 | 880×1283 | 0.686:1 | `public/projects/electrolux-report.webp` | **60 KB** | `(max-width: 640px) 100vw, 340px` | `loading="lazy"` |

Reference command (the numbers above were produced with exactly this):

```python
from PIL import Image
Image.open(SRC).convert("RGB").crop(BOX).resize(OUT, Image.LANCZOS) \
     .save(DST, "WEBP", quality=82, method=6)
```

### Why these boxes, and what was rejected

- **#2 A1 card.** The brief's failed "16:9 on the content bounding box" cut the app header. This box starts at `top = 0` so the application header (logo + screen title + the 88% progress bar) is intact, and runs to `y = 1450` — which lands *between* Snellen rows, giving the header, the colour-vision row and four optotype rows at 20/200 → 20/30. `x` is symmetric about the pink test card (200px of margin each side). It is the densest, most clinical frame in the set and it is the right one for the card.
- **#3 Electrolux card.** The naive crop left a dead light-grey band between the nav bar and the dark card. This box drops the nav bar and starts 60px above the dark card, so the dark UI fills ~97% of the frame: all six Snellen rows with their `Alterado`/`Normal` verdicts, plus the observations field. A dark capture that fills its frame is the one image in the set that needs no glare management at all.
- **#8 Electrolux Ishihara.** The brief's attempt cut the title and left an empty band; the band is *inside* the source, between the title and the plates, and cannot be removed without compositing. So the title is dropped deliberately and the crop is the 2×3 plate grid alone, edge to edge on the dark card. The title's information moves into the plate `alt` and the caption, where it belongs. This is the heaviest file in the set at 149 KB — dithered Ishihara noise is worst-case for WebP — and still half the cap.
- **#9 Electrolux report.** The content column is `x ≈ 1426–2422`; the box is `1380–2470` for a 46px gutter each side. `top = 140` starts **below the client header band**: the crop keeps the whole occupational-health document — worker data, anamnesis, the vision and colour tables, the signature block — and does not lead with a 200px-tall client wordmark. AC10 permits a brand mark that occurs naturally inside an unmodified capture, and the Adam Robo mark in the signature block stays; but a client wordmark as the first thing the eye hits is advertising, so it is cropped out by the same criterion that AC10 exists to enforce. `bottom = 1730` stops before the trailing whitespace and the partial button.
- **`a1-home-desktop.png` and `a1-home-mobile.png` are not shipped.** Every crop of that frame is dominated by the product welcome headline "Bem vindo ao **Adam A1**" and a product tagline. That is a value proposition, which is precisely what §F and AC9 exclude, and the only engineering-relevant element (the three test-mode cards) is a 4:1 panoramic strip that fits no plate in this system. The A1 case is fully served by setup → test → result, which is a better story anyway.
- **`a1-test-setup-mobile.png` and `a1-home-mobile.png` are not shipped.** OQ4 makes the mobile captures optional; two are enough to evidence responsive work and four would pad the dialog with 70 KB of redundancy.

### Notes for the tech-lead

- The iShip case reads from `public/projects/iship-card.webp`, not from `public/app-iship.png`. The current inline usage carries `priority` on a below-the-fold image; **remove it** — the hero portrait is the LCP element and should keep its `priority` alone. This is an AC18 improvement, not a regression risk.
- `public/app-iship.png` (1.2 MB) becomes unreferenced once #1 is generated. It is still served from `public/`. Recommendation: move it alongside the other sources under `.specs/0100-engineering-proof-redesign/assets/`. Deleting or moving it is outside this spec's declared scope, so it is flagged in `STATUS.md` rather than done here.
- `public/projects/` does not exist yet and must be created by the build step.

---

## System change

**None.** Every colour, radius, spacing value, easing curve and type step above already exists in `DESIGN.md` or in `tailwind.config.ts`/`app/globals.css`. The two changes to shipped components — `DialogContent`'s close button growing to `h-11 w-11 sm:h-9 sm:w-9`, and `ArchitectureBeam` gaining `motion-reduce:animate-none` — are component fixes that bring the code *into* compliance with `DESIGN.md`'s existing rules (the 44×44 touch-target rule and the `prefers-reduced-motion` rule), not changes to the system.
