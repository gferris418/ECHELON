# ECHELON Change Record

## Purpose

Describe the change and the operator value it provides.

## Architecture references

- Current baseline / phase:
- Bible or release sections:
- ADRs:
- Capability registry entry:
- Parent implementation issue:

## Evidence classification

- Facts verified:
- Assumptions:
- Inferences:
- Proposals:

## Safety and operations

- Secrets/data impact:
- Permission impact:
- Network exposure impact:
- Rollback plan:
- Disable/removal plan:

## Container and supply-chain review

Complete this section when a container, image, service, dependency, or external capability changes.

- [ ] Image source and immutable digest recorded
- [ ] `linux/arm64` support verified or exception approved
- [ ] No privileged container, host networking, Docker socket, or broad host mount
- [ ] Ports are localhost-only unless explicitly approved
- [ ] Health check and resource limits configured
- [ ] Volumes, backups, restore test, and data classification recorded
- [ ] Module installation record updated

## Verification

- Tests run:
- Manual checks:
- Known limitations:

## Documentation

- [ ] README updated if needed
- [ ] Release/Bible updated if needed
- [ ] ADR added or updated if architecture changed
- [ ] `.echelon/` files updated if current context changed
- [ ] Capability manifest/evaluation updated if a capability changed
- [ ] Installation record updated if a module changed
