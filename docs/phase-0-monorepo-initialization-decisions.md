# ECHELON P0.02 Monorepo Initialization Decisions

**Status:** Confirmed by product owner  
**Phase:** P0.02 — Initialize monorepo  
**Scope:** Repository structure and local engineering baseline before application code

## Confirmed decisions

### 1. Repository structure

ECHELON uses one modular monorepo with the following top-level structure:

```text
apps/
packages/
infrastructure/
docs/
capabilities/
```

`capabilities/` is created from the beginning as the future home for approved capability manifests, templates, compatibility metadata, and lifecycle records. It does not authorize installation of any capability by itself.

### 2. Package manager

`pnpm` is the required JavaScript/TypeScript workspace package manager.

It is used for dependency installation, workspace linking, scripts, lockfile management, and reproducible CI execution.

### 3. Initial applications

```text
apps/
├── kernel-api/        # NestJS Kernel API
├── mission-control/   # Next.js operator interface
└── worker/            # Node.js task/event worker initially
```

Python workers are not created by default. They are added only when an approved Phase 1 or Phase 2 specialist workload requires them.

### 4. Shared packages

```text
packages/
├── contracts/  # OpenAPI, JSON Schema, generated/shared API types
├── policy/     # declarative policy structures, fixtures, evaluators
├── config/     # typed shared configuration and environment contracts
├── ui/         # shared interface components and design primitives
└── types/      # cross-application domain types with controlled ownership
```

Apps must not import another application's internals. Shared code belongs in a package only when it has a defined owner and stable cross-app use.

### 5. Local runtime standard

For macOS development, **OrbStack + Docker Compose** is the standard local runtime.

Docker Desktop compatibility must be retained for other users and environments. Runtime documentation must preserve the existing Apple Silicon `linux/arm64` policy and container-hardening baseline.

### 6. Programming and quality baseline

The initial TypeScript engineering stack is:

```text
TypeScript strict mode
ESLint
Prettier
Vitest
Playwright
```

These tools are required from the first implementation commit. CI must enforce formatting, linting, type checks, unit tests, browser/end-to-end tests where applicable, contract validation, and other approved quality gates.

## P0.02 acceptance criteria

P0.02 is complete only when:

1. The monorepo structure exists and matches this document.
2. pnpm workspaces install reproducibly from the lockfile.
3. Each initial application has an isolated build/test entry point.
4. Shared packages have explicit ownership and import boundaries.
5. OrbStack/Docker Compose local development is documented and tested on Apple Silicon.
6. Docker Desktop compatibility is documented.
7. Strict TypeScript, ESLint, Prettier, Vitest, and Playwright are configured and executed by CI.
8. No application service or runtime capability is introduced before Phase -1 governance approval and P0.01 completion.

## Implementation order

```text
P0.01 Phase 0 package approval
  ↓
P0.02 Repository initialization using these decisions
  ↓
P0.03 Contracts layout
P0.04 Policy layout
P0.05 Quality gates
P0.06 Runbooks
```
