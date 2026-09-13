---
id: 002
title: Prove a CSS override that must beat a library's own state styles in a real browser; a jsdom class-presence assertion proves nothing
applies-to: frontend-dev
domain: build
spec: 0100
confirmed: 0
created: 2026-09-12
---

## What happened

Spec 0100 added `motion-reduce:animate-none` to `DialogOverlay` and `DialogContent` to satisfy `design.md`'s reduced-motion requirement, and shipped a test asserting the class was present. In a real browser every case dialog still animated in full under `prefers-reduced-motion: reduce`: Radix sets `data-state="open"`, so `data-[state=open]:animate-in` compiles to an attribute-plus-class selector (specificity 0-2-0) and beats the media-query-gated single class (0-1-0). The override was dead code in exactly the state it existed to fix, and the test was green the whole time.

## Why it happened

The test ran in jsdom, which does not load the compiled Tailwind stylesheet and therefore cannot resolve a cascade. `toHaveClass(...)` proves a string reached `className` — nothing about which declaration wins. Every gate in the pipeline shared that blind spot: `axe-core` does not evaluate motion, and `preview.mjs` never opened a dialog. A whole class of defect — "the utility is present and loses" — had no check anywhere, so the first observer was a human with a browser.

## The rule

When a utility exists to **override** something a third-party component sets on itself (Radix `data-state`, Headless UI, a plugin's own animation classes), a class-presence assertion is not a test. Leave a check that reads the **computed** style in a real browser, under the condition the override targets. In this repo: `node .agents/tools/check-reduced-motion.mjs`. If no such probe exists for your case, write the smallest Playwright script that reads `getComputedStyle`, and prove it fails against the unfixed code before you trust it passing against the fixed code. And name the jsdom test for what it actually asserts — "carries the override class", never "suppresses the animation".

## How to verify it was applied

Ask of every `motion-reduce:`, `dark:`, `data-[...]:` or `!` override added in the batch: which rule is it fighting, and what is that rule's specificity? Then run the browser probe under the matching condition and read the computed value — `animationName`, `transitionProperty`, `color`. A check that has never been seen to fail has not been verified.


## Retired

2026-09-13 — promoted — the browser-proof rule is now .agents/agents/frontend-dev.md § Test conventions and AGENTS.md §8; merged with lesson 005, which is the same defect in a different state
