# Evidence Capture Guide

This directory is reserved for reviewed, real evidence captured during
automated or Playwright MCP-assisted executions. Do not add generated or
placeholder screenshots and do not claim that evidence exists until the file
has been captured and reviewed.

## Capture principles

- Record the execution date, browser, environment URL, account type, and
  scenario ID.
- Capture the visible state after the expected business result is reached.
- Use a descriptive filename with the scenario and checkpoint.
- Keep screenshots free of secrets, tokens, and personal data.
- For failures, retain the screenshot together with the Playwright report,
  video, trace, console output, or network evidence when available.
- Link only evidence files that are committed and actually present in this
  directory.

## Recommended organization

Use one directory per execution session:

```text
docs/evidence/
  2026-11-01-firefox-mcp/
    LOGIN-01-login-success.png
    INV-01-inventory.png
    CART-02-cart-item.png
    CHECK-06-checkout-totals.png
    CHECK-07-order-confirmation.png
    execution-notes.md
```

The `execution-notes.md` file should identify the application URL, browser,
account category, scenario IDs, observed results, and any limitations. Never
include passwords or other credentials.

## Checkpoint checklist

### Login

- Capture the login form before interaction when documenting the starting
  state.
- Capture the inventory page after a successful login for `LOGIN-01`.
- For negative cases, capture the visible error message and login URL.
- Record the exact scenario ID and account category in the execution notes.

### Inventory

- Capture the product grid showing all six products.
- For sorting cases, capture the selected sort option and the resulting order.
- For product validation, ensure names and prices are readable.
- For `problem_user` investigations, capture product images separately from
  the standard-user comparison when a visual difference is relevant.

### Cart

- Capture the cart badge after adding a product.
- Capture the cart page with product name, quantity, and price visible.
- For removal cases, capture the empty state and the badge after removal.
- Record the action that produced the captured state.

### Checkout

- Capture the customer information form when documenting checkout start.
- For validation cases, capture the visible required-field message.
- Capture the overview with item total, tax, and final total readable.
- Verify that the captured totals correspond to the products selected in the
  same session.

### Order confirmation

- Capture the confirmation heading and completion URL after finishing the
  order.
- Include the scenario ID and timestamp in the execution notes.
- Do not treat a navigation event alone as confirmation; the expected visible
  business message must be present.

## Review and maintenance

Before linking evidence from the main documentation:

1. Confirm that the file opens and is readable.
2. Confirm that the URL, browser, scenario, and expected result are recorded.
3. Remove duplicate or obsolete captures.
4. Update the relevant test or bug document if the evidence changes the
   observed result.

