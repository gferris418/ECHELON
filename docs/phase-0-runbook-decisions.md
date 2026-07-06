# ECHELON P0.06 Operational Runbook Decisions

**Status:** Confirmed by product owner  
**Phase:** P0.06 — Runbooks  
**Scope:** Operational documentation standards before Phase 0 runtime implementation

## Confirmed decisions

### 1. Required runbooks

ECHELON must maintain runbooks for:

```text
local setup
environment configuration
secret handling
backup
restore
rollback
incident response
service recovery
capability install/remove
security break-glass
release and upgrade
```

Additional runbooks may be created by module owners, but the above set is mandatory before a release candidate is approved.

### 2. Location and file model

Runbooks are stored in version control under:

```text
docs/runbooks/
```

Each operational procedure has its own Markdown file. Runbooks may reference shared checklists, command snippets, templates, ADRs, contracts, architecture diagrams, and incident records, but the actionable procedure must remain readable as a standalone document.

### 3. Standard runbook format

Every runbook must contain:

```text
purpose
scope
prerequisites
permissions required
risks
step-by-step procedure
verification
rollback
evidence to retain
escalation path
```

Recommended metadata fields:

```text
owner
review date
affected services
related ADRs
related contracts
classification
last tested date
```

### 4. Operational command safety

All commands must be copy-safe and use placeholders for secrets, identifiers, hosts, paths, and destructive targets.

Runbooks must not include:

- real credentials, tokens, passwords, certificates, or private keys;
- unsafe destructive defaults;
- unscoped production commands;
- commands that disable audit, policy, authentication, backup, or required controls without explicit emergency procedure;
- instructions to bypass approval requirements.

When a destructive or high-risk command is necessary, the runbook must require explicit scope verification, backup/rollback confirmation, approval where applicable, and post-action verification.

### 5. Testing and rehearsal frequency

Backup, restore, rollback, and incident-response runbooks must be tested:

- before every release candidate;
- after material architecture, storage, identity, policy, or deployment changes;
- at scheduled operational intervals after release;
- after an incident or failed recovery, once corrective actions are implemented.

Each rehearsal must produce evidence: date, environment, participants, result, measured recovery outcome, deviations, and follow-up actions.

### 6. Ownership and review

Every runbook must identify:

- a named owner or owning team;
- next review date;
- affected services/capabilities;
- related ADRs, contracts, policies, and release records;
- escalation path and authority boundaries.

Runbooks with no owner or overdue review date are operational risks and must be tracked to remediation.

## Minimum runbook catalog

```text
docs/runbooks/
├── local-development-setup.md
├── environment-configuration.md
├── secret-handling.md
├── backup.md
├── restore.md
├── rollback.md
├── incident-response.md
├── service-recovery.md
├── capability-install-remove.md
├── security-break-glass.md
└── release-and-upgrade.md
```

## Operational procedure lifecycle

```text
Draft runbook
→ technical review
→ security/policy review where needed
→ rehearsal in safe environment
→ evidence captured
→ approved for use
→ scheduled review
→ revised after material change or incident
```

## P0.06 acceptance criteria

P0.06 is complete only when:

1. `docs/runbooks/` exists with the mandatory runbook catalog.
2. Every runbook follows the standard structure.
3. Runbooks identify owner, review date, affected services, and related governance references.
4. Commands are copy-safe and contain no real secrets or unsafe defaults.
5. Backup/restore/rollback/incident procedures have a documented rehearsal plan.
6. Evidence retention and escalation paths are documented.
7. Release readiness checks verify required runbooks and review dates.
8. No operational release is approved without relevant runbook evidence.

## Implementation order

```text
P0.01 Phase 0 package approval
  ↓
P0.02 Monorepo initialization
  ↓
P0.03 Contract layout
  ↓
P0.04 Policy layout
  ↓
P0.05 Quality gates
  ↓
P0.06 Runbooks using these decisions
```
