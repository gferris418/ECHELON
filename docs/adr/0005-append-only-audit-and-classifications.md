# ADR-0005 — Append-only audit, four classifications, and policy-based retention

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

Maintain an append-only PostgreSQL audit ledger. Apply platform classifications: Public, Internal, Confidential, Restricted. Bind retention rules to record type and classification; support legal hold and auditable deletion.

## Why

ECHELON needs trustworthy history and controlled data lifetime. Corrections create linked events rather than rewriting records.

## Consequences

- Audit ledger is append-only for normal application roles.
- Classifications are enforced at the platform level, not per-workspace.
- Deletion propagates to copies, caches, and indexes where technically possible.
