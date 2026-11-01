# Project instructions

- Use strict TypeScript and the Page Objects under `src/pages`.
- Keep test data in `src/data`, shared fixtures in `src/fixtures`, and reusable
  flow helpers in `src/utils`.
- Keep selectors and page interactions inside Page Objects. Test specifications
  should describe business behavior and own the primary assertions.
- Prefer `getByRole`, `getByLabel`, `getByPlaceholder`, and stable
  `getByTestId` locators. Never use arbitrary timeouts.
- Keep tests isolated, deterministic, and independent of execution order.
- Add positive and negative coverage for critical user journeys.
- Do not weaken assertions to hide a failure. Investigate the root cause first.
- Keep credentials and secrets out of source control; use environment variables
  for environment-specific values.
- Keep documentation in `README.md` and `docs/` written in professional English.
- Run `npm test`, `npm run lint`, and `npx tsc --noEmit` before opening a pull
  request.
