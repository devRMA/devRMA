# 0100 — release report

> Owner: release-manager · Gate: `docs` (G6) passed, run 1 · Gate: `release` (G7) pending

## Docs gate (G6)

**Verdict:** `passed`

### Mechanical pass

```
$ node .agents/tools/docs-check.mjs 0100-engineering-proof-redesign
  ok    AGENTS.md presente
  ok    CLAUDE.md presente
  ok    PRODUCT.md presente
  ok    DESIGN.md presente
  ok    README.md presente
  ok    9 agents com symlinks íntegros
  ok    memória íntegra (6 lições ativas)
  ok    2 spec(s) consistentes
  aviso spec 0100-engineering-proof-redesign/design.md: ainda contém placeholders do template
  aviso spec 0100-engineering-proof-redesign/plan.md: ainda contém placeholders do template

0 falha(s), 2 aviso(s)
```

The two warnings are false positives of the script's placeholder heuristic (`/<[A-Za-z][^>\n]{6,}>/`), which cannot distinguish an unfilled `<PLACEHOLDER>` from JSX/HTML inside a code sample. Checked every match by hand: `<engineering headline>` (a genuine slot-name description, not a template gap), `<figcaption>`, `<HeroSection />`, `<CasePlate, "altKey" | "aspect">`, and similar JSX/type snippets quoted in `design.md`/`plan.md`'s own worked examples. No real placeholder remains in either file. **0 failures — the gate is not blocked.**

### Editorial pass — what I reconciled

1. **Numbering (`0002` → `0100`).** Already fully consistent before I started: every heading in `spec.md`, `design.md`, `copy.md`, `plan.md`, `STATUS.md`, both reports, and `INDEX.md` reads `0100`; `grep -rn "0002" .specs/` returns nothing. The folder rename to `0100-engineering-proof-redesign` was already complete. **Not fixed, flagged for the record:** `.agents/tools/spec.mjs` still assigns sequentially from `0001` and will collide with the `0001-0099`/`0100+` convention in `.specs/README.md` again on the next feature spec — left untouched per the human's standing instruction not to change agent tooling beyond what this spec required.

2. **`PRODUCT.md` § Evidence on Hand — three contradictions fixed**, all three flagged by the product-manager at G1 and recorded in `spec.md` § H:
   - Removed the `data/certificates.tsx` line (the certificates feature is gone end to end — confirmed by the T19/T25/T30 regression greps in `STATUS.md`, all clean).
   - Retired "1,100+ routes" as the iSend headline framing; iSend is now described as a legacy Laravel/PHP TMS stabilised and made observable (structured logging, tracing, CI quality gates) — matching `locales/en.ts`'s and `locales/pt-BR.ts`'s own case copy, where the route count survives only as descriptive prose inside the schematic caption, never as a badge or metric.
   - Added Adam Robo A1 and Adam 4.0 @ Electrolux as first-class evidence entries, worded from the shipped `locales/en.ts` case copy so nothing is invented.
   - `spec.md` § H annotated with a completion note pointing to this reconciliation.

3. **`DESIGN.md` — one real system-level correction, plus one addition.** `design.md`'s own G2 ruling ("System change: none") is accurate about tokens and colour — verified every value in the diff traces to an existing token or class, nothing new in `app/globals.css` or `tailwind.config.ts`. But the root `DESIGN.md` still described the *pre-spec* case-study layout ("3-column breakdown … Challenge, Architecture, Result"), which this spec's own G2 decision explicitly replaced ("stacked rows at every width, never a 3-column grid" — `STATUS.md` § Decisions log, Run 1, product-designer). Corrected that line. Also added `MediaPlate` ("the specimen plate") as a named signature component alongside the existing Telemetry Bento & Architecture Beam entry: it is a genuine reusable pattern — identical bezel/caption treatment across all four case cards and every image in every detail dialog — not a one-off value, which is exactly the docs-integrity skill's own test for what belongs in `DESIGN.md`.

4. **`README.md` corrected** — "certificates" removed from the highlights bullet and the `data/` structure comment (the whole feature was removed this spec); replaced with an accurate one-line description of the four production case studies actually shipped.

5. **Two open findings from `reports/qa.md` (run 4).**
   - **Site count, "22" → "24":** fixed everywhere it stated the T29 edit-site count as settled fact — `plan.md`'s own Run 3 ruling section, and `STATUS.md`'s triage table (bounce 2 of 2) and decisions-log entries. Left deliberately untouched: the qa run-3/run-4 write-ups' own sentences that already correctly explain "not 22, but 24" (accurate as written), and one further "22" in `STATUS.md` § Verification (T30 — run 3) describing the T28 before-fix live-DOM `FAIL` enumeration — per `reports/qa.md` run 4's own resolution this is a distinct, correct measurement ("also 22, but a different measurement" from the source-edit-site count), not the same miscount, so it stays 22 with a note explaining why.
   - **`process.kill(-server.pid)` unguarded in `finally`:** left open as a recorded follow-up, not fixed. 15 clean runs across qa run 4 and the auditor's own re-verification showed it dormant (graceful ~1–2s shutdown, zero orphans, zero `ESRCH`), and `.agents/tools/` code changes beyond what this spec's gates required are outside this gate's scope.

6. **Verified qa run 4's correction to the record is legible, not just asserted** (the specific risk flagged for this docs gate). `reports/qa.md` leads with "Owner: qa-engineer · Run: 4" and its first heading is "Correction to the record — run 3's three blockers were contamination artefacts, not defects" — a reader hitting the top of the file gets the true state immediately, before the superseded run-3 write-up further down in the same file. `STATUS.md`'s gate table already marks run 3 `qa` as `rejected (contamination artefact, not a genuine bounce)`, not a bare rejection. Confirmed sound; no change needed.

7. **Lessons — reviewed via `node .agents/tools/lesson.mjs list`.** 6 active, all `confirmed: 0` — none due for promotion (cap is 3 confirmations; well under the index cap of 30 lessons). Read all six in full: each states a checkable, imperative rule an agent who was not on this spec could apply tomorrow (a slot-inventory diff at G2, a real-browser standard for any CSS override fighting a library's own state styles, restating context-dependent properties on component relocation, exercising every interactive state a spec delivers before declaring a gate green, pairing every hover transform with a same-specificity `motion-reduce:` neutraliser, never mutating a shared working tree mid-diagnostic) — none is an incident diary entry. No promotion action taken this cycle.

8. **Rebuild-contract chain verified reproducible.** `assets/build-webp.py` derives all 9 shipped `public/projects/*.webp` files from 8 of the 11 committed `assets/screenshots/*.png` sources plus the pre-existing `public/app-iship.png`. Cross-checked output filenames against `public/projects/` byte for byte — all 9 present, all names match the script's `DERIVATIVES` list exactly, all ≤300 KB (16.6–149.2 KB). The 3 unused screenshots (`a1-home-desktop.png`, `a1-home-mobile.png`, `a1-test-setup-mobile.png`) are the deliberate exclusions the product-designer's own G2 decisions already explain (value-proposition framing excluded by AC9; OQ4's 2-of-4 mobile-capture default) — nothing orphaned or unexplained.

9. **`evidence/` gitignore and stray-binary check.** `.specs/*/evidence/` was already ignored, but a scratch folder the qa-engineer produced under a non-standard name, `.specs/0100-engineering-proof-redesign/evidence-qa2/` (3.8 MB of PNGs + `report.json`), was untracked and **not** covered by that exact-match pattern. Widened `.gitignore` to add `.specs/*/evidence-*/` (kept the original exact line so `docs-check.mjs`'s literal-match check still passes — re-ran the script after the edit to confirm). `git status --porcelain --ignored=matching` shows no `.env`, credential, key, or other secret-shaped file anywhere in the tree, and no unexpectedly large binary outside the reviewed `public/projects/*.webp` and `.specs/*/assets/screenshots/*.png` (source material, already accounted for above).

### Files edited at this gate, and why

| File | Why |
|---|---|
| `PRODUCT.md` | Reconciled § Evidence on Hand — certificates removed, "1,100+ routes" retired, A1/Electrolux added (item 2 above) |
| `DESIGN.md` | Corrected the stale 3-column case-layout claim; added `MediaPlate` as a signature component (item 3) |
| `README.md` | Removed "certificates" from highlights and the `data/` structure line (item 4) |
| `.gitignore` | Added `.specs/*/evidence-*/` so the qa-engineer's non-standard scratch folder is ignored (item 9) |
| `.specs/0100-engineering-proof-redesign/spec.md` | Annotated § H with a completion note confirming the three `PRODUCT.md` contradictions were reconciled here |
| `.specs/0100-engineering-proof-redesign/plan.md` | Fixed the "22 sítios de origem" ruling-section miscount to 24 (item 5) |
| `.specs/0100-engineering-proof-redesign/STATUS.md` | Fixed the same miscount everywhere it appeared as settled fact; added the docs gate to the header, the gate table, and this run's decisions-log entries; left the two legitimate "22" survivors explained in place |
| `.specs/INDEX.md` | Holder updated to `release-manager` for G7 |

### Go/no-go for G7

**Go.** The docs gate passed with zero blocking findings after the reconciliations above. Proceeding to stage and commit locally, grouped by coherent context, per `AGENTS.md` §10. Push, PR creation, and CI remain a human-approval point — not started without explicit approval.

---

## Release (G7)

**Pending.** Filled in after commits are staged and grouped, and again after the human approves push/PR/CI.
