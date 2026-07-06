# P0.02 Monorepo Completion Checklist

## Repository structure

- [x] `apps/kernel-api/`
- [x] `apps/mission-control/`
- [x] `apps/worker/`
- [x] `packages/contracts/`
- [x] `packages/policy/`
- [x] `packages/config/`
- [x] `packages/ui/`
- [ ] `packages/types/`
- [x] `capabilities/`
- [ ] `infrastructure/compose/`

## Tooling

- [x] pnpm workspace file
- [x] root package manifest
- [x] strict TypeScript baseline
- [ ] root scripts and dependency lockfile
- [ ] ESLint configuration
- [ ] Prettier configuration
- [ ] Vitest configuration
- [ ] Playwright configuration

## Runtime

- [ ] Kernel API bootstrap
- [ ] Mission Control bootstrap
- [ ] worker bootstrap
- [ ] Compose baseline
- [ ] Apple Silicon local verification

## Required evidence

- [ ] `pnpm install --frozen-lockfile`
- [ ] formatting check
- [ ] lint check
- [ ] type check
- [ ] test check
- [ ] local startup and shutdown check

P0.02 is not complete until every item is verified in a pull request.