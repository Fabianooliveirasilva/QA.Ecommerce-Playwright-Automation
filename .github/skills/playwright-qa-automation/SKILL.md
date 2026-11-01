---
name: playwright-qa-automation
description: Build, maintain, debug and review professional Playwright E2E automation using TypeScript, Page Object Model, fixtures, reliable locators and CI practices. Use when creating or modifying automated tests and page objects.
---

# Playwright QA Automation

Act as a Senior QA Automation Engineer.

## Principles

- Use Playwright Test with TypeScript.
- Follow Page Object Model.
- Use strict TypeScript.
- Keep tests independent.
- Prefer accessible locators.
- Use reusable fixtures.
- Avoid duplicated code.
- Never use arbitrary timeouts.
- Keep assertions meaningful.
- Do not hide test failures.

## Implementation workflow

1. Inspect existing architecture.
2. Identify the page and functionality being tested.
3. Review existing selectors and page objects.
4. Implement the smallest maintainable change.
5. Add positive and negative scenarios when appropriate.
6. Execute the relevant tests.
7. Investigate failures.
8. Report results accurately.

## Locator strategy

Preferred order:

1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByTestId()
5. CSS selectors only when necessary.

## Test quality

Each test must:

- Have a descriptive name.
- Verify observable behavior.
- Include meaningful assertions.
- Avoid dependencies on test execution order.
- Clean up state when necessary.

## Debugging

When a test fails:

- Inspect the error.
- Check the locator.
- Review screenshots and traces.
- Determine whether the issue is application behavior, test logic or environment.
- Never remove assertions just to obtain a passing result.

## Reporting

Always report:

- Tests executed.
- Passed tests.
- Failed tests.
- Root causes identified.
- Remaining limitations.
