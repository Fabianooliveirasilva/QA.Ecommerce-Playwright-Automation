# Test Plan

## Scope

This plan covers the critical customer journey in SauceDemo through two
complementary modes:

- Automated Playwright specifications for repeatable regression coverage.
- Playwright MCP-assisted manual sessions for guided exploration and direct
  observation of the user experience.

Both modes use the same capability structure:

- Authentication and account access.
- Product inventory and sorting.
- Cart management.
- Checkout validation, totals, and order completion.
- Navigation, logout, and restricted-page behavior.

## Objectives

The combined approach provides fast regression feedback while retaining human
observation of content, navigation, validation messages, and unexpected
behavior. Automated results and assisted-manual observations are reported
separately.

## Risks

| Risk                           | Impact | Mitigation                                    |
| ------------------------------ | ------ | --------------------------------------------- |
| Public application unavailable | High   | Fail explicitly and preserve traces/artifacts |
| Intentional slow demo account  | Medium | Isolate the account and classify it as slow   |
| Browser-specific behavior      | Medium | Run Chromium, Firefox, and WebKit             |
| Selector changes               | High   | Prefer accessible and `data-test` locators    |
| Shared state between tests     | High   | Use isolated contexts and independent setup   |

## Approach

Tests are organized by capability and use Page Objects for UI behavior,
fixtures for composition, and typed data constants for repeatability. Automated
assertions remain close to the test scenario and use Playwright web-first
expectations. Assisted manual sessions use the same Page Object and test-case
structure as a checklist, but the result is based on visible browser evidence
recorded by the operator/agent.

Local development uses parallel workers. CI uses a single worker with retries
to reduce contention and retain reliable diagnostics. Every failed run retains
screenshots, videos, traces, and the HTML report where available.

## Entry and exit criteria

Entry criteria:

- Dependencies are installed.
- Playwright browsers are installed.
- The target URL is reachable.

Exit criteria:

- TypeScript compilation passes.
- ESLint passes.
- Critical scenarios pass in the configured browser projects.
- Any unresolved failure is documented with evidence.
- The assisted manual session has a dated execution record when requested.
