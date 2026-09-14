---
id: 003
title: When a plan relocates a component into a new container, restate every context-dependent property it carries — heading level, aspect ratio, width
applies-to: tech-lead
domain: plan
spec: 0100
confirmed: 0
created: 2026-09-12
---

## What happened

Spec 0100 moved `ArchitectureBeam` out of the skills-section bento grid and into the iShip case dialog, and moved a portrait 880×1283 document capture into a `MediaPlate`. The plan named the new parent for both and stopped there. The beam carried its old section `<h3>` along, which landed nested under an `h4`/`h5` and duplicated both. The `MediaPlate` API the same plan specified offered only `"16/10" | "9/16"`, so the portrait document was assigned `16/10` and `object-cover object-top` cropped away the signature block that the case's own headline and alt text are about.

## Why it happened

A component's heading level, aspect ratio and width are not properties of the component — they are properties of the **relationship** between the component and its container. When a plan relocates something, the developer implementing the move sees the component in isolation and the new parent in isolation, never the composed heading ladder or the composed layout. Whatever the plan does not restate is silently inherited from the old context, and it inherits correctly-looking code. Neither `tsc`, nor `axe-core` on a closed page, nor a jsdom unit test can see it.

## The rule

Any task that renders an existing component in a new parent must state, explicitly: the heading level of every heading inside the moved subtree **and** of its new ancestors, written out as the resulting `h2 → h3 → h4` ladder; the aspect ratio or fit against the real intrinsic dimensions of the asset it will carry; and its width at the narrowest and widest breakpoint. If the component's own API cannot express what the new context needs, widening that API is part of the same task — never leave the developer to pick the nearest wrong value from an existing union.

## How to verify it was applied

Before closing the plan, for each relocated component write the full heading ladder of the destination subtree and check for skips and duplicates, and check every image's intrinsic ratio against the frame it is being given. At review: open the destination in a browser, list `h1..h6` in DOM order, and compare each asset's rendered box against its natural ratio.
