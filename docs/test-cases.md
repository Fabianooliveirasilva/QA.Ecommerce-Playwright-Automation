# Test Cases

The catalogue is shared by the automated runner and MCP-assisted manual
sessions. Automated cases use a fresh browser context. Manual sessions use a
fresh browser state whenever possible and must record the observed status in
[`manual-assisted-execution.md`](./manual-assisted-execution.md).

Unless stated otherwise, the precondition is that the user is on the relevant
page with valid SauceDemo demo data available.

Automated coverage contains **33 scenarios per browser**: 9 login, 8
inventory, 5 cart, 7 checkout, and 4 navigation tests. The `Automated`
column maps each case to the current Playwright specification; `Manual`
means the case is also suitable for MCP-assisted exploration, not that it is
executed by `npm test`.

| ID       | Area       | Description                           | Expected result                              | Priority | Automated | Manual |
| -------- | ---------- | ------------------------------------- | -------------------------------------------- | -------- | --------- | ------ |
| LOGIN-01 | Login      | Log in with `standard_user`           | Inventory opens                              | P0       | Yes       | Yes    |
| LOGIN-02 | Login      | Submit an invalid username            | Authentication error appears                 | P1       | Yes       | Yes    |
| LOGIN-03 | Login      | Submit an invalid password             | Authentication error appears                | P1       | Yes       | Yes    |
| LOGIN-04 | Login      | Submit empty credentials              | Required username error appears              | P1       | Yes       | Yes    |
| LOGIN-05 | Login      | Username without password             | Exact password-required error appears        | P1       | Yes       | Yes    |
| LOGIN-06 | Login      | Password without username             | Exact username-required error appears        | P1       | Yes       | Yes    |
| LOGIN-07 | Login      | Log in with `locked_out_user`         | Locked-account error appears                 | P0       | Yes       | Yes    |
| LOGIN-08 | Login      | Log in with `problem_user`            | Inventory opens                              | P2       | Yes       | Yes    |
| LOGIN-09 | Login      | Log in with `performance_glitch_user` | Inventory opens within classified slow limit | P2       | Yes       | Yes    |
| INV-01   | Inventory  | Open inventory                        | Six products are displayed                   | P0       | Yes       | Yes    |
| INV-02   | Inventory  | Inspect names and prices              | All six values match test data               | P1       | Yes       | Yes    |
| INV-03   | Inventory  | Sort price low to high                | Prices are ascending                         | P1       | Yes       | Yes    |
| INV-04   | Inventory  | Sort price high to low                | Prices are descending                        | P1       | Yes       | Yes    |
| INV-05   | Inventory  | Sort name A to Z                      | Names are ascending                          | P1       | Yes       | Yes    |
| INV-06   | Inventory  | Sort name Z to A                      | Names are descending                         | P1       | Yes       | Yes    |
| INV-07   | Inventory  | Add a product                         | Cart badge becomes 1                         | P0       | Yes       | Yes    |
| INV-08   | Inventory  | Remove a product                      | Cart badge disappears                        | P1       | Yes       | Yes    |
| CART-01  | Cart       | Open the cart                         | Cart URL is displayed                        | P0       | Yes       | Yes    |
| CART-02  | Cart       | Review an added product               | Name and price are visible                   | P0       | Yes       | Yes    |
| CART-03  | Cart       | Remove a product                      | Item and badge are removed                   | P0       | Yes       | Yes    |
| CART-04  | Cart       | Continue shopping                     | Inventory opens                              | P1       | Yes       | Yes    |
| CART-05  | Cart       | Add and remove multiple products      | Badge reflects item count                   | P1       | Yes       | Yes    |
| CHECK-01 | Checkout   | Start checkout                        | Customer information form opens              | P0       | Yes       | Yes    |
| CHECK-02 | Checkout   | Omit first name                       | Required-field error appears                 | P1       | Yes       | Yes    |
| CHECK-03 | Checkout   | Omit last name                        | Required-field error appears                 | P1       | Yes       | Yes    |
| CHECK-04 | Checkout   | Omit postal code                      | Required-field error appears                 | P1       | Yes       | Yes    |
| CHECK-05 | Checkout   | Submit valid information              | Overview page opens                          | P0       | Yes       | Yes    |
| CHECK-06 | Checkout   | Review item total, tax, and total     | Totals are mathematically consistent         | P0       | Yes       | Yes    |
| CHECK-07 | Checkout   | Finish the order                      | Confirmation message appears                 | P0       | Yes       | Yes    |
| NAV-01   | Navigation | Move inventory to cart and back       | Both routes work                             | P1       | Yes       | Yes    |
| NAV-02   | Navigation | Log out                               | Login page opens                             | P0       | Yes       | Yes    |
| NAV-03   | Navigation | Open inventory without login          | Access is redirected to login                | P0       | Yes       | Yes    |
| NAV-04   | Navigation | Use browser back                      | Previous page is restored                    | P2       | Yes       | Yes    |

## Manual-only exploratory scenarios

The following are not part of the 33 automated scenarios and must not be
reported as automated coverage:

- Compare `standard_user` and `problem_user` product images.
- Investigate `problem_user` sorting and cart-removal behavior.
- Capture and export screenshots, console messages, and network observations
  during an MCP-assisted session.
- Explore unlisted demo accounts or visual behavior outside the assertions in
  the Playwright specs.

The confirmed `problem_user` findings are documented in
[`bug-reports.md`](./bug-reports.md).
