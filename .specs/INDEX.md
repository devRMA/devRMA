# Spec index

State: `draft` · `in-progress` · `blocked` · `done` · `rejected`

## Baseline — the portfolio as it exists today

| # | Spec | State | Holder |
|---|---|---|---|
| 0001 | [Foundation — stack, architecture, conventions](0001-foundation/spec.md) | done | — |

## Feature work

| # | Spec | State | Holder |
|---|---|---|---|
| 0100 | [Engineering proof redesign — inverted narrative + real system screenshots](0100-engineering-proof-redesign/spec.md) | done | — |

Shipped 2026-09-13 as PRs #22–#25 (stacked on `portfolio`), preview `https://portfolio-29dys2nqy-devrmas-projects.vercel.app`. Ten gates, two genuine bounces at G5 audit, `ship` at G9. Record in [`0100-engineering-proof-redesign/STATUS.md`](0100-engineering-proof-redesign/STATUS.md).

## Pending — candidates for spec 0101

Named here, not specified. The `product-manager` decides which of these are one spec and which are several; nothing below is committed scope.

**Product — ordered by the evaluation cost each one carries.**

| # | Candidate | Source | Why it matters |
|---|---|---|---|
| P1 | **Surface one trade-off sentence per case on the card face**, replacing the truncated capability description. Card reads: role badge → engineering-problem headline → *the decision and what it cost* → tech pills → open. The dialog keeps the full architecture. | `0100/reports/recruiter.md` § Findings, `major` | The recruiter's single highest-value finding: "the site already contains the sentences that win the interview" and they sit behind a click — "in twenty portfolios I open zero dialogs". The page is optimised for a reader who already decided to dig, which is not the reader spec 0100 names. |
| P2 | **Quantify leadership scope.** Squad size, services or repos owned, operational volume (deliveries, events/day, distribution centres), on-call. Replace or supplement the "5+ anos" hero credential, which is currently the only authority number on the page and appears twice. | `0100/reports/recruiter.md` § Findings, `major` | Read cold: *5 years total, 4 months as lead, scale asserted not measured* invites exactly the seniority doubt 0100 set out to remove. **Gated on sourceable facts** — `PRODUCT.md` § Evidence on Hand must carry the numbers first; inventing one violates `AGENTS.md` §9 and is worse than the current state. If nothing is sourceable, name the surface instead of the volume. |
| P3 | **Restructure the skills section into four engineering domains**, and fold "Quero aprender" into "Estudando" (one forward-looking tab, not two). | `0100/spec.md` scope cut, run 1 `product-manager`; recruiter `minor` | Deferred out of 0100 as a deliberate scope cut. The recruiter separately flagged "Quero aprender" and the live Curitiba clock as junior-coded and as occupying a card slot P2 wants. |
| P4 | **Promote the ascent line to the section heading** — the `h2` becomes "De Jovem Aprendiz a Tech Lead em cinco anos"; the nav label stays "Experiência". | recruiter `minor` | A skimmer reads section titles. The differentiator is currently the second line, one mobile viewport below a generic title. |
| P5 | **Rewrite career phase 01** to lead with "shipping production PHP as a secondary-school apprentice" instead of the SENAI technology inventory. | recruiter `minor` | The ascent currently opens on a syllabus — the one paragraph written from the perspective of someone with nothing to point at. |
| P6 | **Cut personal projects to the one non-archived artefact** (`Python Stopwatch2`), or collapse the section to a single GitHub link. | recruiter `minor` | Two of three are archived; the page's last technical impression is hobby-grade, directly after four production cases. |
| P7 | **Re-render `Pleno` in English by what changed, not by the Brazilian band** ("moved off the junior track"), and add a résumé artefact plus one concrete line naming the direction he is looking for. | recruiter `minor` | "Mid-level" reads as a demotion inside a promotion sentence. The interactive terminal advertises `curl devrma.com/cv` while no CV exists anywhere on the page; contact copy is the site's most generic sentence at its conversion point. |
| P8 | **`aria-hidden` the duplicated track in `case-schematic.tsx`** — the five schematic labels render twice in the text layer. | recruiter `minor`, flagged for the auditor | Screen-reader users get the stack twice. Visually fine. |
| P9 | **Repo-wide contrast sweep**: `text-emerald-400` at `hero-section.tsx:202-203`, `architecture-beam.tsx:93`, `project-card.tsx:113` and throughout `interactive-terminal.tsx`; plus `active:scale-*` at 9 sites with no reduced-motion path (`case-card.tsx:44` shows the pattern). | `0100/STATUS.md` triage, bounces 1 and 2 | `axe-core` flags none of them today — they sit on dark surfaces or in transient states no capture reaches. 0100 deliberately did not sweep them: an unflagged change is scope no gate asked for. A repo-wide green audit is its own spec. |
| P10 | **`app/manifest.ts` still describes "Full Stack Developer"**, and `og:image`/`twitter:image` resolve to the Vercel branch-alias host rather than `metadataBase`'s `https://devrma.com`. | `0100/reports/audit-preview.md` (G8), both `minor`, both pre-existing | Zero diff against `portfolio` — untouched by 0100, so out of its scope by definition, not a regression. |
| P11 | **`public/app-iship.png` (1.2 MB) is unreferenced** after 0100's `ProjectsSection` rewrite. Move under the spec's `assets/` or delete. | `0100/STATUS.md` § Blockers | Deletion outside a spec's declared scope is a human approval point (`AGENTS.md` §4), which is why 0100 left it in place. |
| P12 | **`terminal.cvEducation` and the interactive terminal generally** were out of 0100's scope; only the one degree key was corrected. | `0100/STATUS.md` decisions log, run 1 `content-writer` | Needs its own scope decision before anyone edits it. |

**Squad infrastructure — found during 0100, deliberately not fixed then.**

| # | Candidate | Evidence | Why it was not fixed in 0100 |
|---|---|---|---|
| I1 | **`.agents/tools/spec.mjs` numbers sequentially from `0001`** and assigned `0002` to work that `.specs/README.md` requires to be `0100+` (baseline `0001–0099`, new work `0100+`). The folder was renamed by hand and the rename is invisible to the next agent. | this spec's own folder | The human asked that agent tooling not change beyond what the spec required. Recorded so the next spec does not silently repeat the manual rename — **if you scaffold a spec today, check the number the tool gave you against `.specs/README.md` § Numbering before writing anything into the folder.** |
| I2 | **`.agents/tools/lesson.mjs` derives the next lesson id from the highest file still in `lessons/`**, not from the archive. After this cycle archived 002, 005 and 006, the next `lesson.mjs new` will mint `005` — an id already used and archived. | observed at G10 while retiring three lessons | Same tooling freeze. Ids are the only stable handle a promoted rule has back to its origin; reuse makes the archive unreadable. Lesson 007 was created by hand to avoid the collision. |
| I3 | **`.github/workflows/sonarcloud.yml` triggers `pull_request` only on base `portfolio`**, so a stacked PR whose base is another stack branch receives zero checks and sits with nothing to go green. | `0100/reports/release.md` (G7) | The release-manager worked around it legitimately (close/reopen against a valid base) and flagged it rather than editing CI mid-delivery. A real follow-up: the workflow needs to trigger on the stack branches, or the stack convention needs to account for it. |
| I4 | **`.agents/tools/preview.mjs` and `check-reduced-motion.mjs` call `process.kill(-server.pid)` in `finally` with no `try`/`catch`.** A genuine race — the dev server having already exited — throws uncaught and masks the run's real result. | `0100/reports/qa.md` run 4, `minor` | Dormant, not theoretical: confirmed over 15 clean runs that nothing leaks today. The fix is wrapping the kill. The release-manager does not own `.agents/tools/` changes beyond what a spec's gates required. |
| I5 | **`.agents/tools/docs-check.mjs` reads a spec's gate table and `## Blockers` section as current state**, so a `done` spec cannot keep an honest history: any row whose State cell is exactly `rejected`, and any prose at all under `## Blockers`, fails the gate even when the rejection was fixed three runs ago and the blocker is resolved. | observed at G10 closing 0100 | Same tooling freeze as I1/I2. 0100 worked around it by qualifying the two audit State cells (`rejected (bounce 1 of 2; fixed in run 2)`) and moving the resolved-blocker and triage narrative into an appendix after the decisions log — the record is intact but its shape is now dictated by a regex. The checker should read the *last* run per gate and treat a blocker as open only when it is marked so. |
