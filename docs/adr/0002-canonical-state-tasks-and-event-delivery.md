# ADR-0002 — Canonical state, tasks, and event delivery

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

PostgreSQL is canonical for tasks, approvals, audit, metadata, and outbox records. Redis handles dispatch, locks, delayed jobs, cache, and transient coordination. Use in-process domain events plus a PostgreSQL transactional outbox.

## Why

State, audit, and emitted event can be committed atomically. A dedicated broker and full event sourcing are deferred until evidence justifies them.

## Consequences

- PostgreSQL owns authoritative state; Redis is ephemeral and recoverable.
- Transactional outbox ensures at-least-once event delivery.
- No dedicated event broker until Phase 2 or later.
