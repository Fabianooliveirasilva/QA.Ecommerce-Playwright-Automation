# Manual-Assisted Execution Record

## Session information

| Field                                 | Value                                          |
| ------------------------------------- | ---------------------------------------------- |
| Application                           | [SauceDemo](https://www.saucedemo.com/)        |
| Execution mode                        | Playwright MCP-assisted manual browser session |
| Browser context                       | Integrated browser page                        |
| Session date                          | 2026-11-01 12:46 (local session time)          |
| Authentication                        | Public SauceDemo demo accounts                 |
| Automated runner used for this record | No                                             |

This record documents behavior observed by an agent/operator controlling the
browser through Playwright MCP. It is intentionally separate from the
automated Playwright HTML report.

## Architecture alignment

The manual session follows the same boundaries as the codebase:

| Capability | Automated location                                 | Manual checklist                        |
| ---------- | -------------------------------------------------- | --------------------------------------- |
| Login      | `tests/login` and `src/pages/LoginPage.ts`         | Login and error behavior                |
| Inventory  | `tests/inventory` and `src/pages/InventoryPage.ts` | Catalog, sorting, cart actions          |
| Cart       | `tests/cart` and `src/pages/CartPage.ts`           | Items, badge, removal, navigation       |
| Checkout   | `tests/checkout` and `src/pages/CheckoutPage.ts`   | Required fields, totals, completion     |
| Navigation | `tests/navigation` and shared Page Objects         | Logout, access control, browser history |

The Page Objects are the implementation reference for selectors and intent.
The manual session does not execute TypeScript test files or produce automated
pass/fail results.

## Re-execution summary

This record was re-executed after a full project review. The assisted session
used Firefox through Playwright MCP and a fresh browser page for the critical
checkout flow. The automated suite was executed separately: the cross-browser
run completed **92/93 tests**; the isolated WebKit `problem_user` test passed
on retry, confirming an intermittent browser-context failure rather than an
application defect.

## Screenshot evidence

Screenshots were captured during this session with the browser screenshot tool.
They are attached to the session as visual evidence using these labels:

| Evidence ID | Checkpoint         | Observation                                                                       |
| ----------- | ------------------ | --------------------------------------------------------------------------------- |
| MCP-S01     | Login page         | Login form and SauceDemo demo accounts visible                                    |
| MCP-S02     | Inventory          | Products page visible after authentication                                        |
| MCP-S03     | Cart               | Backpack, quantity `1`, and cart badge visible                                    |
| MCP-S04     | Checkout overview  | Product price and payment/total section visible                                   |
| MCP-S05     | Order confirmation | Confirmation page actions visible; snapshot confirmed `Thank you for your order!` |

The screenshots are session artifacts rather than generated Playwright HTML
report attachments. For a permanent repository artifact, export the captured
images to a reviewed evidence folder and link them from this section.

## Observed results

### Login

| Scenario                                 | Status | Evidence observed                                        |
| ---------------------------------------- | ------ | -------------------------------------------------------- |
| Standard user login                      | Passed | Redirected to `/inventory.html`; Products page displayed |
| Invalid credentials                      | Passed | Error displayed: username and password do not match      |
| Empty credentials                        | Passed | Error displayed: username is required                    |
| Locked-out user                          | Passed | Error displayed: user has been locked out                |
| Direct inventory access while logged out | Passed | Redirected to login with access-control message          |

### Inventory

| Scenario                  | Status | Evidence observed                                   |
| ------------------------- | ------ | --------------------------------------------------- |
| Inventory displayed       | Passed | Six products and prices were visible                |
| Product names and prices  | Passed | Backpack `$29.99` and catalog values visible        |
| Price low to high sorting | Passed | Onesie appeared before higher-priced items          |
| Name reverse sorting      | Passed | Products reordered from Z to A                      |
| Add product               | Passed | Cart badge changed to `1`; button changed to Remove |
| Remove product            | Passed | Item was removed and badge became empty             |

### Cart

| Scenario                | Status | Evidence observed                         |
| ----------------------- | ------ | ----------------------------------------- |
| Cart access             | Passed | `/cart.html` opened                       |
| Added product details   | Passed | Product name, quantity, and price visible |
| Remove cart item        | Passed | Cart became empty and badge disappeared   |
| Continue shopping       | Passed | Returned to `/inventory.html`             |
| Browser back navigation | Passed | Returned from cart to inventory           |

### Checkout

| Scenario                       | Status | Evidence observed                     |
| ------------------------------ | ------ | ------------------------------------- |
| Start checkout                 | Passed | Checkout information form opened      |
| Required first name validation | Passed | `First Name is required` displayed    |
| Submit valid customer data     | Passed | Overview page opened                  |
| Item total                     | Passed | `Item total: $29.99` displayed        |
| Tax calculation                | Passed | `Tax: $2.40` displayed                |
| Final total                    | Passed | `Total: $32.39` displayed             |
| Complete order                 | Passed | `Thank you for your order!` displayed |

### Navigation

| Scenario        | Status | Evidence observed                            |
| --------------- | ------ | -------------------------------------------- |
| Logout          | Passed | Returned to login page                       |
| Restricted page | Passed | Unauthenticated inventory access was blocked |
| Browser history | Passed | Back navigation restored inventory           |

### Re-execution observations

- Login via keyboard submission reached `/inventory.html`.
- Product add/remove and cart badge behavior were observed again.
- Checkout was completed in a fresh page using valid customer information.
- The overview displayed `Item total: $29.99`, `Tax: $2.40`, and
  `Total: $32.39`.
- The completion page displayed `Thank you for your order!`.
- Logout returned to the login page, and direct access to `/inventory.html`
  while logged out redirected back to the login page.
- Some integrated-browser clicks reported element-stability timeouts; keyboard
  submission and a fresh page were used to continue without weakening the
  expected-result checks.

## Observed technical events

The browser reported aborted external telemetry requests and occasional 404
resource responses while navigating the public application. These events did
not prevent the observed user flows from completing and were not classified as
product defects.

## Coverage limits

The session did not replace the automated suite and did not execute every
automated test in every browser. In particular, separate manual checks for
each invalid-password variation, all demo accounts, and every checkout
required-field variation remain **Not executed** in this record.

## Reproduction/evidence guidance

For a future session, add the timestamp, browser, scenario ID, exact visible
message, URL, and screenshot or trace reference. Never mark a scenario as
passed based only on navigation; record the observable business result.
