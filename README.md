# E-commerce Playwright Automation

Professional browser QA framework for
[SauceDemo](https://www.saucedemo.com/) using Playwright, TypeScript, and
Playwright MCP for agent-assisted manual testing.

## Objectives

- Validate critical e-commerce journeys through automated and assisted manual
  browser tests.
- Demonstrate Page Object Model, reusable fixtures, and centralized test data.
- Cover positive and negative behavior across Chromium, Firefox, and WebKit.
- Produce actionable automated reports and structured manual execution records.
- Provide a maintainable QA portfolio foundation.

## Technology stack

- Node.js LTS (20+)
- TypeScript with strict compiler settings
- Playwright Test
- ESLint and Prettier
- GitHub Actions

No application code is modified by this project.

## Architecture

```text
src/
  pages/       Page Objects and locators
  fixtures/    Shared Playwright fixtures
  data/        Typed users and product data
  utils/       Reusable business flows
tests/         Specs grouped by capability
docs/          Test plan, cases, strategy, and bug template
.github/       Project instructions, skills, and CI workflow
```

Page Objects encapsulate selectors and interactions. Test specifications own
the primary behavioral assertions, while fixtures compose the page dependencies.
The SauceDemo `data-test` attribute is configured as Playwright's test ID
attribute. The same page/domain organization is also used as the checklist
structure for MCP-assisted manual sessions.

## Installation

```bash
npm install
npx playwright install
```

## Test execution

```bash
npm test                              # all browsers
npx playwright test --project=chromium
npx playwright test tests/login      # focused directory
npx playwright test --headed
npm run test:ui
npm run mcp                         # start the Playwright MCP server
```

### Assisted manual execution

Start the MCP server and use an MCP-compatible agent to control a real browser:

```bash
npm run mcp
```

The agent-assisted session must follow the cases in
[`docs/test-cases.md`](./docs/test-cases.md), record observable evidence, and
update [`docs/manual-assisted-execution.md`](./docs/manual-assisted-execution.md).
This mode is exploratory/manual execution assisted by browser tools; it is not
the same as running `npm test` and must not be reported as automated coverage.

Static validation:

```bash
npx tsc --noEmit
npm run lint
npm run format
```

## Browser configuration

The default projects are Desktop Chrome (Chromium), Desktop Firefox, and
Desktop Safari (WebKit). The base URL defaults to SauceDemo and can be
overridden without changing source code:

```bash
BASE_URL=https://staging.example.com npm test
```

Each test receives an isolated browser context. CI uses one worker and two
retries; local runs use parallel workers and no retries by default.

## Reporting

The Playwright HTML report is generated in `playwright-report/`:

```bash
npm run report
```

Screenshots are captured on failure, videos are retained on failure, and traces
are collected on the first retry. These generated directories are excluded
from source control.

The Playwright MCP server is available through `npm run mcp` for agent-assisted
browser exploration. It is restricted to the SauceDemo host.

## CI/CD

`.github/workflows/playwright.yml` runs on pushes and pull requests. It:

1. Installs Node.js and dependencies using npm cache and `npm ci`.
2. Installs Playwright browsers and system dependencies.
3. Runs TypeScript and ESLint checks.
4. Executes the cross-browser suite.
5. Uploads the HTML report and test artifacts even when tests fail.

## Automated coverage summary

There are 31 scenarios per browser (93 project test executions):

- Login: valid, invalid, empty, locked, problem, and performance-glitch users.
- Inventory: display, names/prices, four sorting modes, add, and remove.
- Cart: access, product details, removal, continue shopping, and badge count.
- Checkout: start, required fields, overview, totals, completion, and
  confirmation.
- Navigation: inventory/cart flow, logout, access control, and browser back.

See [`docs/test-cases.md`](./docs/test-cases.md) for the test case catalogue.

## Assisted manual coverage

The manual session documented in
[`docs/manual-assisted-execution.md`](./docs/manual-assisted-execution.md)
covered the critical login, inventory, cart, checkout, and navigation flows
through the browser UI. It is an evidence-based exploratory session and does
not replace the automated cross-browser suite.

## Known limitations

- SauceDemo is a public external dependency; availability and response time
  can affect test execution.
- `performance_glitch_user` intentionally has slower application behavior and
  is covered with an explicit slow-test classification.
- Browser binaries must be installed before the first local execution.
- The project does not include API, database, accessibility, or visual
  regression testing.

## Future improvements

- Add API-level contract checks when a stable API is available.
- Add accessibility checks with a dedicated, approved tool.
- Add visual baselines for high-value pages.
- Publish trend metrics and flaky-test history from CI.
- Add test sharding when the suite grows.

## Test data and security

The repository uses public SauceDemo demo accounts only. The shared password
can be overridden with `SAUCE_PASSWORD`; do not commit real credentials,
secrets, or API keys.
