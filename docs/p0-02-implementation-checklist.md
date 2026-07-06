# P0.02 Monorepo Completion Checklist

## Repository structure

- [x] `apps/kernel-api/`
- [x] `apps/mission-control/`
- [x] `apps/worker/`
- [x] `packages/contracts/`
- [x] `packages/policy/`
- [x] `packages/config/`
- [x] `packages/ui/`
- [x] `packages/types/`
- [x] `capabilities/`
- [x] `infrastructure/compose/`

## Tooling

- [x] pnpm workspace file
- [x] root package manifest
- [x] strict TypeScript baseline
- [x] root command contract
- [x] Prettier configuration baseline
- [x] Vitest workspace baseline
- [x] Playwright configuration baseline
- [x] application package-manifest baseline
- [x] application TypeScript project baseline
- [ ] dependency lockfile and installation evidence
- [ ] ESLint configuration
- [ ] Prettier installation and formatting evidence
- [ ] Vitest installation and test evidence
- [ ] Playwright installation and test evidence

## Runtime

- [ ] Kernel API bootstrap
- [ ] Mission Control bootstrap
- [ ] worker bootstrap
- [ ] Compose service definition
- [ ] Apple Silicon local verification

## Required evidence

- [ ] `pnpm install --frozen-lockfile`
- [ ] formatting check
- [ ] lint check
- [ ] type check
- [ ] test check
- [ ] local startup and shutdown check

P0.02 is not complete until every item is verified in a pull request.
