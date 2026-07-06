# ECHELON Operating Modes and Genesis Provisioning Model

**Status:** Proposed architecture baseline  
**Scope:** Personal, team, and organization use of one governed ECHELON Kernel

## 1. Purpose

ECHELON must serve one person, a small group, or a full organization without creating separate products or uncontrolled system variants.

The platform therefore uses one permanent Kernel and applies a user- or organization-specific **Blueprint** during first-run setup and later reconfiguration.

```text
One ECHELON Kernel
→ many organizations
→ many workspaces
→ many users and teams
→ tailored module sets and policies
```

## 2. Operating hierarchy

```text
Platform
  ↓
Organization
  ↓
Workspace
  ↓
Team
  ↓
User
  ↓
Capabilities / Modules
```

For a single person, ECHELON creates a private organization and personal workspace rather than a separate architecture.

```text
Platform
  ↓
Personal organization
  ↓
Personal workspace
  ↓
User
```

## 3. Operating modes

### Personal mode

For one individual.

- One private organization and workspace by default.
- The user may hold Owner, Admin, Operator, and Approver rights initially.
- Modules can include personal tasks, documents, AI assistance, reminders, and private automation.
- Security, audit, classification, and retention controls remain active, but the interface is simplified.

### Team mode

For a small group, family, startup, project team, or department.

- Shared project/team workspaces plus optional private workspaces.
- Roles include Workspace Owner, Operator, Reviewer/Approver, Viewer, and Capability Service Account.
- Shared tasks, documents, approvals, timelines, and controlled automations are enabled according to the Blueprint.
- Private and shared data remain separated by workspace policy.

### Organization mode

For a company or institution.

- One organization with multiple workspaces for teams, departments, projects, or clients.
- Organization-wide policies govern identity/MFA, approved capabilities, Restricted data, external-action controls, retention minimums, and audit requirements.
- Workspaces may choose additional modules or stricter rules but cannot weaken platform or organization security baselines.

## 4. Genesis: first-run provisioning experience

**Genesis** is the first-run setup and reconfiguration layer. It appears inside Mission Control after installation and converts user choices into a governed Blueprint.

```text
Install ECHELON
  ↓
Mission Control opens
  ↓
Genesis interview
  ↓
Blueprint proposal
  ↓
User review and approval
  ↓
Dependency and policy checks
  ↓
Install approved modules
  ↓
Health verification
  ↓
Personalized Mission Control
```

Genesis asks outcome-oriented questions rather than exposing repositories, container images, YAML, or vendor-specific tools.

Example starting question:

```text
Who is ECHELON for?
○ Just me
○ My family or small group
○ A project team
○ A company or organization
```

It then asks for the intended outcomes, privacy model, AI preference, member structure, automation level, and optional capability packs.

## 5. Blueprint model

A Blueprint is the versioned desired-state configuration for an organization or workspace.

It records:

- operating mode;
- enabled and deferred modules;
- data classifications and retention defaults;
- organization/workspace roles;
- AI/provider routing policy;
- allowed automations and approval thresholds;
- storage, backup, and network requirements;
- dependencies, rollout status, and future recommendations.

Illustrative example:

```yaml
blueprint:
  operating_mode: team
  profile: business_operations
  ai_mode: hybrid_cloud
  modules:
    tasks: enabled
    approvals: enabled
    knowledge: deferred
    automation: enabled
    crm: disabled
  policies:
    external_actions: approval_required
    default_classification: confidential
```

The Blueprint is the source of truth for what an ECHELON environment is intended to be. It is not a bypass for Kernel policy, audit, or capability admission controls.

## 6. Required platform components

### Blueprint Engine

Stores, versions, validates, compares, and rolls back desired-state configuration.

### Guided Module Selector

Presents user goals such as “Manage projects,” “Organize documents,” “Use AI assistants,” or “Build internal tools.” It does not expose low-level tooling unless the user opens advanced controls.

### Capability Resolver

Maps an outcome request to approved capabilities, dependencies, compatibility checks, privacy constraints, cost policy, and system capacity.

### Installation Orchestrator

Applies approved Blueprint changes safely:

```text
Blueprint
→ dependency plan
→ policy/approval check
→ immutable source or image verification
→ isolated deployment
→ scoped credentials
→ health verification
→ capability registration
→ Mission Control result and audit evidence
```

### Dependency Graph

Every module declares required and optional services, permitted classifications, resource requirements, lifecycle/rollback controls, and compatibility constraints.

### Reconfiguration and Removal Manager

Supports adding, changing, disabling, rolling back, exporting, archiving, and removing modules without losing governance.

## 7. Safety constraints

- Genesis cannot auto-install arbitrary GitHub URLs or unreviewed repositories.
- Every module remains a capability with a manifest, trust tier, immutable artifact/source reference, declared permissions, health check, rollback plan, and removal path.
- High-risk actions, secrets, public exposure, permissions, spending, external submissions, and Restricted-data exports retain Kernel approval requirements.
- Research modules operate only in isolated research workspaces without production secrets or shared business data.
- A personalized experience may change the module set, workflows, interface, and policy choices, but not the core security/audit invariants.

## 8. Relationship to the roadmap

Genesis is a later capability, not a Phase 0 dependency.

- **Phase 0:** Kernel, workspaces, policy, approvals, audit, capability registry, object storage, Mission Control shell.
- **Phase 1–3:** governed AI, context, automation, specialist capabilities, and builder components.
- **Phase 4:** Foundry, workspace lifecycle, capability installation/update/removal, and the installation orchestration foundations.
- **Phase 5+:** richer provisioning UX, mobile-first Genesis flows, and broader organization templates.

The permanent principle is:

```text
One governed ECHELON Kernel
with many tailored Blueprints
rather than a different uncontrolled OS for every user.
```
