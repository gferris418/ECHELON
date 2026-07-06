# ECHELON Phase 0 Implementation Backlog

**Status:** Proposed  
**Execution rule:** Work in order unless a reviewed dependency change is documented. Every item includes tests, security/data impact review, and documentation updates.

## P0.0 — Governance and engineering foundation

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| P0.01 | Approve Phase 0 package | Specification, ADR set, structure, and backlog reviewed; conflicting older plans explicitly superseded. |
| P0.02 | Initialize monorepo | pnpm workspace, TypeScript configuration, linting, formatting, root README, local developer guide work on Apple Silicon. |
| P0.03 | Contract layout | `packages/contracts` contains OpenAPI/event directories and CI syntax validation. |
| P0.04 | Policy layout | Declarative policy folders, fixtures, test harness, and governance guidance exist. |
| P0.05 | Quality gates | CI runs formatting, types, tests, contract/docs checks, dependency/secret checks, and container build checks. |
| P0.06 | Runbooks | Local setup, env handling, backup, restore, incident, and rollback runbooks committed. |

## P0.1 — Local platform runtime

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| P0.10 | Compose baseline | PostgreSQL, Redis, MinIO, Traefik, Authentik, OpenBao, Kernel API, worker, and Mission Control start on loopback-only ports. |
| P0.11 | Container hardening | Non-root where practical; health/resource limits; no privileged mode, host networking, Docker socket, or host-home mount. |
| P0.12 | Database baseline | Module-owned schemas/migrations for identity, workspaces, tasks, approvals, capabilities, audit, events, objects, notifications, settings. |
| P0.13 | Redis worker baseline | Queue, locks, delayed retries, and worker health tested; PostgreSQL remains canonical. |
| P0.14 | MinIO baseline | Workspace-scoped object convention, checksums, signed transfer pattern, backup model verified. |
| P0.15 | Secrets baseline | OpenBao bootstrap excluded from source; ignored developer secret process; secret scan passes. |

## P0.2 — Kernel core

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| P0.20 | Kernel skeleton | Typed configuration, health/readiness, correlation middleware, structured logs, versioned error envelope. |
| P0.21 | Authentik bridge | Kernel validates claims and maps external subjects to internal users. |
| P0.22 | Workspaces | Membership, roles, scope checks, workspace-switching API, platform/admin seed. |
| P0.23 | Policy engine | Shared `authorize()` returns allow/deny/approval_required with version/reason; role/workspace/classification tests pass. |
| P0.24 | Classification/retention | Four labels enforced on relevant records; retention references and legal-hold model present. |
| P0.25 | Audit ledger | Material commands, decisions, object/capability changes create append-only records with correlation IDs. |
| P0.26 | Transactional outbox | State, audit, and outbox commit atomically; dispatcher retries safely. |
| P0.27 | Contracts v1 | Initial OpenAPI routes and JSON Schema event envelope published and compatibility-checked. |

## P0.3 — Tasks and approvals

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| P0.30 | Task domain | State machine, safe transitions, idempotent commands, failure states, and evidence references work. |
| P0.31 | Worker execution | Dispatch, retry/backoff, cancellation, timeout, and `needs_attention` projection tested. |
| P0.32 | Approval domain | Requested payload reference, risk, policy reason, approver requirement, expiry, and decision evidence stored. |
| P0.33 | Separation of duty | Policy editor cannot activate own production change; protected approval constraints enforced. |
| P0.34 | Draft-first guard | Direct external execution blocked in Phase 0; drafts/internal simulations only. |
| P0.35 | Signals | Approval, failure, expiry, and health-change signals are stored and auditable. |

## P0.4 — Capabilities and objects

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| P0.40 | Capability registry | Identity, version, owner, trust, scopes, health, resources, network/data handling, rollback/removal metadata stored. |
| P0.41 | Manifest schema | YAML template plus JSON Schema validation in CI. |
| P0.42 | Service tokens | Short-lived capability/workspace/action/audience-scoped tokens; no shared global key. |
| P0.43 | Object API | Object metadata, classification, retention, checksum, signed access, logging, deletion-request flow. |
| P0.44 | Research boundary | No production secrets/data, limited egress, time-bound install, and removal evidence. |

## P0.5 — Mission Control shell

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| P0.50 | UI shell | Authenticated navigation, workspace context, accessibility baseline, session expiry handling. |
| P0.51 | Dashboard | Active tasks, approvals, signals, capability-health summary, safe system status. |
| P0.52 | Tasks UI | Lists, filters, detail, timeline, safe status actions, evidence references, failure visibility. |
| P0.53 | Approvals UI | Exact intended effect, risk, policy reason, expiry, decision controls, immutable history. |
| P0.54 | Timeline UI | Workspace-filtered audit projection; Restricted content redacted or separately authorized. |
| P0.55 | Capability/health UI | Manifest summary, trust tier, scopes, lifecycle, health, last-check. |
| P0.56 | SSE realtime | Authenticated workspace-filtered reconnection/resume by event ID; safe projections only. |

## P0.6 — Verification and release readiness

| ID | Deliverable | Acceptance criteria |
|---|---|---|
| P0.60 | Test suite | Unit, integration, contract, E2E, authorization, and negative-path coverage for critical flows. |
| P0.61 | Threat model | Covers identity, tokens, workspace isolation, approval bypass, audit tampering, object access, SSE leaks, capability trust. |
| P0.62 | Backup/restore | PostgreSQL and MinIO encrypted backup plus full restore executed and documented. |
| P0.63 | Audit review | Append-only permissions, correction linking, audit-search access logging, retention handling verified. |
| P0.64 | Security review | Secret/dependency/image/configuration/exposed-port review complete. |
| P0.65 | Release candidate | Version, release notes, deployment/rollback, known limits, and deferred-capability list ready. |

## Dependency order

```text
P0.01–P0.06 → P0.10–P0.15 → P0.20–P0.27 → P0.30–P0.35 → P0.40–P0.44 → P0.50–P0.56 → P0.60–P0.65
```

## Required pull-request evidence

Each implementation PR links the backlog ID and documents architecture/ADR impact, contract impact, tests, data classification/retention impact, authorization/security impact, migration/rollback plan, documentation changes, and capability-manifest impact.

## Exit demonstration

```text
login → workspace selection → protected task → policy decision → approval request → separate approval → worker execution/simulation → event outbox → SSE update → append-only timeline → evidence/object reference
```
