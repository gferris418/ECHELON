# ADR-0001 — Modular monolith and hybrid language model

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

Use a NestJS modular-monolith Kernel/API, a separate Next.js Mission Control application, and isolated Python worker services only when justified. Keep them in one monorepo and deploy each application separately.

## Why

It preserves a simple Phase 0 transactional boundary while supporting later AI/specialist workloads without premature microservice coordination.

## Consequences

- Kernel remains a single deployable unit with clear module boundaries.
- Mission Control is a separate process; it must not contain business authority.
- Python workers are deferred until a concrete need is identified.
