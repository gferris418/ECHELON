# ECHELON Pending Task Backlog

The detailed, authoritative hierarchy is maintained in [`phase-execution-register-v0.3.md`](phase-execution-register-v0.3.md). This page links the live GitHub pending backlog.

## Active Phase -1 blockers

| Task                                                   | Pending issue | Dependency     |
| ------------------------------------------------------ | ------------- | -------------- |
| P-1.01 Freeze v0.3 baseline                            | #2            | Owner approval |
| P-1.02 Enable branch protection and required checks    | #3            | P-1.01         |
| P-1.03 Enable security reporting and secret protection | #4            | P-1.01         |
| P-1.04 Complete individual ADRs                        | #5            | P-1.01         |
| P-1.05 Expand capability registry                      | #6            | P-1.01         |
| P-1.06 Configure GitHub Project tracking               | #7            | P-1.01         |
| P-1.07 Review candidate repositories                   | #8            | P-1.05         |
| P-1.08 Approve architecture and workflow diagrams      | #9            | P-1.01         |

## Phase backlog issues

| Phase                                               | Pending issue | Child tasks |
| --------------------------------------------------- | ------------: | ----------: |
| Phase 0 — Kernel and operator foundation            |           #10 | P0.01–P0.12 |
| Phase 1 — Controlled AI execution                   |           #11 | P1.01–P1.07 |
| Phase 2 — Intelligence, knowledge and observability |           #12 | P2.01–P2.07 |
| Phase 3 — Builder capabilities                      |           #13 | P3.01–P3.04 |
| Phase 4 — Foundry and workspace lifecycle           |           #14 | P4.01–P4.04 |
| Phase 5 — Mobile, remote and resilience             |           #15 | P5.01–P5.04 |

## Rules

- A phase backlog does not authorize implementation by itself.
- Each checked child task must later receive its own implementation issue/PR when it becomes active.
- Phase -1 must be completed before Phase 0 work begins.
- All work must satisfy the documentation, ADR, approval, verification, and rollback rules in the execution register.
