# AGENTS.md

Operating contract for every AI agent working on this repository — Claude Code, Antigravity, Codex, Cursor, Copilot, or anything else that reads this file.

Read this before doing anything else.

---

## 1. The project

Personal engineering portfolio of **Rafael Martins Alves (`devRMA`)**. It exists for one purpose: to make a hiring manager evaluating senior engineering leadership want to start a conversation.

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS 3 + `cva` + `tailwind-merge`, tokens in `tailwind.config.ts` |
| UI primitives | Radix UI, `lucide-react` |
| Motion | `framer-motion` |
| Theming | `next-themes` (dark + light, both ship) |
| i18n | `locales/en.ts` + `locales/pt-BR.ts` via `components/language-provider.tsx` — full parity, always. **Both languages are the `content-writer`'s, and only the `content-writer`'s.** |
| Tests | Vitest + Testing Library + jsdom |
| Lint/format | Biome (`pnpm lint` autofixes) |
| Quality gate | SonarCloud via GitHub Actions |
| Hosting | Vercel — every PR gets a preview deploy |
| Package manager | pnpm |

Three documents hold the truth and outrank any agent's judgment:

- **`PRODUCT.md`** — audience, positioning, principles, and the evidence on hand. What may be claimed.
- **`DESIGN.md`** — the design system as actually shipped: tokens, type ramp, spacing, color, motion.
- **`.specs/`** — every change, specified before it is built and recorded after.

### Commands

```bash
pnpm dev                  # dev server
pnpm build                # production build — must pass before any PR
pnpm test                 # vitest run
pnpm test:coverage        # coverage; must not drop below baseline
pnpm lint                 # biome check --write --unsafe
pnpm exec tsc --noEmit    # type check
```

### Agent tooling

```bash
node .agents/tools/spec.mjs new "feature name"     # scaffold a spec from the templates
node .agents/tools/spec.mjs status                 # every spec, its state, its holder
node .agents/tools/preview.mjs --out <dir>         # browser evidence: screenshots (desktop+mobile × dark+light), axe-core, console errors
node .agents/tools/preview.mjs --base-url <url> --out <dir>   # same, against a deployed Vercel preview
.agents/tools/pr-preview.sh                        # watch PR checks to green, print the Vercel preview URL
```

---

## 2. Where agents live

**`.agents/` is the source of truth.** Everything else points at it.

```
.agents/
├── agents/     the nine squad agents (native format for Antigravity; symlinked into .claude/agents/)
├── skills/     installed skills (symlinked into .claude/skills/)
├── memory/     the squad's accumulated lessons — read before deciding, written after failing
├── commands/   slash commands that drive the pipeline (symlinked into .claude/commands/)
└── tools/      scripts the agents call
```

| Runtime | How it reads the squad |
|---|---|
| Antigravity | `.agents/agents/` natively |
| Claude Code | `.claude/agents/` → symlinks into `.agents/agents/` |
| Codex / Cursor / Copilot | this file; agent definitions in `.agents/agents/` referenced by name |

Every agent definition is Markdown with YAML frontmatter. `tools` is a comma-separated string (Claude Code's format). `model` uses Claude tier names (`opus` / `sonnet`); a runtime that does not recognize them falls back to its own default — map them there rather than editing the files.

**Never edit `.claude/agents/*` or `.claude/skills/*` directly — they are symlinks.** Edit the target in `.agents/`.

---

## 3. The squad

Nine agents. Each owns one decision domain and is forbidden from the others' — that separation is what makes the output better than one agent doing everything.

| Agent | Model | Owns | Produces |
|---|---|---|---|
| `product-manager` | opus | The problem, the scope, the acceptance criteria | `spec.md` |
| `product-designer` | opus | Hierarchy, layout, type, color, motion | `design.md` |
| `content-writer` | opus | **Every word the site ships, written in both pt-BR and en** | `copy.md` |
| `tech-lead` | opus | Architecture, task decomposition, bounce triage | `plan.md` |
| `frontend-dev` | sonnet | Execution only — no decisions | code + tests |
| `qa-engineer` | sonnet | Correctness, tests, coverage, code craft | `reports/qa.md` |
| `web-standards-auditor` | sonnet | a11y, SEO, performance, i18n parity *(verifies only — never writes copy)* | `reports/audit.md` |
| `release-manager` | sonnet | Commits, stacked PRs, CI, preview URL | `reports/release.md` |
| `tech-recruiter` | opus | Whether it was worth building at all | `reports/recruiter.md` |

Opus where judgment and taste decide the outcome; Sonnet where the work is verification against a written standard.

---

## 4. The pipeline

Orchestration is **orchestrator-workers**: the main thread runs `/feature` and calls each agent in turn. Agents do not call each other — they return a verdict and an artifact, and the orchestrator routes. Sub-agents cannot reliably spawn sub-agents in any of the three runtimes, and a chain that pretends otherwise silently drops work.

```
request
  │
  ├─ G1  spec        product-manager                         → spec.md
  │
  ├─ G2  design      product-designer  ─┐ parallel
  │      copy        content-writer    ─┘                    → design.md, copy.md
  │
  ├─ G3  plan        tech-lead                               → plan.md
  │
  ├─ G4  build       frontend-dev      (task by task)        → code + tests
  │
  ├─ G5  qa          qa-engineer            ─┐ parallel
  │      audit       web-standards-auditor  ─┘               → reports/qa.md, reports/audit.md
  │
  ├─ G6  docs        release-manager + `docs-integrity` skill (BEFORE the first commit)
  │                                                          → docs reconciled, lessons written
  │
  ├─ G7  release     release-manager   (commits → [human approval] → push, PR, CI)
  │                                                          → reports/release.md + preview URL
  │
  ├─ G8  preview     web-standards-auditor (vs. Vercel URL)  → reports/audit-preview.md
  │
  ├─ G9  recruiter   tech-recruiter    (vs. Vercel URL)      → reports/recruiter.md
  │
  └─ G10 compound    tech-lead — promote lessons, close the spec
                                                             → ship
```

### Gate rules

1. A gate **passes** or **rejects**. There is no partial pass.
2. Every rejection goes to the **tech-lead**, who triages the destination and records it in `STATUS.md`. No agent bounces work directly to another agent.
3. **Two bounces per gate is the ceiling.** On the third, the pipeline stops: the tech-lead writes the impasse and the options into `STATUS.md` and hands it to the human. Never loop.
4. Parallel gates both run to completion before routing. Do not abort the second because the first rejected — two reports in one bounce is one round trip instead of two.
5. Reviewing agents (`qa-engineer`, `web-standards-auditor`, `tech-recruiter`) **never edit source files.** They report; the developer fixes. A reviewer who fixes stops being able to see.
6. `frontend-dev` makes no decisions. Ambiguity goes into `STATUS.md` under `blockers` and back to the tech-lead.
7. The `tech-recruiter` may reject work that passed every other gate. Technically perfect and strategically pointless is a real outcome.

### Human approval points

The pipeline runs autonomously except here, and these are not negotiable:

- **Before any push, PR, or remote operation.** Ask, wait, do not proceed on silence.
- **When a gate hits its third bounce.**
- **When a change would contradict `PRODUCT.md` or require a `DESIGN.md` system change** that the designer did not already justify.
- **Before deleting anything** outside the spec's declared scope.

---

## 5. Spec-driven development

`.specs/` is the durable record, and the contract is strict: **delete the source tree, hand an agent `.specs/` + `PRODUCT.md` + `DESIGN.md`, and it should rebuild a materially equivalent portfolio.** A spec insufficient for that is incomplete.

Layout, numbering, and templates: see `.specs/README.md`. State lives in two places and nowhere else — `.specs/INDEX.md` for what is done and what is pending across the repo, and each spec's `STATUS.md` for where that one is and who holds it.

Every agent updates `STATUS.md` when it finishes: its gate's state, the run number, the next agent, and any decision worth remembering in the decisions log. An artifact written without its `STATUS.md` update is invisible to the rest of the pipeline.

`evidence/` is gitignored — screenshots are large, regenerable, and not review material.

---

## 6. Compound engineering — the squad gets smarter

The squad is not supposed to be as good on its tenth feature as on its first. Every failure it pays for must buy something permanent.

### Read before you decide

**Every agent reads `.agents/memory/LESSONS.md` before making its first decision.** It is one line per lesson — cheap to scan — with the full rule one click away. Open every lesson tagged for you or for your domain.

This is not optional context. It is the accumulated record of what this squad already got wrong. An agent that re-derives a decision the memory already settled has wasted the cost that bought the lesson.

If a lesson applies and you are deliberately doing the opposite, record why in the spec's `STATUS.md` decisions log. Disagreement is allowed; silence is not.

### Write after you fail

A lesson gets written whenever:

- a gate rejects (the agent whose work was rejected writes it, not the reviewer);
- the human corrects, redirects, or expresses dissatisfaction with something;
- a defect reaches the Vercel preview and should have been caught earlier;
- an agent notices mid-work that an earlier decision was wrong.

```bash
node .agents/tools/lesson.mjs new "the rule, imperative" --agent <agent> --domain <gate> --spec NNNN
```

Then fill the four sections. **Write the pattern, not the incident.** The test: could an agent that was not there apply this rule tomorrow, to a different feature? If not, it is a diary entry and it will rot in the index.

Blame is never the lesson. "The developer was careless" is not actionable; "the plan did not specify the empty state, so the developer invented one" is — and it changes what the tech-lead does next time.

### Promote, or drown

This is where learning systems fail: they remember everything until nothing is readable. Three mechanics keep the index honest.

- **Confirm.** Each time a lesson prevents a repeat, `lesson.mjs confirm <id>`.
- **Promote at 3.** Three confirmations means it is no longer a lesson, it is a rule. Move it into the relevant agent's definition in `.agents/agents/`, or into this file when it is cross-cutting, then retire the lesson. The index shrinks while the squad's instincts improve.
- **Retire.** A lesson contradicted by a later decision, or made obsolete by a refactor, goes to `archive/` with its reason. A stale rule is worse than no rule.

Hard cap: **thirty active lessons.** At the cap, nothing new is written until something is promoted or retired. The pressure is the point.

Promotion is verified at the docs gate every cycle — see §7.

---

## 7. Documentation gate — before the first commit

Documentation is reconciled **before anything is committed**, never after the PR is open. The `release-manager` runs it using the `docs-integrity` skill, and it blocks delivery.

```bash
node .agents/tools/docs-check.mjs <NNNN-slug>
```

The script checks structure: artifacts complete and in the right folders, `STATUS.md` and `INDEX.md` consistent with reality, gates closed, no open blockers on a `done` spec, lessons indexed and fully written, symlinks intact, evidence gitignored.

The skill checks truth, which no script can: whether `STATUS.md` records the bounces that actually happened, whether the artifacts describe what was *built* rather than what was intended, whether a `DESIGN.md` system change landed, whether this cycle wrote the lessons it owed, and whether any lesson has reached promotion.

**A failing docs gate blocks the commit.** Fix it; never annotate around it.

The rebuild contract is what this protects: `.specs/` plus `PRODUCT.md` and `DESIGN.md` must remain sufficient to reconstruct this portfolio. Every un-reconciled divergence is a hole in that promise, and holes are invisible until the day someone needs it.

---

## 8. Code rules

Binding on `frontend-dev`, enforced by `qa-engineer`.

- **No comments** unless the *why* is genuinely non-obvious — a workaround, a hidden constraint, a subtle invariant. Never narrate what the code does. Never reference a task, spec, or PR in a comment. The existing codebase has almost none; match it.
- **Atomic design**: `components/atoms/` → `molecules/` → `organisms/` → `templates/`. Place files at the level the plan names.
- **TypeScript strict.** No `any`, no `@ts-ignore`, no `!` to silence the compiler.
- **Tailwind with tokens.** Use `cn()` from `lib/utils`. No inline styles, no raw hex, no arbitrary values where a token exists.
- **No hardcoded user-visible strings.** Everything through `locales/`, both languages, always.
- **Motion** via `framer-motion`, always with a `prefers-reduced-motion` path.
- **Reuse before writing.** Check `components/`, `hooks/`, `lib/` first. Three similar lines beat a premature abstraction; a reinvented existing helper beats nothing.
- **No new dependencies** without a written justification in `plan.md`. `framer-motion`, Radix, `cva`, `tailwind-merge`, `next-themes`, `lucide-react` are already here.
- **Tests** mirror `components/__tests__/`: query by accessible role and name, assert observable behavior, cover keyboard and reduced-motion paths.
- Match the surrounding file's idiom. New code should be unidentifiable as new.

---

## 9. Quality bars

Non-negotiable, checked at G5 and again at G8:

- `pnpm build`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test` all clean.
- Coverage does not drop below the project baseline.
- Zero axe-core violations at `critical` or `serious`; WCAG 2.1 AA in **both** themes.
- Zero console errors or React warnings in `evidence/report.json`.
- Full i18n parity: every key in both locale files, same shape, no untranslated strings.
- Metadata, sitemap, robots, OG image, and JSON-LD still correct after the change.
- Works at 1440 and 390, in dark and light. All four combinations.
- Every factual claim traceable to `data/`, `locales/`, or `PRODUCT.md`. **Nothing is ever invented** — not a metric, a year, a team size, or a technology.
- `node .agents/tools/docs-check.mjs` clean — documentation reconciled before the first commit.

---

## 10. Git and delivery

Owned by `release-manager`.

- **Only commit when asked.** Never proactively.
- **Group commits by coherent context** — never one commit per file, never one commit for everything. A reviewer should read one commit and understand one complete idea.
- Every commit builds and passes tests on its own.
- **Stage by name.** Never `git add -A` or `git add .`.
- Never commit `.specs/*/evidence/`, `coverage/`, `.next/`, or anything resembling a secret.
- Conventional Commits; imperative subject under 50 chars; body only when the *why* is not obvious.
- Prefer new commits over `--amend`. If a hook fails, the commit did not happen — fix, re-stage, new commit.
- Never skip hooks (`--no-verify`, `--no-gpg-sign`), never change git config, never force-push to `main`.
- PRs are **stacked and incremental** via the `gh-stack` skill. Each independently reviewable; foundation → components → composition → content → polish.
- Push and PR creation require explicit human approval, every time.

**Every PR must be green before the preview gate.** A failing GitHub Action — including the SonarCloud quality gate — is a blocker that bounces to the tech-lead. Never disable, skip, or work around a check to get past it.

### Attribution — every commit says which AI wrote it

Every commit and PR produced by an agent must disclose it, and must name **the model that actually ran the session** — not a hardcoded default, not the model that wrote this file.

```
Co-Authored-By: <Model Name> <noreply@<provider>.com>
```

Read the running model's name from your own environment before writing the trailer:

| Runtime | Where the name comes from | Example trailer |
|---|---|---|
| Claude Code | the model named in your system prompt | `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` |
| Antigravity | the active model in the agent config / session | `Co-Authored-By: Gemini 3 Pro <noreply@google.com>` |
| Codex | the model backing the session | `Co-Authored-By: GPT-5 Codex <noreply@openai.com>` |
| Anything else | that runtime's own model identifier | `Co-Authored-By: <Model> <noreply@<provider>.com>` |

Rules:

- **Never hardcode a model name or version.** A trailer copied from an example credits the wrong model the moment the session runs on something else, which makes the git history actively misleading about who wrote what.
- **Never invent a version you are not sure of.** If you can read the family but not the exact version, write the family alone (`Claude Opus`, `Gemini`, `GPT-5`) rather than guessing a number. A vague trailer is honest; a confident wrong one is not.
- One trailer per commit — the model that wrote it. Multiple agents in this squad share one session and one model; they do not each get a line.
- The trailer is the last line of the commit message, after a blank line.
- A commit authored by the human carries no trailer. Never add one to work you did not write.

PR descriptions end with the line naming the runtime that produced them:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

Substitute the actual tool when it is not Claude Code (`Antigravity`, `Codex`, …). Same rule: name what really ran.

## 11. Working outside the pipeline

Not every request needs nine agents. A typo fix, a dependency bump, a one-line style correction — just do it, following §6 and §8.

The pipeline is for anything that changes what a visitor sees or reads. When in doubt, the test is: **would a hiring manager notice?** If yes, it gets a spec.
