# ECHELON Mac Development and Container Policy

## 1. Binding local development root

All ECHELON-related source code, cloned repositories, generated local artifacts, Compose files, service configuration, test fixtures, local data, and development scripts must live under:

```text
/Users/babuislam/Developer/
```

The standard ECHELON root is:

```text
/Users/babuislam/Developer/ECHELON/
```

No ECHELON project source may be created under Desktop, Downloads, Documents, temporary folders, iCloud-managed folders, or arbitrary user-home paths.

## 2. Required local directory hierarchy

```text
/Users/babuislam/Developer/
└── ECHELON/
    ├── platform/                 # ECHELON kernel, Mission Control, ORACLE
    ├── capabilities/             # capability adapters and manifests
    ├── infrastructure/           # Compose stacks, reverse proxy, shared config
    ├── research/                 # evaluated external repositories and notes
    ├── data/                     # local development data only; never committed
    ├── secrets/                  # local secret references only; never committed
    ├── backups/                  # local non-production backup tests
    ├── scripts/                  # bootstrap, diagnostics, maintenance
    ├── docs/                     # local working documentation
    └── archives/                 # approved downloaded releases or exports
```

Each external repository must be cloned into a named directory under one of these roots:

```text
/Users/babuislam/Developer/ECHELON/capabilities/<capability-id>/
/Users/babuislam/Developer/ECHELON/research/<repository-id>/
```

## 3. Default container runtime

**OrbStack Docker is the default local container runtime on macOS.**

- Use the OrbStack-provided Docker CLI and Docker Compose compatibility layer.
- Do not mix OrbStack, Docker Desktop, Colima, Rancher Desktop, or Podman for the same ECHELON environment.
- Docker Desktop or Colima may only be used as an explicitly documented fallback if OrbStack is unavailable or a compatibility defect is recorded.
- The default architecture target is Apple Silicon `linux/arm64`.
- Any `linux/amd64` image must be treated as an exception, documented with performance impact and tested under emulation before approval.

## 4. Container model: optimize for operability, not minimum image count

ECHELON will minimize image duplication, but it will **not** combine unrelated deployable services into one container just to reduce image count.

### Default rule

**One deployable service = one container.**

Examples that remain separate:

- PostgreSQL
- Redis
- MinIO
- Traefik
- Authentik
- 9router
- RAG/knowledge service
- workflow automation service
- metrics/logging services
- Mission Control frontend
- ECHELON API/kernel service
- ORACLE service
- agent runtime service

This preserves independent health checks, logs, ports, upgrades, rollback, resource limits, backups, and failure isolation.

### Allowed image consolidation

Use one shared image for multiple ECHELON modules only when **all** are true:

1. They are built from the same codebase and released together.
2. They share the same runtime and dependency set.
3. They can run as separate containers using different commands, profiles, or environment variables.
4. Combining them does not weaken isolation, upgrade safety, auditability, or recovery.

Recommended pattern:

```text
One reusable ECHELON base image
├── echelon-api container
├── oracle-worker container
├── task-worker container
└── event-consumer container
```

The image is shared; the containers remain separate deployable processes.

### Disallowed consolidation

Do not place a database, object store, reverse proxy, identity provider, or unrelated third-party capability in the same image or container as the ECHELON kernel.

## 5. Image policy

1. Prefer official, maintained, arm64-capable images.
2. Pin images by immutable digest for staging/production; tags may be used only for local exploration.
3. Build custom ECHELON images from a small set of approved base images.
4. Use multi-stage builds to keep final images small.
5. Do not install development tools, credentials, or sample data into production images.
6. Reuse base layers through shared base images, not by merging unrelated services.
7. Each image must have a documented owner, purpose, source repository, version, health check, and rollback path.

## 6. Compose structure

Use multiple small Compose files rather than one large unmanaged stack.

```text
infrastructure/
├── compose.core.yml              # PostgreSQL, Redis, MinIO, Traefik
├── compose.platform.yml          # ECHELON API, Mission Control, ORACLE, workers
├── compose.ai.yml                # 9router and approved AI adapters
├── compose.observability.yml     # Prometheus, Grafana, Loki
├── compose.capabilities.yml      # approved optional capabilities
├── compose.override.yml          # local-only overrides; never committed with secrets
└── .env.example                  # placeholder variable names only
```

Use Compose profiles to avoid running everything locally:

```text
core
platform
ai
observability
capabilities
```

## 7. Local data, secrets, and volumes

- Local persistent data must mount from `/Users/babuislam/Developer/ECHELON/data/`.
- Local backup tests must write only under `/Users/babuislam/Developer/ECHELON/backups/`.
- Local secret files must live under `/Users/babuislam/Developer/ECHELON/secrets/` and be ignored by Git.
- `.env.example` may exist in Git; `.env` and real secret files may not.
- Containers must not mount the entire user home directory.
- Bind mounts should be narrow and read-only where writes are unnecessary.

## 8. Naming convention

Use predictable names:

```text
echelon-<environment>-<service>
```

Examples:

```text
echelon-dev-postgres
echelon-dev-kernel
echelon-dev-oracle
echelon-dev-mission-control
echelon-dev-9router
```

## 9. Required installation record for every module

Before a module is installed, record:

- module/capability name and purpose
- source repository or vendor site
- local directory under `/Users/babuislam/Developer/ECHELON/`
- image name and immutable version/digest
- CPU architecture support
- Compose file and profile
- ports and network exposure
- volumes and data classification
- secret references
- health check
- backup, update, rollback, disable and removal process
- owner and review date

## 10. Initial local stack target

The first development stack should start only with:

```text
core profile:
- PostgreSQL
- Redis
- MinIO
- Traefik

platform profile:
- ECHELON kernel API
- Mission Control
- ORACLE text service
- task worker
```

Do not deploy RAGFlow, n8n, Grafana, LobeHub, Hermes, Screenpipe, ToolJet, OpenHands, or browser automation until their phase gate and adoption review are complete.

## 11. Acceptance criteria

This policy is applied when:

- all ECHELON local folders conform to the required root;
- OrbStack is the documented default Docker runtime;
- Compose files use named profiles;
- each service has a separate container unless a documented shared-image exception applies;
- images are arm64-compatible or have an approved exception;
- secrets and data paths are outside Git and under the defined root;
- the module installation record is completed before installation.
