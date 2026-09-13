---
id: 001
title: Publish the slot inventory before G2 closes: every named slot in design.md must have a key in copy.md, and every key in copy.md must have a slot
applies-to: product-designer
domain: design
spec: 0100
confirmed: 0
created: 2026-09-12
---

## What happened

`design.md` and `copy.md` for spec 0100 were written in parallel at G2 and both passed. At G3 the plan could not be written from them as-is: `design.md` named three slots the writer never keyed (the media plate's "kind" word, the `ScrollIndicator` label after its target moved section, the trajectory divider caption), and `copy.md` shipped four keys no slot consumes (`projects.case.close`, and three `a1.shots.*` alts for captures the asset table deliberately does not ship). The tech-lead resolved seven design-versus-copy conflicts in a Reconciliation table and derived three strings the `content-writer` owns, which is a role boundary crossed to keep the pipeline moving.

## Why it happened

The two G2 agents run in parallel and neither reads the other's output before its gate closes. Each one is individually correct and complete against `spec.md`: the designer budgets slots the writer cannot see, and the writer keys strings against the spec's acceptance criteria, not against a layout that does not exist yet. Nothing in the gate protocol makes the *intersection* of the two artifacts anyone's responsibility, so the mismatch surfaces one gate downstream, where the only agent who can see both is also the one forbidden from writing copy.

## The rule

End `design.md` with a **slot inventory**: a table of every string slot the design renders, each with its locale key path, its length budget and its content type. End `copy.md` with the same table, filled from the other side. At G2 close, the orchestrator diffs the two lists - a slot with no key, or a key with no slot, is a G2 rejection, not a G3 problem. When one artifact lands first, the second reads it and reconciles against it rather than against `spec.md` alone.

When a slot genuinely has no string (a decorative rule, a numeral taken from `data/`), say so explicitly in the inventory with `- none` and the reason. Silence is what gets read as an oversight three gates later.

## How to verify it was applied

Before closing G2, run the diff by hand: extract every key path from `copy.md` (the `### \`key.path\`` headings) and every key path from `design.md`'s slot inventory, sort both, and `comm -3` them. The output must be empty. If `design.md` has no slot inventory section at all, the design gate is not finished - bounce it before the writer starts, not after.
