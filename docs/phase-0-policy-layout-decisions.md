# ECHELON P0.04 Policy Layout Decisions

**Status:** Confirmed by product owner  
**Phase:** P0.04 — Policy layout  
**Scope:** Declarative authorization, approval, data-handling, and capability policy baseline before runtime implementation

## Confirmed decisions

### 1. Policy format

Policies are authored as typed YAML files stored in Git and validated by JSON Schema.

Policy files are reviewed, versioned, tested, and auditable. YAML is an authoring format only; the Kernel policy module must load validated policy objects and evaluate them through one stable interface.

### 2. Policy package structure

```text
packages/policy/
├── schemas/
├── policies/
│   ├── platform/
│   ├── organization/
│   ├── workspace/
│   └── capability/
├── fixtures/
├── tests/
└── src/
```

Ownership rules:

- `schemas/` defines the policy document and shared rule schemas.
- `policies/platform/` contains non-negotiable platform baselines.
- `policies/organization/` contains organization-scoped controls.
- `policies/workspace/` contains workspace-specific controls that may add restrictions.
- `policies/capability/` contains capability-specific conditions and limits.
- `fixtures/` contains representative actor, resource, classification, approval, and context data.
- `tests/` contains automated policy evaluation and negative-test suites.
- `src/` contains parsing, validation, composition, evaluation, explanation, and version metadata logic.

### 3. Policy decision result

Every policy evaluation must return exactly one authoritative decision:

```text
allow
deny
approval_required
```

The evaluation result must also include policy version/reference, matched rule or reason code, applicable scope, correlation ID, and sufficient safe explanation for audit and operator review.

### 4. Policy inheritance and priority

Policy sources apply in this order:

```text
platform baseline
→ organization policy
→ workspace policy
→ capability-specific policy
```

The stricter rule always wins.

Implications:

- lower scopes may add restrictions but may not weaken higher-scope requirements;
- an explicit deny overrides allow;
- `approval_required` overrides allow when any applicable policy requires human approval;
- capability policy may narrow capability authority but cannot broaden organization or workspace authority;
- classification and retention constraints remain mandatory even if a lower scope requests a less restrictive behavior.

### 5. Production policy change control

Production policy changes require two-person control:

```text
authorized editor proposes
→ automated schema and fixture tests pass
→ different authorized approver activates
→ activation is audited
```

Emergency policy changes:

- require explicit break-glass authority;
- must specify scope, reason, owner, and expiry;
- automatically expire;
- generate follow-up review and incident evidence;
- cannot silently become permanent policy.

### 6. Policy testing requirements

Every policy change requires fixtures and automated tests.

Minimum mandatory negative tests cover:

- Restricted data access and export;
- external communication, purchase, submission, and public exposure;
- approval-required actions attempted without valid approval;
- role and workspace boundary violations;
- expired, revoked, or incorrect capability tokens;
- cross-workspace resource access;
- policy inheritance conflicts where a lower scope tries to weaken a higher scope;
- emergency policy expiry and post-expiry denial.

## Policy evaluation model

```text
actor identity
→ workspace membership and role
→ action
→ resource and classification
→ platform policy
→ organization policy
→ workspace policy
→ capability policy
→ approval status and limits
→ allow | deny | approval_required
```

The Kernel is the only authority that evaluates and records operational policy decisions. Mission Control and external capabilities may display or request policy evaluation, but they may not independently grant authority.

## P0.04 acceptance criteria

P0.04 is complete only when:

1. The policy package structure exists with ownership documentation.
2. Policy YAML schemas validate documents before use.
3. The evaluator returns only `allow`, `deny`, or `approval_required` plus safe explanation metadata.
4. Platform, organization, workspace, and capability scopes compose in the confirmed order.
5. Stricter-rule precedence is tested.
6. Two-person production activation and auditable break-glass expiry are represented in the design and test fixtures.
7. Every policy change has automated positive and negative tests.
8. No application or capability bypasses the Kernel policy interface once runtime implementation begins.

## Implementation order

```text
P0.01 Phase 0 package approval
  ↓
P0.02 Monorepo initialization
  ↓
P0.03 Contract layout
  ↓
P0.04 Policy layout using these decisions
  ↓
P0.05 Quality gates
P0.06 Runbooks
```
