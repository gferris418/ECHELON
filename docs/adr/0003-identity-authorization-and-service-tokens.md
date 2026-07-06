# ADR-0003 — Identity, authorization, and service tokens

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

Authentik owns authentication/MFA/session identity. ECHELON owns workspace authorization, RBAC plus scoped policy, classifications, approval authority, and capability rights. Capabilities use short-lived workspace-scoped tokens.

## Why

It separates authentication from operational authority and removes the risk of shared long-lived module keys.

## Consequences

- Authentik is a Phase 1 dependency, not Phase 0.
- Kernel implements authorization natively from Phase 0.
- No global API keys; tokens are always scoped to workspace + action + expiry.
