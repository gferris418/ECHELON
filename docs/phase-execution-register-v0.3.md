# ECHELON Phase Execution Register — v0.3

**Purpose:** authoritative, phase-gated task register. Each task is designed to become one GitHub Project item / issue.

**Canonical spreadsheet:** `docs/assets/ECHELON_Phase_Execution_and_Integration_Register_v0_3.xlsx`

## Operating rules

1. Do not start a child task before its stated parent/dependency is complete.
2. Every implementation task requires a branch, PR, evidence, rollback plan, and documentation update.
3. `Phase -1` must be completed before Phase 0 implementation.
4. Tool selections marked candidate/research must pass the repository evaluation policy before adoption.

## Phase -1

| ID | Parent | Workstream | Task / deliverable | Tool / service | Environment | Gate / dependency |
|---|---|---|---|---|---|---|
| P-1.01 | — | Governance | Freeze v0.3 architecture baseline and release index | GitHub | GitHub cloud | Repository access and owner approval |
| P-1.02 | P-1.01 | Governance | Enable branch protection, required PR review, and required documentation-integrity check | GitHub branch protection | GitHub cloud | Documentation Integrity workflow active |
| P-1.03 | P-1.01 | Security | Enable private vulnerability reporting, secret scanning, and push protection | GitHub security | GitHub cloud | GitHub security features available for repository plan |
| P-1.04 | P-1.01 | Architecture | Complete ADR register with one file per accepted decision | Markdown ADRs | GitHub cloud | v0.1-v0.3 release snapshots |
| P-1.05 | P-1.01 | Capability Governance | Expand capability registry with status, owner, license, data class, review date, and removal plan | Custom ECHELON registry | GitHub cloud | Existing `.echelon/capabilities.yaml` |
| P-1.06 | P-1.01 | Projects | Create GitHub Project fields, views, and issue templates aligned to this workbook | GitHub Projects | GitHub cloud | Phase Tasks reviewed |
| P-1.07 | P-1.01 | Research | Review each candidate repository with the ECHELON evaluation checklist | Research register | GitHub cloud | Capability registry and review template |
| P-1.08 | P-1.01 | UX | Approve architecture and top-down workflow diagrams | SVG + generated diagram | GitHub cloud | Architecture baseline frozen |

## Phase 0

| ID | Parent | Workstream | Task / deliverable | Tool / service | Environment | Gate / dependency |
|---|---|---|---|---|---|---|
| P0.01 | — | Repository | Create monorepo folders and service-boundary contracts | Custom ECHELON Kernel | Mac development + Linux staging | Phase -1 approved |
| P0.02 | P0.01 | Local Runtime | Create reproducible local development stack | Docker Compose / Colima or Docker Desktop | MacBook Air M1 / arm64 | Monorepo service boundaries |
| P0.03 | P0.02 | Data | Provision PostgreSQL database and migration baseline | PostgreSQL | Local Compose → Linux staging | Local runtime operational |
| P0.04 | P0.02 | Runtime State | Provision Redis for cache, queues, sessions and transient coordination | Redis | Local Compose → Linux staging | Local runtime operational |
| P0.05 | P0.02 | Storage | Provision S3-compatible object storage | MinIO | Local Compose → Linux staging | Local runtime operational |
| P0.06 | P0.02 | Networking | Provision internal reverse proxy and local routing | Traefik | Local Compose → Linux staging | Local runtime operational |
| P0.07 | P0.01 | Kernel | Implement capability registry and minimal lifecycle interface | Custom ECHELON Kernel | Mac dev → Linux staging | Service contracts approved |
| P0.08 | P0.01 | Kernel | Implement task engine with approval states and audit records | Custom ECHELON Kernel | Mac dev → Linux staging | Service contracts approved |
| P0.09 | P0.08 | Kernel | Define Intelligence Bus event envelope and first publishers | Custom ECHELON Intelligence Bus | Mac dev → Linux staging | Task engine state model |
| P0.10 | P0.08 | Kernel | Implement health/observability adapter and service registry | Custom ECHELON Kernel | Mac dev → Linux staging | Task engine and service registry |
| P0.11 | P0.01 | UI | Build Mission Control shell with system health, task and timeline views | Custom Mission Control (React/Next.js candidate) | Mac dev → Linux staging | API contracts and UI specification |
| P0.12 | P0.08 | Assistant | Build ORACLE text-mode shell: intent → plan → approval → task → verification | Custom ORACLE Kernel Service | Mac dev → Linux staging | Task engine and audit trail |

## Phase 1

| ID | Parent | Workstream | Task / deliverable | Tool / service | Environment | Gate / dependency |
|---|---|---|---|---|---|---|
| P1.01 | — | Identity | Deploy identity and SSO capability; model roles and workspace access | Authentik | Linux staging / future production | Phase 0 identity interface |
| P1.02 | P1.01 | Secrets | Implement secret reference interface and secret-handling rules | Custom ECHELON secrets interface | Mac dev → Linux staging | Identity and policy model |
| P1.03 | P1.02 | AI Gateway | Integrate 9router as the approved model gateway | 9router | Mac M1 local gateway or Linux staging service | Secret references and provider policy |
| P1.04 | P1.03 | Agent Runtime | Create Hermes Agent adapter with explicit task, event and approval boundaries | Hermes Agent | Linux staging preferred; local M1 only for lightweight testing | 9router connector and runtime evaluation |
| P1.05 | P1.03 | AI Workspace | Evaluate and integrate one approved operator-facing AI workspace | LobeHub candidate | Local dev or Linux staging | Repository evaluation and gateway connector |
| P1.06 | P1.03 | AI Governance | Implement model/provider policy, usage metrics, errors and cost boundaries | Custom policy service + 9router telemetry | Mac dev → Linux staging | Gateway telemetry |
| P1.07 | P1.04 | Approvals | Add sensitive-action approval policies to Mission Control and ORACLE | Custom ECHELON approval policy | Mac dev → Linux staging | Agent adapter and audit trail |

## Phase 2

| ID | Parent | Workstream | Task / deliverable | Tool / service | Environment | Gate / dependency |
|---|---|---|---|---|---|---|
| P2.01 | — | Context | Implement Context Engine with retrieval precedence and provenance | Custom Context Engine | Linux staging; local dev mock allowed | Phase 1 identity, policy and audit controls |
| P2.02 | P2.01 | Knowledge | Deploy RAG/document knowledge capability | RAGFlow candidate | Linux staging; resources assessed before deployment | Context contract and data classification |
| P2.03 | P2.01 | Automation | Deploy one workflow automation capability | n8n | Linux staging | Event schema and secret interface |
| P2.04 | P0.10 | Observability | Deploy metrics, logs and dashboards | Prometheus + Grafana + Loki | Linux staging / future production | Health adapter and infrastructure metrics |
| P2.05 | P2.01 | Voice | Add speech-to-text capability for ORACLE voice requests | Whisper WebUI candidate | Mac M1 local testing or Linux GPU/CPU staging | Voice consent and transcription data policy |
| P2.06 | P2.01 | Memory | Define workspace memory, retention, deletion and export policy | Custom policy + research candidates | GitHub docs + Linux services later | Context Engine and workspace model |
| P2.07 | P2.06 | Screen Context | Run opt-in Screen Intelligence proof of concept | Screenpipe candidate | Mac M1 local only for POC | Consent, exclusion and retention policy |

## Phase 3

| ID | Parent | Workstream | Task / deliverable | Tool / service | Environment | Gate / dependency |
|---|---|---|---|---|---|---|
| P3.01 | — | Internal Tools | Evaluate and integrate a low-code internal application capability | ToolJet candidate | Linux staging | Workspace roles and API contracts |
| P3.02 | P2.03 | Engineering | Evaluate and integrate software engineering specialist | OpenHands candidate | Linux staging with sandboxed worker | Automation, isolation and source-control policy |
| P3.03 | P0.07 | API Quality | Create API Laboratory collections and integration tests | Bruno | Mac dev + CI | Capability APIs and secret references |
| P3.04 | P1.07 | Browser | Evaluate Browser Specialist for approved navigation/research | NanoBrowser candidate | Local browser/Mac POC → Linux sandbox later | Approval policy and domain controls |

## Phase 4

| ID | Parent | Workstream | Task / deliverable | Tool / service | Environment | Gate / dependency |
|---|---|---|---|---|---|---|
| P4.01 | — | Foundry | Finalize Capability Manifest schema and validator | Custom ECHELON Capability Manifest | Mac dev → Linux staging | Capability registry and evaluation policy |
| P4.02 | P4.01 | Foundry | Build capability installation mission with review, dependency and health checks | Custom ECHELON Foundry | Linux staging | Manifest validator and task engine |
| P4.03 | P4.02 | Workspaces | Implement workspace isolation model | Custom ECHELON Workspace Manager | Linux staging | Identity, secrets, storage and context policy |
| P4.04 | P4.02 | Lifecycle | Implement capability update, rollback, disable and removal flows | Custom ECHELON Foundry | Linux staging | Installation mission and backups |

## Phase 5

| ID | Parent | Workstream | Task / deliverable | Tool / service | Environment | Gate / dependency |
|---|---|---|---|---|---|---|
| P5.01 | — | Mobile | Build responsive PWA operator view | Mission Control PWA | Web / iOS Safari / Android browser | Mission Control web baseline |
| P5.02 | P5.01 | Voice | Add mobile voice request and approval experience | ORACLE voice layer | Mobile browser + selected STT/TTS service | Mobile security and voice policy |
| P5.03 | P5.01 | Remote Security | Define secure remote access, alerting and edge-device policy | Traefik + Authentik + policy | Linux staging / future production | Identity, routing, monitoring and approval policy |
| P5.04 | P5.03 | Resilience | Implement backup, restore and disaster-recovery drills | PostgreSQL + MinIO + documentation | Linux staging / future production | Storage, database and recovery runbooks |
