# ADR-0008 — Capability trust and policy-based external authority

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

Every capability requires a manifest and trust tier. Research installations stay isolated. GitHub URL auto-install is prohibited. External authority is policy-based, starting read-only/draft-first; high-risk actions always require human approval.

## Why

The platform can adopt tools without giving unreviewed code, data access, or external commitment power to the operating environment.

## Consequences

- Capability manifest is required before any integration.
- Research and production capabilities are strictly separated.
- Human approval is a Kernel record, not a chat message.
- Auto-install from arbitrary URLs is prohibited.
