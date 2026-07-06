# ECHELON P0.05 Quality Gate Decisions

**Status:** Confirmed by product owner  
**Phase:** P0.05 — Quality gates  
**Scope:** Mandatory pull-request validation, security scanning, supply-chain controls, merge rules, and evidence retention

## Confirmed decisions

### 1. Required pull-request checks

Every pull request must run the following required checks when applicable:

```text
format
lint
typecheck
unit tests
contract validation
policy tests
secret scan
dependency scan
container build validation
documentation integrity
```

These checks are mandatory quality gates for merge into `main` once the corresponding implementation exists. A check may be marked not applicable only when the repository state cannot yet exercise it, and the workflow must make that condition explicit.

### 2. End-to-end tests

Playwright end-to-end tests become mandatory when Mission Control exists.

Before Mission Control implementation, the workflow and test harness may be present but must not block merges solely because no browser application exists yet. Once Mission Control is introduced, the relevant end-to-end suite becomes required for affected changes.

### 3. Security scanning baseline

The required baseline is:

```text
GitHub Dependabot
GitHub secret scanning / push protection
Trivy filesystem and container vulnerability scanning
```

Security findings must be triaged with ownership, severity, affected scope, mitigation/acceptance rationale, and follow-up tracking. A known finding is not silently ignored because a scan completed successfully.

### 4. Supply-chain controls

Required controls:

- GitHub Actions are pinned to immutable commit SHAs;
- staging and production container images use immutable digests;
- `latest` tags are prohibited in operational environments;
- an SBOM is generated for releaseable artifacts;
- dependency and container provenance are retained with release evidence;
- image, action, and dependency updates are reviewed through pull requests.

### 5. Merge rule

All mandatory checks must pass before merge into `main`.

Any emergency override must be explicit and documented as a break-glass action. The record must include the reason, scope, risk, approving authority, compensating controls, and follow-up remediation work. Emergency overrides do not permanently disable quality gates.

### 6. Quality evidence

GitHub Actions must retain relevant evidence as artifacts and/or PR-linked evidence, including:

- CI check results;
- coverage summaries;
- contract and policy validation results;
- secret/dependency/container scan summaries;
- SBOM and artifact provenance where applicable;
- release verification evidence;
- exception or break-glass records.

Evidence retention follows repository and release policy. Sensitive content must be redacted or referenced safely; raw secrets and Restricted data must never be published in artifacts.

## Required workflow behavior

```text
Pull request opened
  ↓
Format, lint, typecheck, tests
  ↓
Contract and policy validation
  ↓
Security and supply-chain scans
  ↓
Container build validation
  ↓
Documentation integrity
  ↓
Required checks pass
  ↓
Review and merge eligibility
```

## Quality-gate ownership

- Engineering owns code quality, tests, contracts, and build reproducibility.
- Security/governance owns secret, dependency, container, and supply-chain review requirements.
- Documentation owners ensure architecture, ADRs, contracts, implementation, and runbooks stay aligned.
- Release owner verifies evidence completeness before release promotion.

## P0.05 acceptance criteria

P0.05 is complete only when:

1. Required checks are defined in version-controlled workflow configuration.
2. Checks run on pull requests and produce visible pass/fail results.
3. Mission Control E2E test readiness is present and becomes blocking when the UI exists.
4. Dependabot, secret scanning/push protection, and Trivy are configured or documented as unresolved manual GitHub settings with an owner.
5. Actions are SHA-pinned and operational images are digest-pinned.
6. SBOM generation and release evidence retention are implemented for releaseable artifacts.
7. Merge rules require mandatory checks, with only documented break-glass overrides.
8. Artifact handling prevents publication of raw secrets or Restricted data.

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
P0.05 Quality gates using these decisions
  ↓
P0.06 Runbooks
```
