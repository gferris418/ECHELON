# ECHELON Phase 0 Architecture Specification

**Status:** Proposed baseline for review  
**Scope:** Kernel foundation and Mission Control shell only  
**Authority:** Changes to this baseline require an ADR, tests, documentation update, and review.

## 1. Purpose

ECHELON is a self-hosted, workspace-isolated operational platform. The **ECHELON Kernel** is permanent and authoritative for identity integration, workspace authorization, policies, tasks, approvals, audit history, events, capability registration, health, and governed data references.

**Mission Control** is the operator interface. It presents Kernel state and submits commands; it must not contain independent business authority, authorization logic, or audit truth.

## 2. Phase 0 outcomes

Phase 0 is complete only when ECHELON can:

1. Authenticate through Authentik and resolve internal workspace membership/roles.
2. Create, transition, view, retry, and cancel governed tasks.
3. Evaluate centralized authorization and approval policies.
4. Record append-only audit history for material actions.
5. Persist transactional outbox events and stream safe realtime projections to Mission Control.
6. Register capabilities with trust, scope, health, lifecycle, and removal metadata.
7. Store object metadata in PostgreSQL and artifact bytes in MinIO.
8. Apply classification and retention references to records and objects.
9. Run locally through hardened Apple-Silicon containers with health checks, tests, runbooks, backup, and rollback evidence.

## 3. Explicit non-goals

Phase 0 does not implement full RAG/embeddings/OCR, broad AI agent execution, autonomous external actions, browser automation, a marketplace, auto-install from GitHub URLs, ERP/CRM/procurement/finance modules, screen intelligence, voice control, native mobile, 3D UI, Kubernetes, a dedicated event broker, OPA, or full event sourcing.

## 4. Architecture principles

- Kernel authority; human authority for protected actions.
- Workspace isolation and least privilege by default.
- Replaceable capabilities, contract-first interfaces, and audit-first operations.
- Safe defaults: private services, explicit exposure, no raw secrets in logs/events, Restricted data excluded from general AI context.
- Modular monolith first; extract only when operational evidence justifies it.
- Documentation, contracts, implementation, and tests change together.

## 5. Technology baseline

| Area                         | Decision                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| Repository                   | One modular monorepo                                                                 |
| Kernel API                   | TypeScript + NestJS modular monolith                                                 |
| Mission Control              | Next.js + TypeScript                                                                 |
| Specialist workloads         | Isolated Python workers only when justified                                          |
| Canonical state              | PostgreSQL, schema ownership per Kernel module                                       |
| Queue/transient coordination | Redis; PostgreSQL remains authoritative                                              |
| Events                       | In-process domain events + PostgreSQL transactional outbox                           |
| Objects                      | MinIO now; cloud S3-compatible storage later                                         |
| Identity                     | Authentik                                                                            |
| Secrets                      | OpenBao operationally; macOS Keychain/ignored local env only for developer bootstrap |
| Contracts                    | OpenAPI 3.1 for HTTP; JSON Schema for durable events                                 |
| Realtime                     | Authenticated, workspace-filtered SSE                                                |
| Reverse proxy                | Traefik                                                                              |
| Local runtime                | OrbStack/Docker Compose, `linux/arm64`                                               |

## 6. Kernel boundaries

The Kernel contains strict modules: `identity`, `workspaces`, `policy`, `tasks`, `approvals`, `capabilities`, `audit`, `events`, `objects`, `notifications`, `health`, and `api`.

Each module owns its schema, migrations, services, tests, and public interface. Cross-module operations use explicit interfaces or domain events. No application may import another application's internal code.

## 7. Identity, policy, approval, and secrets

Authentik provides login, MFA, federation, recovery, and session identity. ECHELON owns workspace membership, roles, data classification controls, task rights, approval authority, and capability permissions.

Authorization is RBAC plus scoped policy rules:

```text
role → workspace membership → actor/capability identity → action → resource classification → risk/limits → approval status → allow | deny | approval_required
```

Capabilities receive short-lived tokens scoped by capability, workspace, action, audience, and expiry. No shared global module API key is permitted. High-risk actions remain subject to policy and approval checks regardless of token scope.

Production policy changes require two-person control: an authorized editor proposes and a different authorized approver activates. Emergency changes are time-limited, automatically expire, and require review.

## 8. Data lifecycle

Platform classifications are **Public**, **Internal**, **Confidential**, and **Restricted**. The highest classification wins when records are combined. Workspace tags may add context but cannot lower platform classification.

Every relevant record carries a retention policy reference. Legal hold pauses deletion. Deletion must propagate, where technically possible, to originals, copies, caches, indexes, and derived artifacts; the audit ledger keeps deletion evidence without retaining deleted sensitive content.

PostgreSQL owns object metadata, ownership, classification, retention, checksum, and audit references. MinIO owns object bytes through an ECHELON storage interface.

## 9. Tasks, events, audit, and realtime

PostgreSQL is canonical for task state, approvals, audit, metadata, and the event outbox. Redis provides dispatch, delayed jobs, locks, caching, and transient coordination.

Minimum task lifecycle:

```text
draft → queued → running → waiting_approval → completed
                    ↘ failed → needs_attention
draft/queued/running/waiting_approval → cancelled
```

The business mutation, audit record, and outbox event commit atomically. Event consumers are idempotent. Events never include raw secrets; large objects are referenced rather than embedded.

Mission Control receives safe projections through authenticated workspace-scoped SSE. PostgreSQL remains the source of truth; SSE supports reconnect/resume by event ID.

The audit ledger is append-only to normal application roles. Corrections create linked records rather than changing history. Each material record includes actor, workspace, correlation/causation IDs, policy result, outcome, evidence reference, integrity hash, and retention class.

## 10. Capability governance

Every capability has a manifest declaring identity, version, owner, trust tier, runtime/source digest, requested scopes, data handling, network needs, health check, resources, backup, rollback, and removal path.

Research installations are isolated: no production secrets, no shared business data, limited egress, time limit, and removal evidence. GitHub URL auto-install is prohibited. Curated Foundry installation is deferred until immutable-source verification, review, health, backup, rollback, and policy controls exist.

## 11. Security and operational baseline

- Non-root containers where practical; resource limits and health checks required.
- No `latest` tags in operational environments; use immutable image digests.
- Loopback-only local ports by default; internal services private; Traefik exposes only approved gateways.
- No privileged containers, Docker socket mounts, host networking, or host-home mounts without ADR approval.
- CI validates formatting, types, tests, contracts, docs, migrations, dependencies, secrets, and container builds.
- Backups are encrypted and restore-tested.
- Logs are structured and classification-aware; never include raw secrets or unrestricted Restricted data.

## 12. Phase 0 exit gate

Phase 0 exits only when the following verified path works end to end:

```text
login → workspace selection → create protected task → policy decision → approval request → separate approval → worker execution/simulation → outbox → SSE update → append-only timeline → evidence/object reference
```

Required proof also includes backup/restore, rollback, authorization negative tests, contract compatibility checks, and no deferred capability silently becoming a foundation dependency.
