# Bug Reports

## Reproducible defects

The following `problem_user` defects were reproduced on 2026-11-01 in
Chromium against the public SauceDemo environment. The comparison used an
independent browser context for `standard_user` and `problem_user`, and
validated the same inventory and cart actions for both accounts.

### BUG-001 - Problem user receives broken inventory images

- **Precondition:** Log in as `problem_user`.
- **Steps:** Open the inventory page and inspect all six product images.
- **Expected result:** Each product displays its corresponding image.
- **Actual result:** All six products display the same `/assets/sl-404-Cq1a9k9X.jpg`
  broken-image asset. The same check with `standard_user` displayed six
  product-specific image assets.
- **Severity:** Medium. Product identification and visual merchandising are
  impaired, but names, prices, and navigation remain available.
- **Evidence:** Reproduction output recorded six identical image sources for
  `problem_user` and six distinct sources for `standard_user`. No screenshot
  is attached yet.

### BUG-002 - Problem user sorting does not reorder products

- **Precondition:** Log in as `problem_user`.
- **Steps:** Select `Price (low to high)` in the inventory sort control.
- **Expected result:** Product prices are displayed in ascending order.
- **Actual result:** The displayed order remained
  `$29.99, $9.99, $15.99, $49.99, $7.99, $15.99`, while
  `standard_user` displayed the expected ascending order.
- **Severity:** Medium. Users cannot reliably use the catalog sorting control.
- **Evidence:** Reproduced in the same independent comparison run. No
  screenshot is attached yet.

### BUG-003 - Problem user cannot remove an item from the cart

- **Precondition:** Log in as `problem_user` and add Sauce Labs Backpack.
- **Steps:** Click Remove for the backpack.
- **Expected result:** The item is removed and the cart badge disappears.
- **Actual result:** The cart badge remained `1` after the remove action. The
  same add/remove flow with `standard_user` removed the item successfully.
- **Severity:** High. Users cannot remove products they selected.
- **Evidence:** Reproduced in the same independent comparison run. No
  screenshot is attached yet.

### Confirmed problem-user behavior that is not defective

- The six product names and prices were displayed correctly.
- Adding a product updated the cart badge to `1`.
- Cart navigation and Continue Shopping returned to the inventory page.

The public SauceDemo environment has occasionally terminated a WebKit process
during a long cross-browser run. The affected scenarios pass when isolated,
so this is currently treated as execution-environment flakiness rather than a
confirmed product defect. During assisted manual exploration, external
telemetry requests also reported `net::ERR_ABORTED`; no user-visible checkout
or navigation failure was observed, so it is not registered as an application
bug.

### WebKit reliability investigation

The intermittent failure was reported as
`browserContext.newPage: Target page, context or browser has been closed`
during a parallel cross-browser execution. It occurred before the test could
perform a navigation or assertion, which rules out a product-level assertion
failure. The affected `problem_user` login scenario passed when run alone, and
the complete nine-test login file also passed in WebKit with four workers.
In the final validation, the two affected checkout and inventory cases also
passed when re-run together in isolated WebKit workers.

The current configuration keeps isolated browser contexts, does not add
arbitrary waits, and uses no local retries. CI retries remain limited to the
existing two attempts. Failure screenshots and traces remain generated
artifacts under ignored directories and are not represented as committed
evidence when they are unavailable.

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
