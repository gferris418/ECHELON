# ECHELON P0.03 Contract Layout Decisions

**Status:** Confirmed by product owner  
**Phase:** P0.03 — Contract layout  
**Scope:** HTTP API and durable-event contract baseline before runtime API implementation

## Confirmed decisions

### 1. HTTP API contract source

OpenAPI 3.1 is the source of truth for all ECHELON Kernel HTTP APIs.

Kernel implementations, TypeScript clients, request validation, documentation, and compatibility checks must be derived from or verified against the OpenAPI contract.

### 2. Durable event contract source

JSON Schema is the source of truth for durable events.

Durable event schemas remain separate from OpenAPI because they describe asynchronous records and event consumers rather than HTTP request/response interfaces.

### 3. Contract repository structure

```text
packages/contracts/
├── openapi/
│   ├── kernel.yaml
│   └── modules/
├── events/
│   ├── task/
│   ├── approval/
│   ├── audit/
│   └── capability/
├── schemas/
│   ├── common/
│   └── errors/
└── generated/
```

Rules:

- `openapi/kernel.yaml` is the top-level composition entry point for Kernel HTTP contracts.
- `openapi/modules/` contains modular domain fragments owned by Kernel modules.
- `events/` contains durable event families grouped by domain.
- `schemas/common/` contains reusable shared schema definitions.
- `schemas/errors/` contains the standard API error envelope and structured error payload definitions.
- `generated/` contains reproducible generated artifacts only; generated output must not become an independent contract source.

### 4. Contract versioning

Public contracts use semantic versioning:

```text
v1.0.0
v1.1.0
v2.0.0
```

Versioning rules:

- Patch versions correct compatible documentation/schema defects without changing meaning.
- Minor versions add backward-compatible fields, operations, optional event fields, or capabilities.
- Major versions introduce breaking changes, including removed/renamed required fields, incompatible behavior, or incompatible event semantics.
- Every breaking change requires migration guidance, compatibility analysis, test evidence, and explicit review.

### 5. Generated clients and types

TypeScript types and a TypeScript client are generated from OpenAPI first.

Python client/type generation is deferred until approved Python workers are introduced by a later phase. Python additions must consume the same OpenAPI source and follow the same compatibility rules.

### 6. Continuous validation

CI must validate:

- OpenAPI 3.1 syntax and references;
- JSON Schema syntax and references;
- event envelope conformance;
- compatibility/breaking changes against the approved baseline;
- generated TypeScript output consistency;
- absence of manual edits to reproducible generated output;
- contract documentation and implementation consistency once runtime services exist.

## Durable event envelope baseline

All durable events must carry a common envelope, at minimum:

```text
id
spec_version
type
timestamp
workspace_id
source
classification
correlation_id
causation_id
payload
```

Events must not contain raw secrets. Large or sensitive objects must be referenced through governed object metadata rather than embedded in payloads.

## P0.03 acceptance criteria

P0.03 is complete only when:

1. The contract directory structure exists and has documented ownership.
2. An OpenAPI 3.1 composition root exists for the Kernel.
3. JSON Schema event directories exist for task, approval, audit, and capability events.
4. Standard shared schemas and error envelope schemas exist.
5. TypeScript generation is reproducible and committed only as generated output.
6. CI validates syntax, references, compatibility, and generated output consistency.
7. Versioning and breaking-change policy is documented.
8. No runtime endpoint or event producer bypasses the contract baseline once implementation begins.

## Implementation order

```text
P0.01 Phase 0 package approval
  ↓
P0.02 Monorepo initialization
  ↓
P0.03 Contract layout using these decisions
  ↓
P0.04 Policy layout
P0.05 Quality gates
P0.06 Runbooks
```
