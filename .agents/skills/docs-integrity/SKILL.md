---
name: docs-integrity
description: Final documentation gate before any commit or PR. Verifies that every spec artifact is complete and in the right place, that STATUS.md and INDEX.md reflect reality, that the squad memory captured what this cycle learned, and that PRODUCT.md, DESIGN.md and README.md still describe the shipped product. Use at the end of a development cycle, before the release-manager commits.
---

# Documentation integrity gate

Runs at the end of a cycle, **before the first commit** — never after the PR is open. Documentation fixed after review is documentation nobody read.

Two halves: the script checks structure, you check truth. The script cannot tell whether `DESIGN.md` still describes the design.

## 1. Mechanical pass

```bash
node .agents/tools/docs-check.mjs <NNNN-slug>
```

It verifies: the root documents exist and `CLAUDE.md` still delegates to `AGENTS.md`; all nine agents exist with intact symlinks and valid frontmatter; every lesson is indexed, fully written, and under the cap; every spec is registered in `INDEX.md`, has a real `STATUS.md` state, keeps its reports inside `reports/`, and — when marked `done` — actually has every artifact, every gate closed, no pending tasks, and no open blockers; and that `.specs/*/evidence/` is gitignored.

**Any failure blocks the commit.** Fix it, do not annotate it.

## 2. Editorial pass — what the script cannot see

Read and judge each of these. A "yes" needs evidence, not assumption.

**Does `STATUS.md` tell the truth?** Its gate table, task states, and decisions log should match what actually happened, including the bounces. A spec that bounced twice and shows a clean run is a lie the next cycle will inherit — the decisions log is the most valuable thing in the folder, because it is the only record of *why*.

**Are the artifacts still accurate?** `spec.md`, `design.md`, `copy.md` and `plan.md` describe what was *built*, not only what was intended. Where the build deliberately diverged, the artifact says so and says why. An un-reconciled divergence silently breaks the rebuild contract in `.specs/README.md` — the promise that this folder alone could reconstruct the portfolio.

**Did `DESIGN.md` change and not get updated?** New tokens, a new type step, a new motion rule, a new component pattern that will be reused — any of these belongs in `DESIGN.md`. The designer declares system changes in `design.md`; verify each one landed. One-off values that will never be reused do **not** belong there; do not inflate the system with them.

**Did `PRODUCT.md` change and not get updated?** New evidence, a new capability, a shift in positioning. Rare, and it should be — if a routine feature changed the product truth, something upstream went wrong and that is itself the finding.

**Does `README.md` still describe the project honestly?** Check anything it asserts about stack, scripts, or structure that this cycle touched.

**Did this cycle actually learn anything?** Every bounce and every human correction should have produced a lesson in `.agents/memory/`. A cycle with two rejections and zero lessons is the failure this whole system exists to prevent — the cost was paid and nothing was bought with it.

```bash
node .agents/tools/lesson.mjs list
```

Any lesson at `confirmed: 3` must be **promoted now**: move its rule into the relevant `.agents/agents/*.md` (or `AGENTS.md` when cross-cutting), then `lesson.mjs retire <id> "promoted"`. This is what keeps the index readable — the squad's memory should shrink as its instincts improve.

**Are the docs in the right place?** Reports in `reports/`, screenshots in `evidence/`, lessons in `.agents/memory/lessons/`, agent definitions in `.agents/agents/`. Nothing loose in the repository root; no `.md` file invented outside this structure. If a document does not have a home in `AGENTS.md` or `.specs/README.md`, it should not exist.

## 3. Verdict

Write the result into the spec's `STATUS.md` decisions log: what was checked, what was corrected, what was promoted. Then release.

If something is wrong and you cannot fix it within your own authority — a `PRODUCT.md` change, a contested design divergence — stop and raise it. A commit is cheap to delay and expensive to correct.
