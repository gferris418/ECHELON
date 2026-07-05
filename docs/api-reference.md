# ECHELON API Reference

## Status

**Current implementation status: no public API endpoints exist.**

This repository is in Phase -1. No API server, route definitions, OpenAPI document, request handlers, or database-backed endpoint implementations are present. This document is therefore a contract baseline, not a list of live endpoints.

No client should integrate against an undocumented or inferred endpoint.

## API principles

When Phase 0 begins, every public or capability-facing API must:

1. be defined in a versioned OpenAPI specification before implementation;
2. use authenticated, workspace-scoped requests;
3. return correlation IDs for task, event, and audit tracing;
4. validate input at the boundary and reject unknown or unsafe fields;
5. use idempotency keys for retried state-changing requests;
6. record authorization and approval decisions in the audit timeline;
7. publish documented events through the Intelligence Bus rather than call unrelated capabilities directly.

## Proposed API domains

The following domains are planned architecture surfaces only.

| Domain | Purpose | Phase | Implementation status |
|---|---|---:|---|
| Identity | session, role, workspace access | 1 | Not implemented |
| Workspaces | workspace isolation and membership | 4 | Not implemented |
| Tasks | task creation, state, approval, execution, verification | 0 | Not implemented |
| Approvals | high-impact action review and decision records | 1 | Not implemented |
| Capabilities | registration, health, lifecycle, installation status | 0 / 4 | Not implemented |
| Events | Intelligence Bus publishing and subscription contracts | 0 | Not implemented |
| Context | bounded evidence assembly and provenance | 2 | Not implemented |
| Audit / Timeline | immutable operational history views | 0 | Not implemented |
| Health | service and dependency status | 0 | Not implemented |

## Required common request headers

The following convention is proposed for all authenticated API requests.

| Header | Requirement | Purpose |
|---|---|---|
| `Authorization` | Required after identity is implemented | Authenticated principal |
| `X-Workspace-Id` | Required for workspace-scoped operations | Prevent cross-workspace ambiguity |
| `X-Correlation-Id` | Generated if absent | Trace a request across task, event, and audit records |
| `Idempotency-Key` | Required for selected create/execute operations | Prevent duplicate external effects |
| `Content-Type` | `application/json` where JSON is used | Explicit payload handling |

## Required response envelope

The following is a proposed response shape; it is not live.

```json
{
  "data": {},
  "meta": {
    "correlation_id": "uuid",
    "workspace_id": "uuid",
    "request_id": "uuid"
  },
  "error": null
}
```

## Required error envelope

```json
{
  "data": null,
  "meta": {
    "correlation_id": "uuid",
    "request_id": "uuid"
  },
  "error": {
    "code": "approval_required",
    "message": "This operation requires an explicit approval decision.",
    "details": []
  }
}
```

## Required error categories

| Category | Intended HTTP status | Example condition |
|---|---:|---|
| `validation_error` | 400 | malformed or missing input |
| `authentication_required` | 401 | no valid identity |
| `authorization_denied` | 403 | identity lacks workspace permission |
| `not_found` | 404 | requested workspace/task/capability absent |
| `conflict` | 409 | duplicate idempotency key or invalid state transition |
| `approval_required` | 409 or 423 | high-impact action not yet approved |
| `rate_limited` | 429 | caller exceeds documented policy |
| `dependency_unavailable` | 503 | selected capability or dependency unhealthy |
| `internal_error` | 500 | unexpected failure; sensitive details excluded |

## Documentation requirements before implementation

Before any endpoint is treated as public, add:

- the endpoint path, method, security requirement, request and response schemas;
- validation rules and field constraints;
- authorization and workspace behavior;
- idempotency and retry behavior;
- emitted and consumed event contracts;
- error responses and operator-safe messages;
- test evidence and rollback behavior.

## Limitations

- There are no live URLs, request examples, credentials, SDKs, or rate limits today.
- This document does not authorize implementation or external integration.
- The OpenAPI source file must become the authoritative API definition before the first endpoint is built.
