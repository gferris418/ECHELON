# ECHELON Phase 0 Repository Structure

**Status:** Proposed  
**Rule:** One repository; separately deployable applications; strict internal boundaries.

```text
ECHELON/
├── apps/
│   ├── kernel-api/
│   │   ├── src/{identity,workspaces,policy,tasks,approvals,capabilities,audit,events,objects,notifications,health,api}/
│   │   ├── test/
│   │   ├── Dockerfile
│   │   └── README.md
│   ├── task-worker/
│   │   ├── src/
│   │   ├── test/
│   │   ├── Dockerfile
│   │   └── README.md
│   ├── mission-control/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/{auth,workspaces,dashboard,tasks,approvals,timeline,capabilities,health,settings}/
│   │   ├── lib/
│   │   ├── test/
│   │   ├── Dockerfile
│   │   └── README.md
│   └── python-workers/
│       ├── base/
│       ├── examples/
│       └── README.md
├── packages/
│   ├── contracts/{openapi,events,generated,scripts}/
│   ├── policy/{definitions,tests,fixtures}/
│   ├── config/{eslint,typescript,prettier,environment-schemas}/
│   └── testkit/{fixtures,integration,contract}/
├── infra/
│   ├── compose/{compose.local.yaml,compose.research.yaml,compose.staging.yaml}
│   ├── {containers,authentik,openbao,traefik,postgres,minio,scripts}/
├── policies/{platform,workspaces,capabilities,approvals,classifications,retention,tests}/
├── capabilities/{manifests,approved,research,templates}/
├── docs/{adr,api,architecture,operations,security,runbooks,research}/
├── .echelon/
├── .github/{workflows,ISSUE_TEMPLATE,pull_request_template.md}
├── tests/{e2e,security,performance}/
├── Makefile
├── package.json
├── pnpm-workspace.yaml
├── README.md
└── SECURITY.md
```

## Boundaries

### Applications

- An application is a deployable unit.
- Apps may consume `packages/contracts`, `packages/config`, `packages/testkit`, and public SDKs.
- Apps must not import another app’s internal source.
- Each app owns its Dockerfile, typed environment validation, health checks, tests, runtime permissions, and operation notes.

### Packages

- `contracts` is canonical for OpenAPI and JSON Schema.
- `policy` holds declarative policy assets and test fixtures; it does not contain feature-specific business code.
- `config` owns shared tooling and environment schemas.
- `testkit` owns reusable test harnesses and fixtures.
- No unbounded generic `shared` package is permitted.

### Infrastructure

- Infrastructure manifests are environment-scoped and never contain live secrets.
- Docker Compose is the Phase 0 local orchestration baseline.
- One deployable service per container. Reusing an image for related separate ECHELON processes is permitted.
- ECHELON source and runtime work remain under `/Users/babuislam/Developer/ECHELON/`.

### Policies and capabilities

- Policy assets are versioned in Git and require tests.
- Production policy activation follows two-person control.
- Every installed or evaluated capability has a manifest.
- `research` capabilities remain isolated from production data, secrets, and shared operational workspaces.

### Environment pattern

```text
.env.example                 # placeholders only
apps/<app>/.env.schema.ts    # typed validation
infra/compose/*.yaml         # service wiring
docs/runbooks/*.md           # setup, operations, backup, rollback
```

Mission Control may render Kernel state and invoke Kernel APIs. It must not implement separate authorization, approval, audit, or task-state authority.
