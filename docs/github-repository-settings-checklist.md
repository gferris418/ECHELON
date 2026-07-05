# ECHELON GitHub Repository Settings Checklist

This checklist covers controls that cannot be enforced from repository files alone. Complete it in GitHub repository settings and record the date, verifier, and screenshot/reference in issue `#3` and issue `#4`.

## Main branch protection

- [ ] Require pull request before merging.
- [ ] Require at least one approval.
- [ ] Dismiss stale approvals when new commits are pushed.
- [ ] Require conversation resolution before merging.
- [ ] Require the `Documentation integrity / verify` status check.
- [ ] Require branches to be up to date before merge where practical.
- [ ] Block force pushes.
- [ ] Block branch deletion.
- [ ] Restrict who can bypass protection.
- [ ] Disable direct pushes to `main`.

## Actions

- [ ] Allow only approved actions and reusable workflows.
- [ ] Require actions to be SHA-pinned where the repository policy requires it.
- [ ] Use the minimum `GITHUB_TOKEN` permissions at workflow and job level.
- [ ] Review third-party action provenance before approval.

## Security features

- [ ] Enable private vulnerability reporting.
- [ ] Enable secret scanning.
- [ ] Enable push protection.
- [ ] Enable dependency graph and Dependabot alerts where available.
- [ ] Enable code scanning when actual application code and supported languages are introduced.

## Access and recoverability

- [ ] Review repository collaborators and remove unused access.
- [ ] Confirm at least two recovery-capable repository administrators, if organizational policy allows.
- [ ] Verify GitHub account multi-factor authentication for administrators.
- [ ] Record a safe ownership/recovery procedure.

## Verification record

| Date | Verified by | Settings reviewed | Evidence location | Notes |
|---|---|---|---|---|
| YYYY-MM-DD | unassigned | branch protection / Actions / security / access | issue or internal record | pending |
