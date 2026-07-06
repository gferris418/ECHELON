# ECHELON One-Click Deployment Model

**Status:** Proposed architecture baseline  
**Scope:** Trusted deployment, guided configuration, upgrades, and recovery

## 1. Product objective

ECHELON must feel like one software product, not a collection of self-hosted tools.

A normal user should be able to install ECHELON through one primary action, open Mission Control, answer guided questions, and receive a verified environment tailored to a personal, team, or organization Blueprint.

```text
Install / Open ECHELON
  ↓
Click: Deploy ECHELON
  ↓
Bootstrapper checks device and operating system
  ↓
Trusted Core is installed and started
  ↓
Mission Control opens
  ↓
Genesis creates a Blueprint from guided choices
  ↓
Approved modules are resolved and installed
  ↓
Health checks pass
  ↓
Personalized Mission Control is ready
```

## 2. Deployment principle

```text
One click installs the trusted ECHELON Core.
Guided choices install approved modules.
No arbitrary script, repository, or unverified capability installs automatically.
```

The one-click experience does not weaken capability governance, approvals, audit, upgrade safety, or rollback requirements.

## 3. Primary components

### 3.1 ECHELON Bootstrapper

A native, signed launcher/installer for supported operating systems.

Responsibilities:

- detect operating system, CPU architecture, memory, storage, network, and permissions;
- select a supported deployment profile;
- install or activate the trusted runtime layer;
- obtain signed ECHELON Core artifacts;
- verify signatures, checksums, and compatibility;
- create encrypted local configuration and local administrator bootstrap;
- start Core services;
- open Mission Control;
- surface any blocked prerequisite in plain language.

The Bootstrapper hides container, database, and service configuration from ordinary users.

### 3.2 Deployment Profiles

Profiles provide a minimal, appropriate starting point rather than installing every capability.

| Profile              | Initial scope                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| Personal Starter     | private workspace, tasks, storage, audit, assistant-ready policy baseline                                 |
| Team Starter         | shared workspace, roles, tasks, approvals, shared documents, signals                                      |
| Organization Starter | multiple workspaces, organization policy, MFA/identity baseline, audit and backup baseline                |
| Developer / Research | isolated research workspace, controlled capability testing, no production secrets or shared business data |

### 3.3 Hardware and environment resolver

The Bootstrapper must adapt deployment to real capacity.

Examples:

- lightweight MacBook: Core services locally, cloud AI by default, constrained document-processing profile;
- stronger workstation: optional local processing capability where approved;
- VPS/server: production-oriented deployment profile, managed backup, secure remote access;
- unsupported device: explain the limitation and offer supported deployment target options.

The platform must not silently install workloads beyond the device’s safe capacity.

### 3.4 Genesis and Blueprint

Genesis is the guided first-run and reconfiguration layer inside Mission Control. It asks users outcome-oriented questions and creates a versioned Blueprint.

```text
Who is ECHELON for?
○ Just me
○ My family or small group
○ A project team
○ A company or organization
```

The Blueprint records operating mode, selected modules, deferred modules, roles, classifications, retention, AI preference, automation limits, storage, network needs, dependencies, and rollout status.

### 3.5 Capability Resolver

The resolver converts user outcomes into approved module proposals.

```text
User outcome: Document intelligence
  ↓
Resolve approved capabilities and dependencies
  ↓
Propose storage, metadata, retrieval, optional OCR, access policy, retention policy
  ↓
Show impact and request approval where required
```

The resolver must consider workspace policy, trust tier, device capacity, privacy, classification, cost, maintenance, license, compatibility, and rollback capability.

### 3.6 Installation Orchestrator

The orchestrator applies Blueprint changes safely.

```text
Blueprint
→ dependency plan
→ policy and approval check
→ immutable artifact/source verification
→ isolated deployment
→ scoped credentials
→ health verification
→ capability registration
→ audit evidence and Mission Control result
```

Each installed capability requires a manifest, immutable source/image reference, permissions, data handling declaration, resource requirements, health checks, backup/rollback plan, and removal path.

## 4. Trusted Core baseline

The first-click deployment installs only the minimum governed Core:

- Mission Control;
- ECHELON Kernel;
- PostgreSQL;
- Redis;
- MinIO;
- Authentik or configured identity baseline;
- OpenBao or configured secrets boundary;
- Traefik or configured approved gateway;
- health, audit, policy, and capability registry foundations.

AI, browser automation, RAG, OCR, external connectors, developer agents, and business modules are not automatically installed merely because the Core is deployed.

## 5. Guided module installation

Module selection must use understandable outcomes rather than repository names or infrastructure terms.

Examples:

| User outcome          | Potential governed capability set                                    |
| --------------------- | -------------------------------------------------------------------- |
| Manage projects       | tasks, approvals, timeline, notifications                            |
| Organize documents    | object storage, metadata, Knowledge Core, search, retention controls |
| Use AI assistants     | 9router connection, provider policy, ORACLE, approved AI workspace   |
| Automate routine work | approved automation capability, task integration, approval controls  |
| Build internal tools  | API Laboratory and approved internal-operations capability           |

Advanced users may inspect technical details, but the default user journey remains outcome-led.

## 6. Upgrade, repair, and recovery

The one-click pattern also governs lifecycle operations.

### Upgrade

```text
Update request
→ compatibility check
→ backup/snapshot gate
→ download immutable approved release
→ staged update
→ health verification
→ automatic rollback if verification fails
→ audit and release evidence
```

### Repair

```text
Detect unhealthy capability
→ diagnose using health and logs
→ show safe repair plan
→ approval if policy requires it
→ repair/redeploy from approved artifact
→ verify and audit
```

### Restore

```text
Select approved backup
→ restore Kernel state, database, objects, policies, and Blueprint
→ verify integrity and health
→ reopen Mission Control
→ audit restoration result
```

## 7. Security requirements

- Bootstrapper binaries and Core artifacts must be signed and verified.
- Artifact digests, compatibility metadata, and manifest validation are mandatory.
- No arbitrary GitHub URL, shell script, container image, or module source is auto-installed.
- Privileged actions, public exposure, secret configuration, data export, and external actions use Kernel policy and approval controls.
- Research modules install only in isolated research workspaces.
- Upgrade and recovery paths require backups, integrity checks, and rollback support.
- The Bootstrapper must not store raw secrets in logs, source control, or unencrypted configuration.

## 8. Roadmap placement

The experience is phased rather than all delivered at once.

| Stage     | Delivery                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| Phase 0   | Core services, workspace/policy/audit/capability foundations, Mission Control shell                                  |
| Phase 1–3 | governed AI, Context Engine, automation, specialist capabilities, operational tooling                                |
| Phase 4   | capability lifecycle, Foundry controls, workspace lifecycle, installation orchestration foundations                  |
| Phase 5+  | native Bootstrapper maturity, richer Genesis setup, deployment profiles, guided upgrades/recovery, mobile onboarding |

The permanent invariant remains:

```text
ECHELON is one trusted product.
Every personalized installation is a governed Blueprint over the same Kernel.
```
