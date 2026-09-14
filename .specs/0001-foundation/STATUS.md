# 0001 — Status

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** done
**Next agent:** none
**Bounces:** none

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | tech-lead | passed | 1 | `spec.md` |
| design | product-designer | passed | 1 | `DESIGN.md` (repo root) |
| copy | content-writer | passed | 1 | `locales/` |
| plan | tech-lead | passed | 1 | shipped build |
| build | frontend-dev | passed | 1 | shipped build |
| qa | qa-engineer | passed | 1 | `reports/qa.md` |
| audit | web-standards-auditor | passed | 1 | `reports/audit.md` |
| release | release-manager | passed | 1 | git history |
| preview | web-standards-auditor | passed | 1 | production |
| recruiter | tech-recruiter | passed | 1 | `reports/recruiter.md` |

## Tasks

| Id | Title | State |
|---|---|---|
| — | baseline, reconstructed from the shipped build | done |

## Blockers

none

## Decisions log

| When | Agent | Decision |
|---|---|---|
| 2026-09-12 | tech-lead | Baseline spec written retroactively from the shipped build to establish the `.specs/` rebuild contract. Design and copy artifacts point at `DESIGN.md` and `locales/` rather than duplicating them — a second copy would drift from the first. |
