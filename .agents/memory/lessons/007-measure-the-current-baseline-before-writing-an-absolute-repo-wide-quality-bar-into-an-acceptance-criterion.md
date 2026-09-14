---
id: 007
title: Measure the current baseline before writing an absolute, repo-wide quality bar into an acceptance criterion
applies-to: product-manager
domain: spec
spec: 0100
confirmed: 0
created: 2026-09-13
---

## What happened

A spec's acceptance criterion read "zero accessibility violations at `critical` or `serious`", with no carve-out and no baseline. At the review gate the checker reported three contrast failures, and two of them lived in files no task in the plan touched and predated the branch verbatim. The gate rejected. A gate admits no partial pass and a follow-up spec cannot unblock a criterion the current spec must satisfy, so the pre-existing defects had to be fixed inside this spec — a build round the plan never budgeted, on surfaces outside its declared scope.

## Why it happened

An absolute, repo-wide bar reads like a quality standard but behaves like a scope clause: it silently annexes every pre-existing violation anywhere in the tree. Nobody notices at spec time because nobody has run the checker yet, and the criterion looks unarguable — arguing against "zero violations" feels like arguing against accessibility. The cost lands two gates later, on the developer, as work that was never planned and may not be in that agent's authority to decide (a contrast fix can require a design-system token, which the developer may not choose).

## The rule

Before writing an absolute bar into an acceptance criterion, run the checker against the tree as it stands today and put the number in `spec.md`. Then write the criterion against that measurement, in one of three explicit forms: **no regression from the recorded baseline of N**; **zero, and clearing the N pre-existing findings is in scope** (then the plan must carry tasks for them); or **zero within the files this spec touches**. Never leave the criterion absolute and the baseline unmeasured — that is not a higher standard, it is undeclared scope. The same applies to coverage floors, bundle budgets and performance thresholds.

## How to verify it was applied

For every acceptance criterion containing "zero", "all", "every" or a numeric threshold, find the sentence in `spec.md` recording what that same measurement reads **before** the work starts. If there is no such sentence, the criterion is not verifiable as written and the spec is not finished. At planning, any pre-existing finding the criterion annexes must appear as its own numbered task with a named destination — never as a surprise at the review gate.
