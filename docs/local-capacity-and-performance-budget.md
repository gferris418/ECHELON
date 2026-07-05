# ECHELON Local Capacity and Performance Budget

## Scope

This budget applies to the M1 MacBook Air with 16 GB RAM. It is a development/validation environment, not the target for the full production capability stack.

## Performance finding

The largest architecture risk is not an inefficient code loop in the current repository; there is no executable application code or Compose stack yet. The immediate risk is **stack overcommit**: running databases, identity, RAG, observability, browser automation, agent runtime, and local model tooling together on a 16 GB fanless laptop.

## Local profile policy

| Profile | Intended services | Local rule |
|---|---|---|
| core | PostgreSQL, Redis, MinIO, Traefik | May run together for Phase 0 validation. |
| platform | Kernel API, Mission Control, ORACLE, task worker | May run with `core`; measure memory before adding more. |
| ai | 9router and one light adapter | Do not run alongside heavyweight RAG, observability, or browser automation unless measured. |
| observability | Prometheus, Grafana, Loki | Start only for diagnostic sessions or Linux staging validation. |
| capabilities | one approved candidate proof of concept | One heavyweight capability at a time locally. |

## Initial local resource envelopes

These are planning limits, not guaranteed performance values. Each actual Compose service must declare and validate its own limit.

| Service group | Initial target limit | Operational rule |
|---|---:|---|
| core profile total | 4 GB memory | Keep database/object-store test fixtures small. |
| platform profile total | 3 GB memory | Build and test only the minimum active services. |
| ai profile total | 2 GB memory | Cloud LLM calls remain preferred; do not host large models locally. |
| observability profile total | 2 GB memory | Enable only during diagnostics or staging verification. |
| free headroom | at least 4 GB | Preserve for macOS, browser, IDE, and memory pressure. |

## Required measurements before Phase 0 exit

- cold start time for `core` + `platform`;
- steady-state memory and CPU for each service;
- API latency for an empty task and a typical task;
- database migration duration and rollback duration;
- event throughput baseline for Intelligence Bus test events;
- disk usage for data and logs after a controlled test;
- graceful shutdown and restart behavior;
- behavior under one unavailable dependency.

## Performance guardrails

1. No local large-model hosting is a baseline dependency.
2. Cache and queue usage must have expiry/retention rules.
3. Context retrieval must be bounded by token/record/time budgets and provenance-aware.
4. Logs must have rotation and retention rules before enabling verbose agent telemetry.
5. RAG indexing, screen processing, browser automation, and observability must be load-tested separately before running together.
6. Use Linux staging for multi-service load, soak, and resilience testing.
