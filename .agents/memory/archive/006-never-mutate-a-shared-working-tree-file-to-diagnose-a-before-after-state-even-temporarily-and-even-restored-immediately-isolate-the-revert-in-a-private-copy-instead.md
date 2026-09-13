---
id: 006
title: Never mutate a shared working-tree file to diagnose a before/after state, even temporarily and even restored immediately — isolate the revert in a private copy instead
applies-to: web-standards-auditor
domain: audit
spec: 0100
confirmed: 0
created: 2026-09-13
---

## What happened

During G5 run 3, the auditor reverted `media-plate.tsx`'s three fixed classes back to the pre-fix state directly in the shared repository, to measure the "before" contrast value independently. It was restored a few minutes later. In that window, `qa-engineer`'s own parallel run-3 verification read the reverted file, ran a red test suite and a failing `preview.mjs` against it, and rejected the gate on a defect that did not exist in the delivered work — a false rejection the auditor caused, on the pipeline's last-chance bounce.

## Why it happened

Two earlier audit runs on this same spec established a working precedent — reverting a fix in place, measuring the failure, restoring it — as a legitimate way to prove a check "fails before and passes after" (lesson 002's own standard). That precedent was applied to a shared, actively-read working tree without adapting it for the fact that, this time, another agent was reading and testing the same files concurrently. A reviewing agent's rule ("never edit source files") was treated as being about *delivery* (never leave a change behind) rather than about *any* mutation of the shared tree, however temporary — the two are not the same guarantee when another agent can observe the intermediate state.

## The rule

Any revert-measure-restore diagnostic a reviewing agent performs must happen in an isolated copy of the repository (`rsync`/`cp` the tree, or at minimum the one file plus its build context, into a scratch directory; build and serve from there), never in the shared working tree — regardless of how quickly the file is restored afterward. If an isolated copy is impractical for the specific measurement, the agent states in its report that it is about to mutate a shared file, for how long, and why, so a concurrent reviewer is not silently exposed to it — but isolation is the default, not the disclosure.

## How to verify it was applied

Before running any `sed`/`cp`-based revert for diagnostic purposes, confirm the working directory for that command is under a scratch/temp path the agent controls exclusively (e.g. `.agents/tools/preview.mjs`'s own `--out` convention, or the session's scratchpad), not the repository path other agents read from. If a shared-tree mutation already happened, check the mtime of the affected file against every parallel report's own write-timestamp before trusting that report's findings on that file.


## Retired

2026-09-13 — promoted — now AGENTS.md §4 gate rule 6, beside the parallel-gate rule it qualifies; it is a pipeline rule, not one agent's
