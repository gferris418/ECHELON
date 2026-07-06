# AGENTS.md

## Working rules

- GitHub is the canonical source of truth.
- Read the active architecture, ADRs, and phase checklist before implementation.
- Keep each change scoped and reviewable.
- Do not add secrets, external integrations, public exposure, or autonomous actions without approved policy.
- Add focused tests for executable logic and report blocked verification honestly.
- Keep local services loopback-bound by default.

## Layout

- `apps/` deployable application boundaries
- `packages/` shared contracts and policy
- `infrastructure/` runtime definitions
- `capabilities/` governed integrations
- `docs/` architecture and runbooks

## Current status

Phase 0 is scaffold-only. Placeholder source files are not production behavior.
