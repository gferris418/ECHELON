# Hermes Mission Control Reference Assessment

## Sources reviewed

- Komputer Mechanic, “How to Build a PREMIUM Hermes Agent Mission Control Dashboard”
- AI Profit Boardroom, “Hermes Agent OS (Full Mission Control Setup 2026)”

These are commercial/tutorial sources, not authoritative security or software architecture specifications. They are retained as UX and workflow references only.

## Reusable patterns

| Pattern                                                              | ECHELON decision                          | Rationale                                                                                                        |
| -------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Operations overview: current directive, system health, activity feed | Adopt as a Mission Control UX requirement | Aligns with dashboard, Timeline, Signals, and observability goals.                                               |
| Agent status and task distribution                                   | Adopt conditionally                       | Must be derived from Intelligence Bus events and task state, not agent self-report alone.                        |
| Kanban task board and schedule view                                  | Adopt conditionally                       | ECHELON uses GitHub Projects for planning now; Mission Control can later present synchronized operational tasks. |
| Content/document view                                                | Adopt conditionally                       | Must be workspace-scoped, classified, and provenance-aware.                                                      |
| Agent-specific workspaces                                            | Adopt                                     | Fits the workspace-isolation model.                                                                              |
| Local dashboard for low-latency operations                           | Adopt conditionally                       | Local UI is appropriate; cloud model calls remain compatible with the user hardware constraint.                  |

## Rejected baseline patterns

| Pattern                                                              | ECHELON decision | Risk                                                                                                                       |
| -------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Telegram or Discord as the top-level control and authorization layer | Reject           | External chat identity and channel permissions are not adequate approval/audit controls.                                   |
| Full tool access for a planning agent                                | Reject           | Violates least privilege, approval boundaries, and sandboxing requirements.                                                |
| Persistent shared memory across every agent                          | Reject           | Causes data leakage, context poisoning, workspace-boundary failure, and high retrieval cost.                               |
| Automatic storage of every message or activity stream                | Reject           | Creates privacy, retention, legal, and search-noise risks.                                                                 |
| Continuous screen/microphone capture as a default "Self" layer       | Reject           | Requires explicit consent, visible indication, exclusion rules, retention controls, and separate restricted-data handling. |
| Prompt-defined agent constitution as the only governance mechanism   | Reject           | Prompts are not a substitute for kernel-enforced policy, identity, authorization, event logs, or tests.                    |

## ECHELON design mapping

```text
External tutorial pattern              ECHELON control
--------------------------------------------------------------
Mission dashboard                  -> Mission Control
Orchestrator                       -> ORACLE + Task Engine
Agent activity log                 -> Intelligence Bus + Timeline
Persistent agent workspace         -> Workspace Manager
Task board and cron                -> GitHub Projects now; mission scheduler later
Local memory vault                 -> Context Engine + governed knowledge stores
Chat channels                      -> optional input adapters, never authority
```

## Adoption guardrail

No Hermes dashboard template, prompt pack, or packaged Agent OS is authorized for installation or direct integration without a capability evaluation, module installation record, security review, and approved phase gate.
