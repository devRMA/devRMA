---
description: Show the state of every spec, the open gates, and the squad's active lessons.
---

Give the human a complete picture in one pass. Run:

```bash
node .agents/tools/spec.mjs status
node .agents/tools/lesson.mjs list
node .agents/tools/docs-check.mjs
```

Then read `.specs/INDEX.md`, and the `STATUS.md` of anything not `done` — its blockers and its decisions log.

Report, compactly:

- **In flight** — each spec, which gate holds it, which agent is next, and any bounce count approaching the ceiling of two.
- **Blocked** — what is waiting on the human, and precisely what decision is needed.
- **Memory** — how many active lessons, and anything at `confirmed: 3` that is due for promotion.
- **Docs** — any integrity failure, stated plainly.

No preamble. If everything is clean and nothing is in flight, say so in one line.
