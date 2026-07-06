# AGENTS Improvement Spec

## Current assessment

### Good

- The repository has a documented Phase 0 structure.
- Workspace directories and basic TypeScript boundaries exist.
- Quality-tool configuration baselines exist for Prettier, Vitest, and Playwright.

### Missing

- `AGENTS.md` instructions for coding agents.
- A reproducible devcontainer.
- An automation manifest for validation commands.
- Package identities required by the root `pnpm --filter @echelon/policy` command.
- An executable regression test for the workspace quality-gate contract.

### Wrong / impactful

The root `policy:test` command filters on `@echelon/policy`, but the policy package has no `name`. pnpm cannot reliably resolve that workspace target, blocking a required quality gate before policy logic is introduced.

## Improvement plan

1. Give every workspace package a stable scoped name and a minimal test command where applicable.
2. Add a focused Node built-in regression test confirming the policy workspace contract.
3. Provide a Node 22 devcontainer with non-root development defaults and no automatic dependency installation until the lockfile exists.
4. Provide a small automation manifest for safe validation tasks.
5. Keep application runtime, external integrations, secrets, and public exposure out of this change.

## Acceptance criteria

- `@echelon/policy` exists as a workspace package.
- The policy package exposes a test command.
- The focused regression test passes with Node's built-in test runner.
- Devcontainer configuration parses as JSON.
- Automation manifest parses as YAML.
