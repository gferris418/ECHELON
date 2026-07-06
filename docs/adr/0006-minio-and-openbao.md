# ADR-0006 — MinIO object storage and OpenBao secrets boundary

**Status:** Accepted  
**Date:** 2026-07-06

## Decision

Use MinIO as self-hosted S3-compatible storage now, retaining cloud S3-compatible portability later. PostgreSQL owns object metadata. OpenBao is the operational secrets boundary; local developer bootstrap may use macOS Keychain and ignored environment files.

## Why

Object storage and secret handling stay portable, auditable, and separate from application business data.

## Consequences

- MinIO is a Phase 0 baseline service.
- OpenBao is deferred to Phase 4; local dev uses .env + macOS Keychain.
- No secrets in source control, logs, events, or images.
