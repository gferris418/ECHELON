# ECHELON Container Runtime Hardening Standard

This standard is mandatory for every ECHELON Compose service and supplements `docs/mac-development-and-container-policy.md`.

## 1. Default deny rules

A service must not use any of the following without a documented, approved exception in its module installation record:

- `privileged: true`
- `network_mode: host`
- Docker socket mounts
- mounting `/`, `/Users`, or the entire user home directory
- exposing a port on all interfaces by default
- running as root when the image supports a non-root user
- writable root filesystem when the service can operate read-only
- unpinned third-party image references in staging or production

## 2. Network and port exposure

- Use one internal Compose network by default.
- Expose ports only when required by a documented integration.
- Bind local development ports to `127.0.0.1` unless external LAN access is explicitly approved.
- Only Traefik may publish user-facing HTTP/S routes after a documented routing decision.
- Databases, Redis, MinIO admin endpoints, identity administration, and observability dashboards must not be publicly exposed by default.

## 3. Filesystem and permissions

- Use narrow bind mounts and make them read-only unless writes are essential.
- Mount local secrets as read-only files or controlled environment references; never bake them into an image.
- The local `secrets/` directory must have owner-only access.
- The local `data/` and `backups/` directories must be excluded from Git and cloud synchronization.
- Define an explicit backup and restore procedure before a stateful service is declared operational.

## 4. Process hardening

Where compatible with the service image, apply:

```yaml
security_opt:
  - no-new-privileges:true
cap_drop:
  - ALL
read_only: true
```

Add only the minimum writable `tmpfs` or named volume paths required by the service. Any added Linux capability must be recorded with justification.

## 5. Resources and health

Every service must define:

- a health check;
- restart behavior appropriate to development or staging;
- CPU and memory limits appropriate to the M1 MacBook Air or Linux staging host;
- persistent volume ownership and backup responsibility where stateful;
- log retention/rotation approach;
- startup dependency behavior that does not treat a started container as a healthy dependency.

## 6. Image provenance and update control

- Prefer official or publisher-maintained images with arm64 support.
- Record image source, digest, version, repository URL, owner, and review date in the module installation record.
- Local exploration may use a reviewed tag; staging and production must use an immutable digest.
- Updates require a rollback image/digest and an observable health check.
- Do not use `latest` for an approved deployment.

## 7. Compose configuration separation

Committed files:

```text
compose.core.yml
compose.platform.yml
compose.ai.yml
compose.observability.yml
compose.capabilities.yml
compose.dev.yml
.env.example
```

Ignored local-only files:

```text
compose.local.yml
compose.override.local.yml
.env
```

Local-only files may change host paths, ports, debug flags, and non-secret developer preferences. They may not bypass the default-deny rules.

## 8. Pre-start checklist

Before `docker compose up` for any new module, confirm:

- adoption decision and module record are complete;
- image architecture is arm64-compatible or has an exception;
- ports are localhost-only unless approved;
- no forbidden mount, host network, or privileged mode exists;
- secrets are absent from Git and images;
- health check, limits, backup, rollback, and removal plans exist;
- the module has an approved phase gate.
