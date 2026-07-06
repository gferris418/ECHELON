# ECHELON Remaining Architecture and Governance Decisions

**Status:** Recommended baseline adopted by product owner  
**Scope:** Phase -1 closure, P0.01 activation, and cross-phase operating defaults

This record resolves the remaining architecture and governance questions raised before Phase 0 implementation. It sets desired controls; repository or platform settings are not considered active until independently verified.

## A. Phase -1 and P0.01

1. Phase 0 becomes the active implementation phase only after the listed documentation PRs are merged and Phase -1 controls are verified.
2. PRs #22–#27 must merge before creating the code scaffold.
3. Older conflicting planning documents are marked **superseded**, not deleted.
4. The consolidated ADR set remains authoritative. Individual ADR files are created only when a decision changes or needs independent lifecycle tracking.
5. Mermaid source files are authoritative for diagrams. SVG/PNG exports are generated derivatives.

## B. GitHub governance

6. `main` requires at least one approval where GitHub plan/settings support it.
7. When multiple maintainers exist, the approver must not be the author. Until then, the Platform Owner records self-approval/review evidence explicitly.
8. Force-push and branch deletion are blocked on `main`.
9. All required CI checks pass before merge, except documented break-glass override.
10. Enable secret scanning, push protection, Dependabot alerts/security updates, and private vulnerability reporting where available.
11. Releases use signed Git tags and semantic versions from the first runnable Phase 0 release.
12. Every release includes changelog, SBOM, container digest/provenance, verification evidence, and rollback note.

## C. GitHub Project management

13. Create one project named **ECHELON Roadmap**.
14. Required fields:

```text
Phase
Sequence
Workstream
Status
Priority
Environment
Depends On
Owner
Risk
ADR / Contract Impact
Verification Evidence
```

15. Create individual issues/project items for every P0.01–P0.65 task; Issue #10 remains the parent overview.
16. Status values:

```text
Backlog
Ready
In Progress
Blocked
Review
Verified
Done
```

17. `Sequence` is authoritative. A task cannot enter In Progress until predecessor evidence exists or a documented dependency exception is approved.

## D. Repository and implementation setup

18. Create the P0.02 scaffold immediately after P0.01 approval and governance verification.
19. Branch model:

```text
main       protected release branch
feature/*  normal implementation work
fix/*      corrective work
docs/*     documentation-only work
release/*  release preparation
```

20. Use Conventional Commits:

```text
feat:
fix:
docs:
chore:
test:
refactor:
security:
```

21. Source code, technical documentation, errors, UI labels, and comments use English as the canonical implementation language. Localized user-facing content may be added later through an explicit i18n design.
22. Repository remains private/proprietary; no public open-source license file is added now.

## E. Environments and deployment

23. Standard environments:

```text
local
research
staging
production
```

24. Local and research may use test identity and fake external services; production credentials and business data are prohibited unless specifically approved.
25. Staging mirrors production policy and container configuration as closely as practical.
26. Production initially targets a self-hosted VPS/server, not the M1 MacBook.
27. The M1 MacBook remains the primary development and local demonstration environment.
28. Public internet exposure is disabled by default until a separately approved remote-access design is implemented.

## F. Identity, users, and organization model

29. Platform roles:

```text
Platform Owner
Organization Owner
Organization Admin
Workspace Admin
Operator
Approver
Reviewer
Viewer
Capability Service Account
```

30. Personal mode may grant one user multiple roles while retaining full audit records.
31. Organization mode requires two separate users for production policy activation and high-risk approvals whenever at least two eligible users exist; a documented temporary exception is required for a single-owner organization.
32. Initial authentication is email/password plus MFA through the identity provider; federation/enterprise SSO is added later.
33. Team and Organization modes use invitation-based onboarding.

## G. Data, privacy, and retention

34. Classifications:

```text
Public
Internal
Confidential
Restricted
```

35. Default organization/workspace classification is **Confidential**.
36. Restricted data is excluded by default from AI prompts, embeddings, logs, screen capture, and external capability payloads.
37. Retention is configurable by organization but may not weaken platform minimums.
38. Deleted content uses a configurable recovery grace period by default; policy/legal/security rules may require immediate destruction.
39. Audit records remain immutable after linked content deletion and retain only safe references, integrity data, and deletion evidence.

## H. Secrets and external integrations

40. OpenBao is the operational secrets boundary; macOS Keychain and ignored `.env` files are only for local bootstrap.
41. External credentials are stored as secret references, never in task payloads, policies, logs, or source code.
42. New integrations begin read-only by default.
43. Message sending, submissions, purchases, payments, public posting, and permission changes always require approval unless a future policy explicitly permits a narrow, reversible, low-risk exception.
44. Integrations are disabled automatically when scoped credentials expire or are revoked.

## I. Tasks, approvals, and automation

45. Task states:

```text
draft
queued
running
waiting_approval
completed
failed
needs_attention
cancelled
```

46. A failed task does not retry automatically when it could have an external effect.
47. All external-effect actions require idempotency keys for retries.
48. Approvals expire automatically.
49. Default approval expiry is **24 hours**, unless the policy assigns a shorter window for higher-risk actions.
50. Approvers see exact action, destination, payload summary, risk, policy reason, evidence, and expiry before approval.

## J. AI and capabilities

51. Cloud AI is the default for the M1 MacBook; local models are optional and never required for Core functionality.
52. 9router is the first approved AI gateway candidate, but it remains replaceable.
53. LobeHub/Open WebUI is evaluated as a user-facing capability, not embedded in the Kernel.
54. ORACLE begins text-only; voice is deferred to Phase 5.
55. Every AI/agent action presents a visible plan before execution.
56. Autonomous AI actions remain prohibited unless future policy permits a narrow, reversible, low-risk action with audit and revocation controls.
57. Every capability requires owner, trust tier, manifest, health check, rollback plan, removal plan, and resource limit before installation.

## K. One-click deployment product decisions

58. First native product target is macOS Apple Silicon, then Windows, then Linux.
59. The initial Bootstrapper uses OrbStack on macOS when available and supports Docker Desktop fallback.
60. Initial Core deployment requires an internet connection.
61. Offline enterprise packages are a later capability, not first-release scope.
62. Initial profiles:

```text
Personal Starter
Team Starter
Organization Starter
Research / Developer
```

63. Genesis lets users defer modules and receive recommendations later.
64. Blueprint changes always show installation-impact preview before applying.
65. Upgrades create a backup snapshot before modifying services or modules.

## L. Product and UI defaults

66. Mission Control defaults to a simple 2D dashboard; spatial/3D views are deferred.
67. Primary navigation:

```text
Home
Tasks
Approvals
Timeline
Workspaces
Capabilities
Knowledge
Signals
Settings
```

68. Advanced technical settings are hidden by default and placed in an Advanced/Admin area.
69. Mission Control displays persistent system health, current workspace, and classification context.
70. Every destructive or external action uses a confirmation screen; high-risk actions also require the applicable Kernel approval flow.

## Immediate gate sequence

```text
Merge decision-record PRs
→ verify Phase -1 GitHub controls
→ create ECHELON Roadmap project and P0 child items
→ mark P0.01 approved
→ create P0.02 implementation scaffold
```
