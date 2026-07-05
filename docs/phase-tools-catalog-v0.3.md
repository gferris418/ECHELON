# ECHELON Phase Tasks and Tool Catalogue — v0.3

This catalogue supplements `docs/phase-execution-register-v0.3.md` and `docs/pending-tasks.md`.

**Status meanings:**
- **Core:** permanent ECHELON component or selected baseline infrastructure.
- **Candidate:** must pass repository evaluation before adoption.
- **Research:** reference only; not approved for installation.

## Phase -1 — Constitution and controls

| Task IDs | Remaining work | Tool / service | Link | Environment | Status |
|---|---|---|---|---|---|
| P-1.01–P-1.03 | Freeze baseline; protect `main`; enable security reporting and secret protection | GitHub | https://github.com/ | GitHub Cloud | Core |
| P-1.04 | Create individual ADR records | Markdown + GitHub | https://docs.github.com/ | GitHub Cloud | Core |
| P-1.05 | Expand capability registry and review metadata | Custom ECHELON registry | Internal repository files | GitHub Cloud | Core |
| P-1.06 | Configure issue templates, fields, views, and roadmap | GitHub Projects | https://docs.github.com/en/issues/planning-and-tracking-with-projects | GitHub Cloud | Core |
| P-1.07 | Review external projects before adoption | Custom evaluation checklist | Internal repository files | GitHub Cloud | Core |
| P-1.08 | Approve architecture and workflow diagrams | SVG / Markdown assets | Internal repository files | GitHub Cloud | Core |

## Phase 0 — Kernel and operator foundation

| Task IDs | Remaining work | Tool / service | Link | Environment | Status |
|---|---|---|---|---|---|
| P0.01, P0.07–P0.10 | Create monorepo contracts, capability lifecycle, task engine, Intelligence Bus, service health | Custom ECHELON Kernel | Internal repository | Mac M1 development → Linux staging | Core |
| P0.02 | Create reproducible development stack | Docker Compose / Colima | https://github.com/docker/compose ; https://github.com/abiosoft/colima | MacBook Air M1, arm64 | Candidate baseline |
| P0.03 | Database and migrations | PostgreSQL | https://github.com/postgres/postgres | Local Compose → Linux staging | Selected baseline |
| P0.04 | Cache, queues, sessions | Redis | https://github.com/redis/redis | Local Compose → Linux staging | Selected baseline |
| P0.05 | Object storage | MinIO | https://github.com/minio/minio | Local Compose → Linux staging | Selected baseline |
| P0.06 | Internal routing and TLS model | Traefik | https://github.com/traefik/traefik | Local Compose → Linux staging | Selected baseline |
| P0.11 | Build operator dashboard, tasks, timeline, health views | Custom Mission Control; React/Next.js selection pending | https://react.dev/ ; https://nextjs.org/ | Mac M1 development → Linux staging | Core / selection pending |
| P0.12 | Implement typed request → plan → approval → execute → verify flow | Custom ORACLE service | Internal repository | Mac M1 development → Linux staging | Core |

## Phase 1 — Controlled AI execution

| Task IDs | Remaining work | Tool / service | Link | Environment | Status |
|---|---|---|---|---|---|
| P1.01 | Identity, SSO, role and workspace-access model | Authentik | https://github.com/goauthentik/authentik | Linux staging → production | Selected baseline |
| P1.02 | Secret references and secret-handling policy | Custom ECHELON secrets interface | Internal repository | Mac M1 development → Linux staging | Core |
| P1.03 | Model gateway adapter and provider policy | 9router | https://9router.com/ | Mac M1 gateway or Linux staging | Selected baseline |
| P1.04 | Agent runtime adapter, task/event/approval boundary | Hermes Agent | Repository to be confirmed during P-1.07 | Linux staging; local M1 only for lightweight test | Candidate |
| P1.05 | One operator-facing AI workspace | LobeHub | https://github.com/lobehub/lobehub | Local development or Linux staging | Candidate |
| P1.06 | Usage, errors, cost boundaries and provider telemetry | Custom policy service + 9router telemetry | Internal + 9router | Mac M1 development → Linux staging | Core |
| P1.07 | Sensitive-action approval policies | Custom ECHELON approval policy | Internal repository | Mac M1 development → Linux staging | Core |

## Phase 2 — Intelligence, knowledge, automation and observability

| Task IDs | Remaining work | Tool / service | Link | Environment | Status |
|---|---|---|---|---|---|
| P2.01 | Bounded context assembly, retrieval precedence, citations and provenance | Custom Context Engine | Internal repository | Linux staging; local mock allowed | Core |
| P2.02 | Document and RAG knowledge capability | RAGFlow | https://github.com/infiniflow/ragflow | Linux staging; capacity review required | Candidate |
| P2.03 | Workflow automation capability | n8n | https://github.com/n8n-io/n8n | Linux staging | Candidate |
| P2.04 | Metrics, logs and dashboards | Prometheus + Grafana + Loki | https://github.com/prometheus/prometheus ; https://github.com/grafana/grafana ; https://github.com/grafana/loki | Linux staging → production | Selected baseline |
| P2.05 | Speech-to-text for ORACLE voice requests | Whisper WebUI | https://github.com/jhj0517/Whisper-WebUI | Mac M1 test or Linux staging | Candidate |
| P2.06 | Memory, retention, deletion, export and workspace policy | Custom ECHELON policy | Internal repository | GitHub documentation → Linux services | Core |
| P2.07 | Opt-in local screen context proof of concept | Screenpipe | https://github.com/screenpipe/screenpipe | Mac M1 local only | Candidate |

## Phase 3 — Builder capabilities

| Task IDs | Remaining work | Tool / service | Link | Environment | Status |
|---|---|---|---|---|---|
| P3.01 | Low-code internal application capability | ToolJet | https://github.com/ToolJet/ToolJet | Linux staging | Candidate |
| P3.02 | Sandboxed software engineering specialist | OpenHands | https://github.com/All-Hands-AI/OpenHands | Linux staging sandbox | Candidate |
| P3.03 | Versioned API collections and integration testing | Bruno | https://github.com/usebruno/bruno | Mac M1 development + CI | Candidate |
| P3.04 | Controlled browser research/navigation specialist | NanoBrowser | https://github.com/nanobrowser/nanobrowser | Mac browser proof of concept → Linux sandbox | Candidate |

## Phase 4 — Foundry and workspace lifecycle

| Task IDs | Remaining work | Tool / service | Link | Environment | Status |
|---|---|---|---|---|---|
| P4.01 | Capability manifest schema and validation | Custom ECHELON Capability Manifest | Internal repository | Mac M1 development → Linux staging | Core |
| P4.02 | Capability installation mission, review, dependency and health checks | Custom ECHELON Foundry | Internal repository | Linux staging | Core |
| P4.03 | Workspace isolation: identity, secrets, storage, knowledge and permissions | Custom ECHELON Workspace Manager | Internal repository | Linux staging | Core |
| P4.04 | Update, rollback, disable and removal lifecycle | Custom ECHELON Foundry | Internal repository | Linux staging | Core |

## Phase 5 — Mobile, remote and resilience

| Task IDs | Remaining work | Tool / service | Link | Environment | Status |
|---|---|---|---|---|---|
| P5.01 | Responsive operator PWA | Custom Mission Control PWA | Internal repository | Web; iOS Safari; Android browser | Core |
| P5.02 | Mobile voice request and approval | ORACLE voice layer + selected STT/TTS capability | Internal + Phase 2 selection | Mobile browser | Core / depends on Phase 2 |
| P5.03 | Secure remote access, alerts and edge-device policy | Traefik + Authentik + custom policy | https://github.com/traefik/traefik ; https://github.com/goauthentik/authentik | Linux staging → production | Selected baseline |
| P5.04 | Backup, restore and disaster-recovery drills | PostgreSQL + MinIO + documented runbooks | https://github.com/postgres/postgres ; https://github.com/minio/minio | Linux staging → production | Selected baseline |

## Installation rules

1. Prefer Docker Compose for local reproducibility; use arm64-compatible images for the M1 MacBook Air.
2. Run permanent multi-service capabilities in Linux staging before production.
3. Do not store API keys in Compose files, GitHub issues, or Markdown. Use secret references.
4. Candidate tools require an adopted decision record, license/security review, deployment plan, health check, backup/removal plan, and integration contract before installation.
5. Every implementation is linked to a pending issue, pull request, verification evidence, and rollback plan.
