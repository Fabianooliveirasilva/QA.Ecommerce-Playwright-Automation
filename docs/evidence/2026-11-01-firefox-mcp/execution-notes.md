# Firefox MCP Evidence Session

| Field | Value |
| --- | --- |
| Application | [SauceDemo](https://www.saucedemo.com/) |
| Date and time | 2026-11-01 14:13 (local session time) |
| Browser | Firefox through Playwright MCP |
| Account | `standard_user` demo account |
| Execution type | MCP-assisted manual browser session |
| Data handling | No real credentials or personal data used |

## Captured checkpoints

| Scenario | Evidence | Observed result |
| --- | --- | --- |
| LOGIN-01 | [Login form](./LOGIN-01-login-form.png) | SauceDemo login form displayed |
| INV-01 | [Inventory](./INV-01-inventory.png) | Inventory page displayed with six products |
| INV-07 | [Product added](./INV-07-product-added.png) | Backpack added and cart badge displayed |
| CART-02 | [Cart item](./CART-02-cart-item.png) | Backpack, quantity, and price displayed in cart |
| CHECK-01 | [Checkout form](./CHECK-01-checkout-form.png) | Checkout information form displayed |
| CHECK-06 | [Checkout totals](./CHECK-06-checkout-totals.png) | Item total, tax, and final total displayed |
| CHECK-07 | [Order confirmation](./CHECK-07-order-confirmation.png) | `Thank you for your order!` displayed |

## Flow executed

1. Opened the SauceDemo login page.
2. Logged in with the public `standard_user` demo account.
3. Verified the inventory page and captured the six-product catalog.
4. Added Sauce Labs Backpack and verified the cart badge.
5. Opened the cart and captured the product details.
6. Started checkout and captured the information form.
7. Submitted `QA`, `Tester`, and `01000-000` test data.
8. Captured the checkout totals.
9. Finished the order and captured the confirmation message.

These files are real screenshots captured by Playwright MCP during this
session. They are not placeholders or screenshots generated from test data.

