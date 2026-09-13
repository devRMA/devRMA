---
id: 004
title: Name the interactive states a spec ships and point each one at the tool line that enters it; a checker that only sees first paint reports green on what it never looked at
applies-to: tech-lead
domain: plan
spec: 0100
confirmed: 0
created: 2026-09-12
---

## What happened

A spec moved the bulk of the page's content into modal dialogs. The automated gate tool loaded the route and ran the accessibility checker over first paint, never opening a dialog. A contrast failure in content that same spec delivered (4.23:1 against a 4.5:1 floor, light theme, every viewport) passed a QA gate and an audit gate and survived two full build rounds, until a reviewer drove a browser by hand.

## Why it happened

The plan treated the gate tooling as finished infrastructure rather than as part of the surface the spec had to cover. When a spec moves content into a state that only exists after an interaction — dialog open, tab switched, element hovered, `prefers-reduced-motion` active, an error or empty state — the existing automated check silently starts measuring a subset of what shipped, and keeps reporting green. Green because nothing looked is indistinguishable from green because nothing is wrong, and it is the failure mode nobody investigates.

## The rule

While planning, enumerate every interactive state the spec delivers and, for each one, name the tool and the line in `.agents/tools/` that enters it. Where nothing enters it, changing the tool is a task of this spec — ordered **before** the fix it must observe, so the first run fails and proves the defect exists. The same applies to results a checker declines to decide (axe `incomplete`): an undecided result must appear in the report, never become silence.

## How to verify it was applied

Before closing `plan.md`, for every interactive state named in `spec.md`/`design.md`, cite the tool line that reaches it (`grep -n 'role="dialog"\|hover\|reducedMotion' .agents/tools/*.mjs`). A state with no line means the plan is incomplete. After the build, `STATUS.md` must carry the output where the tool **failed before** the fix; without it the check is unproven.
