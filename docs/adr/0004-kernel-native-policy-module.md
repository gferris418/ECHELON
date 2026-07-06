# ADR-0004 — Kernel-native policy module and two-person production governance

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

Policies are declarative, stored in Git, evaluated through one Kernel interface, and return `allow`, `deny`, or `approval_required`. Production policy activation requires a different approver from the editor.

## Why

This keeps policy understandable, testable, and auditable while avoiding early OPA/Rego complexity. OPA remains an optional future implementation behind the same interface.

## Consequences

- Policy module is part of the Kernel from Phase 0.
- Emergency overrides are time-limited and require review.
- OPA can replace the backend later without changing the interface.
