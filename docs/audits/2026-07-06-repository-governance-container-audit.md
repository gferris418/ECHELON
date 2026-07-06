# ECHELON Repository Governance and Container Audit

**Date:** 2026-07-06

## Scope

This is a repository and visible GitHub-configuration audit. It is not a host forensic investigation, penetration test, incident-response analysis, or verification of the user's Mac, OrbStack installation, GitHub branch-protection settings, or GitHub security feature settings.

## Evidence reviewed

- Repository metadata and permissions visible to the connector.
- ECHELON baseline, governance, contribution, capability, workflow, security, and local development policy files.
- Open Phase -1 governance issues and phase backlogs.

## Findings and remediation

| ID   | Area               | Finding                                                                                                                                                                                        | Severity     | Repository remediation                                                                                                                            |
| ---- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| A-01 | CI                 | Documentation workflow checked only file presence and a few strings. It did not verify workflow action pinning, shell strictness, policy references, or critical governance files added later. | High         | Harden workflow with least-privilege permissions, checkout credential removal, timeout, concurrency, pinned-action validation, and policy checks. |
| A-02 | Secrets            | `.gitignore` omitted `.env`, credentials, certificate keys, local data, backups, Compose local overrides, and common generated artifacts.                                                      | Critical     | Replace with ECHELON-specific ignore rules and an explicit `.env.example` exception.                                                              |
| A-03 | Container safety   | Local policy required one service per container but did not prohibit privileged mode, Docker socket mounts, host networking, unrestricted host mounts, or default public port exposure.        | High         | Add runtime hardening controls and mandatory exception record.                                                                                    |
| A-04 | Local storage      | Policy named data/secrets/backups paths but did not define permissions, secret-mount handling, retention, or separation between committed and local Compose overrides.                         | High         | Add permission, retention, and mount rules; standardize committed versus ignored Compose configuration.                                           |
| A-05 | Resource control   | No per-service CPU/memory/disk limits, health-check failure response, or image update/rollback evidence requirement.                                                                           | Medium       | Add resource, health, image provenance, and rollback requirements.                                                                                |
| A-06 | Supply chain       | Candidate repositories were listed without a structured install record or explicit immutable image/source record.                                                                              | High         | Add machine-readable module installation record template and CI requirement for adoption changes.                                                 |
| A-07 | Architecture drift | `.echelon` core context did not reference the local development policy, allowing agents to miss the Mac/OrbStack constraints.                                                                  | Medium       | Add local development and container policy references to machine-readable context and CI.                                                         |
| A-08 | Workflow ambiguity | Phase backlog issues group future tasks, but implementation evidence and rollout criteria were not standardized in an issue template.                                                          | Medium       | Add implementation and capability-evaluation issue forms.                                                                                         |
| A-09 | GitHub settings    | Branch protection, private vulnerability reporting, secret scanning, push protection, and required check enforcement cannot be confirmed or changed through the available connector.           | High, manual | Retain existing Phase -1 issues and add a manual verification checklist.                                                                          |

## Residual risks requiring manual confirmation

1. `main` protection rules must block direct pushes, require review, require conversation resolution, require the Documentation Integrity check, and block force pushes.
2. Private vulnerability reporting, secret scanning, and push protection must be enabled if supported for the repository plan.
3. OrbStack must be the active Docker context on the user's Mac.
4. Local secret, data, and backup directories must exist with correct permissions and must not be synchronized through cloud storage.
5. Before any container is started, the installation record and runtime hardening requirements must be completed.

## Audit conclusion

The repository is still in Phase -1. The documentation baseline is coherent, but the prior controls were advisory rather than enforceable. The hardening changes in this audit branch strengthen repository hygiene, container safety, supply-chain traceability, CI validation, and operational accountability. They do not authorize Phase 0 implementation.
