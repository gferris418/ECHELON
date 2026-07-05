# ECHELON Developer Guide

## 1. Current state

ECHELON is in **Phase -1: architecture and documentation control**. The repository does not yet contain an application runtime, Compose stack, API server, or automated test suite.

This guide defines the required development workflow and local conventions for Phase 0. It does not imply that the listed services are installed or operational.

## 2. Local prerequisites

| Requirement | Purpose |
|---|---|
| macOS on Apple Silicon | Primary development host |
| OrbStack Docker | Default container runtime |
| Git | Source control and pull-request workflow |
| Docker Compose compatibility through OrbStack | Future local service profiles |
| GitHub access to `gferris418/ECHELON` | Authoritative project source |

Do not mix OrbStack with Docker Desktop, Colima, Rancher Desktop, or Podman for the same ECHELON environment unless an approved exception is recorded.

## 3. Required local location

All ECHELON source, configuration, local data, secrets, and archives must live below:

```text
/Users/babuislam/Developer/ECHELON/
```

Recommended layout:

```text
/Users/babuislam/Developer/ECHELON/
├── platform/          # Kernel, Mission Control, ORACLE
├── capabilities/      # Approved capability adapters only
├── infrastructure/    # Compose and service configuration
├── research/          # Cloned evaluation-only repositories
├── data/              # Ignored local development state
├── secrets/           # Ignored local secrets; owner-only permissions
├── backups/           # Ignored test backups
├── scripts/           # Bootstrap and operational scripts
├── docs/              # Local documentation workspace
└── archives/          # Approved local exports/releases
```

`data/`, `secrets/`, `backups/`, archives, local Compose overrides, and `.env` files must never be committed.

## 4. Project structure

| Path | Role | Current status |
|---|---|---|
| `.echelon/` | Machine-readable architecture, capability, quality, and runtime rules | Active |
| `docs/releases/` | Historical baseline snapshots | Active |
| `docs/adr/` | ADR register; individual ADRs still pending | Partial |
| `docs/` | Architecture, operating policy, task plans, reviews, guides | Active |
| `.github/workflows/` | Documentation Integrity workflow | Active |
| `.github/ISSUE_TEMPLATE/` | Capability evaluation and implementation task templates | Active |
| Application source directories | Kernel and capability source | Not created |
| Container manifests | Local service orchestration | Not created |
| Test directories | Automated tests | Not created |

## 5. Mandatory development workflow

1. Read `docs/releases/v0.3.md`, `.echelon/platform.yaml`, the active phase, applicable ADRs, and the capability registry.
2. Open or update a GitHub implementation issue linked to the execution-register task ID.
3. Write scope, acceptance criteria, dependencies, security impact, data impact, rollback, and documentation changes.
4. For an external tool, complete a capability-evaluation issue and module installation record before adoption.
5. Create a branch. Do not implement directly on `main`.
6. Implement the smallest verifiable change.
7. Add or update tests, contracts, operational evidence, and documentation in the same pull request.
8. Pass the relevant quality gates and Documentation Integrity workflow.
9. Obtain approval and merge through the protected-branch process.

## 6. Container workflow

The intended Compose profile split is:

| Profile | Intended contents | Local rule |
|---|---|---|
| `core` | PostgreSQL, Redis, MinIO, Traefik | First Phase 0 local baseline |
| `platform` | Kernel API, Mission Control, ORACLE, task worker | Runs with `core` after contracts exist |
| `ai` | 9router and one approved adapter | Cloud models remain the default |
| `observability` | Prometheus, Grafana, Loki | Enable for diagnostics or staging validation |
| `capabilities` | One approved capability proof of concept | One heavyweight capability at a time locally |

Every service must have a health check, resource limits, narrow mounts, localhost-only port binding by default, and a non-root runtime where supported. Do not use privileged containers, host networking, Docker-socket mounts, or broad home-directory mounts.

## 7. Testing approach

No application tests exist today. Before Phase 0 exit, add and pass:

- formatting and lint checks;
- unit tests for Kernel services;
- API and event contract tests;
- database migration and rollback tests;
- Compose configuration validation;
- container health and non-root checks;
- build-context checks proving secrets are excluded.

Later phases add authorization, approval, provenance, workspace isolation, retention/deletion, backup/restore, resilience, and rollback tests. See `.echelon/quality-gates.yaml`.

## 8. Common troubleshooting

| Symptom | Likely cause | Correct response |
|---|---|---|
| Docker command targets the wrong runtime | Multiple Docker tools installed | Confirm OrbStack is the active context; do not mix runtimes. |
| Service cannot bind its port | Another local application uses it | Bind to localhost, choose a documented alternative port, update the module record. |
| Mac becomes slow or memory pressured | Too many profiles/heavy services active | Stop nonessential profiles; run one heavyweight capability; use Linux staging for full-stack tests. |
| Secret appears in a file or log | Improper local configuration | Revoke/rotate the secret, remove it from history if committed, and record the incident privately. |
| Capability lacks a source revision, image digest, or rollback plan | Adoption review incomplete | Do not install it; complete the capability record and evaluation first. |
| CI rejects a workflow action | Action not pinned to a 40-character SHA | Use an approved immutable commit SHA with a human-readable version comment. |

## 9. Definition of done

A development task is done only when its acceptance criteria, tests, health evidence, documentation, rollback plan, and approved pull request are complete. A running container alone is not evidence of a complete or safe implementation.
