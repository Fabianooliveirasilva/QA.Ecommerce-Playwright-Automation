# Test Cases

The catalogue is shared by the automated runner and MCP-assisted manual
sessions. Automated cases use a fresh browser context. Manual sessions use a
fresh browser state whenever possible and must record the observed status in
[`manual-assisted-execution.md`](./manual-assisted-execution.md).

Unless stated otherwise, the precondition is that the user is on the relevant
page with valid SauceDemo demo data available.

| ID       | Area       | Description                           | Expected result                              | Priority |
| -------- | ---------- | ------------------------------------- | -------------------------------------------- | -------- |
| LOGIN-01 | Login      | Log in with `standard_user`           | Inventory opens                              | P0       |
| LOGIN-02 | Login      | Submit an invalid username            | Authentication error appears                 | P1       |
| LOGIN-03 | Login      | Submit an invalid password            | Authentication error appears                 | P1       |
| LOGIN-04 | Login      | Submit empty credentials              | Required username error appears              | P1       |
| LOGIN-05 | Login      | Log in with `locked_out_user`         | Locked-account error appears                 | P0       |
| LOGIN-06 | Login      | Log in with `problem_user`            | Inventory opens                              | P2       |
| LOGIN-07 | Login      | Log in with `performance_glitch_user` | Inventory opens within classified slow limit | P2       |
| INV-01   | Inventory  | Open inventory                        | Six products are displayed                   | P0       |
| INV-02   | Inventory  | Inspect names and prices              | Product data is visible and correct          | P1       |
| INV-03   | Inventory  | Sort price low to high                | Prices are ascending                         | P1       |
| INV-04   | Inventory  | Sort price high to low                | Prices are descending                        | P1       |
| INV-05   | Inventory  | Sort name A to Z                      | Names are ascending                          | P1       |
| INV-06   | Inventory  | Sort name Z to A                      | Names are descending                         | P1       |
| INV-07   | Inventory  | Add a product                         | Cart badge becomes 1                         | P0       |
| INV-08   | Inventory  | Remove a product                      | Cart badge disappears                        | P1       |
| CART-01  | Cart       | Open the cart                         | Cart URL is displayed                        | P0       |
| CART-02  | Cart       | Review an added product               | Name and price are visible                   | P0       |
| CART-03  | Cart       | Remove a product                      | Item and badge are removed                   | P0       |
| CART-04  | Cart       | Continue shopping                     | Inventory opens                              | P1       |
| CART-05  | Cart       | Add and remove multiple products      | Badge reflects item count                    | P1       |
| CHECK-01 | Checkout   | Start checkout                        | Customer information form opens              | P0       |
| CHECK-02 | Checkout   | Omit first name                       | Required-field error appears                 | P1       |
| CHECK-03 | Checkout   | Omit last name                        | Required-field error appears                 | P1       |
| CHECK-04 | Checkout   | Omit postal code                      | Required-field error appears                 | P1       |
| CHECK-05 | Checkout   | Submit valid information              | Overview page opens                          | P0       |
| CHECK-06 | Checkout   | Review item total, tax, and total     | Totals are mathematically consistent         | P0       |
| CHECK-07 | Checkout   | Finish the order                      | Confirmation message appears                 | P0       |
| NAV-01   | Navigation | Move inventory to cart and back       | Both routes work                             | P1       |
| NAV-02   | Navigation | Log out                               | Login page opens                             | P0       |
| NAV-03   | Navigation | Open inventory without login          | Access is redirected to login                | P0       |
| NAV-04   | Navigation | Use browser back                      | Previous page is restored                    | P2       |
