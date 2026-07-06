# ECHELON Phase 0 Wire Diagram

**Status:** Architecture reference  
**Scope:** Approved Phase 0 baseline

```mermaid
flowchart TB
    U[Human operators\nDesktop · Browser · PWA] --> MC[Mission Control\nNext.js operator interface]
    MC -->|HTTPS API| K[ECHELON Kernel API\nNestJS modular monolith]
    K -->|OIDC / MFA| AU[Authentik\nAuthentication]
    K -->|Policy decision| P[Kernel Policy Module\nRBAC + scoped rules]
    K -->|Tasks / approvals| T[Task & Approval Modules]
    K -->|Append-only records| A[Audit Ledger]
    K -->|Object metadata| OMD[Object Metadata Module]
    K -->|Capability records| CR[Capability Registry]
    K -->|Transactional commit| OB[PostgreSQL Outbox]

    T --> PG[(PostgreSQL\nCanonical state)]
    P --> PG
    A --> PG
    OMD --> PG
    CR --> PG
    OB --> PG

    OB --> W[Task Worker / Event Dispatcher]
    W --> R[(Redis\nQueue · locks · cache)]
    W --> RT[Realtime Projection]
    RT -->|Workspace-scoped SSE| MC

    OMD --> M[(MinIO\nArtifacts and objects)]
    K --> SB[OpenBao\nOperational secrets]
    K --> TR[Traefik\nApproved gateway / routing]

    C[Approved or research capability] -->|Short-lived scoped token| K
    C -. research isolation .-> RW[Research workspace\nNo production secrets/data]

    subgraph Governance[Cross-cutting governance]
      DC[Classification\nPublic · Internal · Confidential · Restricted]
      RET[Retention / legal hold / deletion]
      APP[Human approval for protected actions]
      CI[Contracts and CI\nOpenAPI + JSON Schema]
    end

    DC --> K
    RET --> K
    APP --> T
    CI --> K
```

## Reading the diagram

- **Mission Control** renders state and submits commands. It is not an authority layer.
- **ECHELON Kernel** is authoritative for workspaces, policy, tasks, approvals, audit, capabilities, and governed references.
- **PostgreSQL** is canonical. **Redis** is transient coordination only.
- Business mutation, audit record, and event outbox are committed atomically.
- **SSE** provides safe, workspace-filtered UI updates; it is not the source of truth.
- **MinIO** holds object bytes; PostgreSQL holds the corresponding metadata and control records.
- **Authentik** authenticates; ECHELON authorizes. **OpenBao** is the operational secrets boundary.
- Capabilities are replaceable and receive short-lived, workspace-scoped identities.

## Phase 0 exclusions

Cloud LLM routing, full RAG, browser automation, autonomous external actions, voice, screen intelligence, and Foundry installation are not active in this wire diagram. They are later capabilities and remain subject to the Phase 0 controls shown above.
