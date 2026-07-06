# ECHELON Phase 0 ADR Set

**Status:** Accepted architectural baseline  
**Date:** 2026-07-06

This consolidated ADR set records the decisions approved for Phase 0. Individual ADR files may later be split out without changing these decisions.

## ADR-0001 — Modular monolith and hybrid language model

**Decision:** Use a NestJS modular-monolith Kernel/API, a separate Next.js Mission Control application, and isolated Python worker services only when justified. Keep them in one monorepo and deploy each application separately.

**Why:** It preserves a simple Phase 0 transactional boundary while supporting later AI/specialist workloads without premature microservice coordination.

## ADR-0002 — Canonical state, tasks, and event delivery

**Decision:** PostgreSQL is canonical for tasks, approvals, audit, metadata, and outbox records. Redis handles dispatch, locks, delayed jobs, cache, and transient coordination. Use in-process domain events plus a PostgreSQL transactional outbox.

**Why:** State, audit, and emitted event can be committed atomically. A dedicated broker and full event sourcing are deferred until evidence justifies them.

## ADR-0003 — Identity, authorization, and service tokens

**Decision:** Authentik owns authentication/MFA/session identity. ECHELON owns workspace authorization, RBAC plus scoped policy, classifications, approval authority, and capability rights. Capabilities use short-lived workspace-scoped tokens.

**Why:** It separates authentication from operational authority and removes the risk of shared long-lived module keys.

## ADR-0004 — Kernel-native policy module and two-person production governance

**Decision:** Policies are declarative, stored in Git, evaluated through one Kernel interface, and return `allow`, `deny`, or `approval_required`. Production policy activation requires a different approver from the editor.

**Why:** This keeps policy understandable, testable, and auditable while avoiding early OPA/Rego complexity. OPA remains an optional future implementation behind the same interface.

## ADR-0005 — Append-only audit, four classifications, and policy-based retention

**Decision:** Maintain an append-only PostgreSQL audit ledger. Apply platform classifications: Public, Internal, Confidential, Restricted. Bind retention rules to record type and classification; support legal hold and auditable deletion.

**Why:** ECHELON needs trustworthy history and controlled data lifetime. Corrections create linked events rather than rewriting records.

## ADR-0006 — MinIO object storage and OpenBao secrets boundary

**Decision:** Use MinIO as self-hosted S3-compatible storage now, retaining cloud S3-compatible portability later. PostgreSQL owns object metadata. OpenBao is the operational secrets boundary; local developer bootstrap may use macOS Keychain and ignored environment files.

**Why:** Object storage and secret handling stay portable, auditable, and separate from application business data.

## ADR-0007 — Contract-first APIs, SSE realtime, and Mission Control boundary

**Decision:** Use OpenAPI 3.1 for HTTP APIs and JSON Schema for events. Mission Control is the custom primary operator shell. Use authenticated workspace-scoped SSE for Phase 0 realtime.

**Why:** This supports TypeScript and Python consumers, keeps external tools replaceable, and avoids early WebSocket/GraphQL/realtime vendor complexity.

## ADR-0008 — Capability trust and policy-based external authority

**Decision:** Every capability requires a manifest and trust tier. Research installations stay isolated. GitHub URL auto-install is prohibited. External authority is policy-based, starting read-only/draft-first; high-risk actions always require human approval.

**Why:** The platform can adopt tools without giving unreviewed code, data access, or external commitment power to the operating environment.

## Invariants

1. Kernel is authoritative for policy, approvals, audit, workspace boundaries, and task state.
2. Human approval is a Kernel record, not a chat message.
3. No raw secrets in source control, logs, general events, or browser storage.
4. All material operations carry workspace and correlation context.
5. External tools remain capabilities, not permanent control-plane dependencies.
6. Any change to these decisions requires a new ADR, migration/rollback plan, tests, and review.
