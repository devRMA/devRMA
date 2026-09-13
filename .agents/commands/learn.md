---
description: Record a lesson in the squad memory from feedback or a failure, and promote anything ready.
argument-hint: <what went wrong, or the feedback given>
---

Compound engineering step — see `AGENTS.md` §6.

Input: **$ARGUMENTS**

1. Read `.agents/memory/LESSONS.md`. If an existing lesson already covers this, **do not write a new one** — bump it instead:
   ```bash
   node .agents/tools/lesson.mjs confirm <id>
   ```
   A second lesson saying the same thing is how the index becomes unreadable.

2. Otherwise create it, choosing the agent and gate this belongs to:
   ```bash
   node .agents/tools/lesson.mjs new "the rule, imperative" --agent <agent> --domain <gate> --spec <NNNN|human-feedback>
   ```

3. Fill the four sections. **Write the pattern, not the incident.** The test: could an agent that was not there apply this tomorrow, to a different feature? Blame is never the lesson — find the structural cause. "The developer improvised an empty state" is blame; "the plan omitted the empty state, so it got invented at build time" is the cause, and it changes what the tech-lead does next time.

4. Anything at `confirmed: 3` gets promoted now: move the rule into `.agents/agents/<agent>.md`, or `AGENTS.md` when it cuts across agents, then:
   ```bash
   node .agents/tools/lesson.mjs retire <id> "promoted"
   ```

5. Verify: `node .agents/tools/docs-check.mjs`

Report in two lines: what was written or confirmed, and what was promoted.
