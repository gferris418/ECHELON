# ECHELON Repository Baseline Assessment

**Date:** 2026-07-06

## Scope

Repository governance, documentation integrity, release history, security policy, contributor controls, and AI anti-drift readiness.

## Findings and remediation status

| Finding                                         | Severity | Remediation                                                                          |
| ----------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| Root README was incomplete                      | Critical | Fixed: root README now states baseline, phase, source of truth, and entry links.     |
| Security policy was a placeholder template      | Critical | Fixed: replaced with pre-release reporting and scope policy.                         |
| Capability registry missing                     | High     | Fixed: `.echelon/capabilities.yaml` created.                                         |
| ADR register missing                            | High     | Fixed: `docs/adr/README.md` created.                                                 |
| Contributor protocol missing                    | High     | Fixed: `CONTRIBUTING.md` created.                                                    |
| Pull request evidence template missing          | High     | Fixed: `.github/pull_request_template.md` created.                                   |
| Documentation integrity CI missing              | High     | Fixed: `.github/workflows/documentation-integrity.yml` created.                      |
| Branch protection not verified                  | High     | Manual GitHub repository setting required.                                           |
| Secret scanning not verified                    | High     | Manual GitHub repository setting required.                                           |
| Direct pushes to main occurred during bootstrap | Medium   | Future implementation changes must use pull requests; enforce via branch protection. |

## Required manual GitHub settings

1. Protect `main`: require pull request, approval, resolved conversations, and passing checks.
2. Enable secret scanning and push protection where available.
3. Enable private vulnerability reporting.
4. Require the `Documentation integrity / verify` status check before merge.

## Decision

Phase -1 remains active. Phase 0 may begin only after the listed GitHub settings are enabled and the documentation integrity workflow has passed on a pull request.
