# ECHELON Documentation Index

## Architecture and engineering

- [Editable architecture diagram — baseline v0.3](assets/echelon-architecture-v0.3.svg)
- [System architecture overview](architecture-overview.md)
- [API reference and contract baseline](api-reference.md)
- [Developer guide](developer-guide.md)
- [Code, security, performance, dependency, and quality review](audits/2026-07-06-code-security-performance-dependency-review.md)
- [Principal architecture readiness audit](audits/2026-07-06-principal-architecture-audit.md)

## Planning and operations

- [Phase execution register — v0.3](phase-execution-register-v0.3.md)
- [Phase tasks and tool catalogue — v0.3](phase-tools-catalog-v0.3.md)
- [Pending task backlog](pending-tasks.md)
- [Mac development and container policy](mac-development-and-container-policy.md)
- [Container runtime hardening](container-runtime-hardening.md)
- [Data governance and memory boundaries](data-governance-and-memory-boundaries.md)
- [Local capacity and performance budget](local-capacity-and-performance-budget.md)

## Release snapshots

| Release | Scope | Status |
|---|---|---|
| [v0.1](releases/v0.1.md) | Foundational Bible, kernel, ORACLE, capability standard, initial phases | Historical snapshot |
| [v0.2](releases/v0.2.md) | Voice/text operator model, GitHub-first governance, capability policy, research candidates | Historical snapshot |
| [v0.3](releases/v0.3.md) | Intelligence Bus, Context Engine, screen/browser intelligence, repository evaluation policy | Current baseline |

## Rules for humans and AI contributors

1. Read v0.3, the applicable ADR, `.echelon/` context, the active phase, and relevant operating policies before proposing work.
2. Identify acceptance criteria, dependencies, risk, security impact, rollback, and documentation changes.
3. Treat planned API, architecture, and capability documents as specifications until implementation and verification evidence exist.
4. Obtain approval before implementation and use a branch plus pull request.
5. Update documentation and machine-readable context in the same pull request as implementation.

GitHub is the authoritative source. GitBook is a published, human-readable mirror. If they conflict, GitHub wins.
