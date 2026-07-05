# ECHELON Governance and Operations Controls

## Mandatory references

- [Mac development and container policy](mac-development-and-container-policy.md)
- [Container runtime hardening standard](container-runtime-hardening.md)
- [GitHub repository settings checklist](github-repository-settings-checklist.md)
- [Repository governance and container audit](audits/2026-07-06-repository-governance-container-audit.md)
- [Phase execution register](phase-execution-register-v0.3.md)
- [Pending task backlog](pending-tasks.md)

## Enforcement path

1. The `.echelon/` machine-readable context is read before design or implementation.
2. An implementation issue or capability evaluation documents the proposed work.
3. A branch and pull request carry architecture, security, container, verification, and rollback evidence.
4. The Documentation Integrity workflow verifies the baseline, policies, ignored local paths, and immutable action references.
5. GitHub branch protection and security features are verified manually using the repository settings checklist.

This control set does not authorize Phase 0 implementation while Phase -1 governance issues remain open.
