# ADR-0007 — Contract-first APIs, SSE realtime, and Mission Control boundary

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

Use OpenAPI 3.1 for HTTP APIs and JSON Schema for events. Mission Control is the custom primary operator shell. Use authenticated workspace-scoped SSE for Phase 0 realtime.

## Why

This supports TypeScript and Python consumers, keeps external tools replaceable, and avoids early WebSocket/GraphQL/realtime vendor complexity.

## Consequences

- OpenAPI is the single source of truth for HTTP contracts.
- JSON Schema defines durable event contracts separately.
- SSE is used for realtime; WebSocket/GraphQL deferred.
- Mission Control is a consumer of Kernel APIs, not an authority.
