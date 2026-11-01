# Bug Reports

## Reproducible defects

No application defect has been confirmed by the automated suite or the
assisted manual session documented in
[`manual-assisted-execution.md`](./manual-assisted-execution.md).

The public SauceDemo environment has occasionally terminated a WebKit process
during a long cross-browser run. The affected scenarios pass when isolated,
so this is currently treated as execution-environment flakiness rather than a
confirmed product defect. During assisted manual exploration, external
telemetry requests also reported `net::ERR_ABORTED`; no user-visible checkout
or navigation failure was observed, so it is not registered as an application
bug.

## Bug report template

### Summary

Short, action-oriented description.

### Environment

- Application URL:
- Browser and version:
- Operating system:
- Build or commit:

### Preconditions

Required account, data, and application state.

### Steps to reproduce

1.
2.
3.

### Expected result

Describe the correct business behavior.

### Actual result

Describe the observed behavior and frequency.

### Evidence

Attach the Playwright report, screenshot, video, trace, console output, or
network evidence.

### Severity and priority

State impact, urgency, and rationale.
