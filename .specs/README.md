# `.specs` — Spec-Driven Development

Every change to this portfolio is described here before it is built, and the record of how it was built stays here after.

The contract this directory honors: **delete `app/`, `components/`, `lib/`, `hooks/`, `data/` and `locales/`, hand an agent this folder plus `PRODUCT.md` and `DESIGN.md`, and it rebuilds a portfolio materially equivalent to the current one.** A spec that is not sufficient for that is an incomplete spec.

The pipeline that produces and consumes these files is defined in `AGENTS.md` at the repo root.

## Layout

```
.specs/
├── README.md              this file
├── INDEX.md               every spec and its state — the single place to see what is done and what is pending
├── templates/             the shape each artifact must take
└── NNNN-slug/
    ├── spec.md            product-manager — problem, scope, acceptance criteria
    ├── design.md          product-designer — hierarchy, layout, tokens, states, motion
    ├── copy.md            content-writer — every string, pt-BR + en
    ├── plan.md            tech-lead — atomic, decision-free tasks
    ├── STATUS.md          live pipeline state: gates, tasks, blockers, decisions
    ├── reports/           the conversation between agents
    │   ├── qa.md
    │   ├── audit.md
    │   ├── audit-preview.md
    │   ├── release.md
    │   └── recruiter.md
    └── evidence/          browser screenshots + axe report (gitignored)
```

## Numbering

Four digits, sequential, never reused. `0001-0099` are baseline specs describing the portfolio as it already exists; `0100+` are new work.

## Finding state

`INDEX.md` is the answer to "what is done, what is pending". Each spec's `STATUS.md` is the answer to "where exactly is this one and who has it".

## Scaffolding a new spec

```bash
node .agents/tools/spec.mjs new "short feature name"
```

Creates the folder from the templates, assigns the next number, and registers it in `INDEX.md`.

```bash
node .agents/tools/spec.mjs status
```

Prints every spec, its state, and the agent currently holding it.
