# Test Strategy

## Testing levels and execution modes

The current framework focuses on:

- **End-to-end tests:** Validate complete user journeys through the browser.
- **Component-level design:** Page Objects isolate UI behavior and selectors.
- **Static quality checks:** TypeScript strict compilation and ESLint run in CI.
- **Assisted manual testing:** Playwright MCP drives a real browser while the
  operator/agent evaluates visible behavior and records evidence.

API, unit, accessibility, visual, and performance testing are intentionally
outside the current scope and are documented as future improvements.

## Automation strategy

Tests are grouped by business capability rather than technical widget. Each
specification has independent setup and uses Playwright's isolated browser
contexts. Page Objects expose intent-revealing actions and state locators;
specifications own the primary assertions.

The suite uses web-first assertions and Playwright auto-waiting. Arbitrary
delays, shared mutable state, CSS-heavy selectors, and XPath are avoided.

## Assisted manual strategy

The MCP-assisted mode follows the same domain folders and test case IDs as the
automated suite. The agent navigates the UI using accessible page information,
performs one focused scenario at a time, observes URL/content/state changes,
and records the result in `docs/manual-assisted-execution.md`.

Manual-assisted results must use one of these states:

- **Passed:** The expected visible behavior was observed.
- **Failed:** The expected behavior was not observed and evidence exists.
- **Blocked:** The scenario could not be completed because of environment or
  application availability.
- **Not executed:** The scenario was not part of the current session.

An assisted manual result is not a substitute for automated cross-browser
coverage. It represents the browser/session context in which it was observed.

## Test data

Demo users and product details are centralized in `src/data`. The four
documented accounts are covered: standard, locked out, problem, and performance
glitch. The shared demo password can be supplied through `SAUCE_PASSWORD`;
secrets must never be committed.

## Quality criteria

A change is ready for review when:

- The TypeScript compiler reports no errors.
- ESLint reports no errors.
- Relevant focused tests pass.
- The complete configured browser suite has been executed when behavior changes.
- Failures are investigated rather than hidden with weaker assertions.
- Test cases and user-visible behavior are documented in English.

## Reporting and CI

The HTML reporter provides navigable test results. Screenshots and videos are
retained for failures, and traces are retained on retries. GitHub Actions
executes validation and uploads reports and test artifacts for every run,
including failed runs.

Manual-assisted evidence is maintained separately as a Markdown execution log
so it remains reviewable without pretending to be an HTML test-run result.
