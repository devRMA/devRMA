---
description: Run a single pipeline gate on an existing spec, without the full squad.
argument-hint: <gate> <NNNN-slug>
---

Run one gate from `AGENTS.md` §4 against an existing spec. Use when re-running a gate after a fix, or when picking the pipeline back up.

Arguments: **$ARGUMENTS** — the gate name (`spec`, `design`, `copy`, `plan`, `build`, `qa`, `audit`, `docs`, `release`, `preview`, `recruiter`, `compound`) and the spec folder.

1. Read `.specs/<NNNN-slug>/STATUS.md` to see where the pipeline actually is, and `.agents/memory/LESSONS.md`.
2. Call the agent that owns that gate (the table in `AGENTS.md` §3), giving it the spec folder and the artifacts its input contract names.
3. On rejection, route to the `tech-lead` for triage — never directly to another agent.
4. Report the verdict in one or two lines.

Same rules as `/feature`: two bounces per gate, human approval before anything touching the remote.
