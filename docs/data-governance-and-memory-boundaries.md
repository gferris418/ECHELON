# ECHELON Data Governance and Memory Boundaries

## Purpose

ECHELON may use memory, documents, voice input, and optional screen context, but none of these become a universal personal-data layer by default.

## Default boundaries

1. **Workspace isolation is mandatory.** Knowledge, task context, secrets, agent sessions, and stored artifacts are scoped to a workspace unless a documented sharing grant exists.
2. **No automatic cross-agent memory sharing.** Specialists receive only the minimum authorized context assembled by the Context Engine.
3. **No continuous screen or microphone capture in the baseline.** Screen Intelligence and voice capture are optional capabilities, disabled by default, consent-based, visibly indicated, and revocable.
4. **No chat platform is an authorization system.** Telegram, Discord, email, browser chat, or any other external communication channel may be an input channel only; approvals are evaluated and recorded by the ECHELON Kernel.
5. **Every retained artifact requires provenance.** Store source, workspace, classification, retention rule, creator, and correlation/task ID where applicable.
6. **Sensitive data minimization.** Do not ingest credentials, financial data, identity documents, client records, or continuous activity logs unless a documented business purpose, classification, retention, and deletion mechanism exists.

## Classification

| Class | Examples | Default handling |
|---|---|---|
| Public | public documentation, published URLs | may be indexed with source provenance |
| Internal | project plans, non-sensitive operations | workspace-scoped; retention set by workspace |
| Confidential | customer, financial, supplier, security design data | explicit access grant; encrypted at rest; limited retention |
| Restricted | credentials, identity documents, raw screen/audio captures | do not place in general knowledge stores; separate vault/reference-only access |

## Retention and deletion

- Retention is disabled by default for optional screen and voice artifacts until a workspace policy specifies duration.
- A deletion request must remove both primary records and derived indexes where technically feasible, with an audit event recording the request and result.
- Backups may retain deleted data only according to a documented backup retention schedule; restore procedures must not silently reintroduce deleted restricted data.

## Hermes Agent OS reference decision

The external articles describing shared memory, local dashboards, chat-channel coordination, and a screen/microphone-backed "Self" layer are research references only. ECHELON may adopt dashboard concepts such as agent status, task boards, schedules, content views, and health telemetry. It will not adopt unbounded shared memory, continuous capture, or chat-platform-based authorization as baseline behavior.
