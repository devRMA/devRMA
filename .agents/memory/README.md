# Squad memory — compound engineering

The squad gets better because it writes down what went wrong and reads it before deciding again.

Two rules carry the whole system:

1. **Every agent reads `LESSONS.md` before it decides anything.** It is one line per lesson, cheap to scan. Open the full lesson file for anything tagged with your agent or your domain.
2. **Every rejection and every human correction produces a lesson.** A gate that bounced, a piece of feedback, a bug that reached the preview — if it cost a round trip, it gets written down. A cost paid twice is a system that does not learn.

## Layout

```
.agents/memory/
├── README.md        this file
├── LESSONS.md       the index — one line per active lesson. Read this first, always.
├── lessons/NNN-slug.md
└── archive/         promoted or retired lessons, kept for history, never read at runtime
```

## Writing a lesson

```bash
node .agents/tools/lesson.mjs new "short title" --agent tech-lead --spec 0007
```

A lesson is not a diary entry. It is a rule a future agent can apply without having been there. Write the **pattern**, not the incident: "the hero copy exceeded the designer's line constraint" is an incident; "verify copy length against the design constraint before writing to locales, because the writer and designer never see each other's work" is a lesson.

## Preventing bloat

This is the failure mode of every learning system — remembering everything until nothing is readable. Three mechanics keep the index small:

- **Confirmation count.** Each time a lesson prevents a repeat, bump its `confirmed` count.
- **Promotion at 3.** A lesson confirmed three times is no longer a lesson — it is a rule. Move it into the relevant agent's `.agents/agents/*.md` (or `AGENTS.md` when it is cross-cutting) and archive the lesson file. The index shrinks as the squad gets better.
- **Retirement.** A lesson contradicted by a later decision, or made obsolete by a refactor, moves to `archive/` with the reason. Never leave a stale rule in the index — a wrong lesson is worse than no lesson.

Cap: **thirty active lessons.** At the cap, nothing new is written until something is promoted or retired. The pressure is the point.

## Reading a lesson at decision time

Before choosing an approach, scan the index for anything touching the same component, the same gate, or the same kind of decision. If a lesson applies and you are about to do the opposite, you need a written reason — put it in the spec's `STATUS.md` decisions log.
