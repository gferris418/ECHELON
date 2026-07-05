# Contributing to Project ECHELON

## Mandatory workflow

1. Read `docs/releases/v0.3.md`, relevant ADRs, `.echelon/` context, and the active phase.
2. Search the repository before proposing a duplicate capability, interface, or service.
3. State facts, assumptions, inferences, and proposals separately.
4. Define scope, dependencies, security impact, tests, rollback plan, and documentation updates.
5. Work on a branch and open a pull request. Do not push implementation directly to `main`.
6. Update documentation, manifests, and ADRs in the same pull request as implementation.
7. Provide verification evidence. Do not claim runtime success without it.

## Required pull-request evidence

- Relevant Bible/ADR/phase references.
- Acceptance criteria.
- Tests or a reason tests do not apply.
- Security and secret-handling impact.
- Rollback or recovery plan.
- Documentation changes.

## Prohibited

- Committing secrets, API keys, personal data, or production exports.
- Adding an external repository only because it has a polished UI.
- Introducing an overlapping tool without an approved exception.
- Changing kernel boundaries without an ADR.
