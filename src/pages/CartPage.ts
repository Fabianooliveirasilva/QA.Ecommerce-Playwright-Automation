import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartItems = this.page.getByTestId('inventory-item');
  readonly checkoutButton = this.page.getByTestId('checkout');
  readonly continueShoppingButton = this.page.getByTestId('continue-shopping');
  readonly cartBadge = this.page.getByTestId('shopping-cart-badge');

  async hasProduct(productName: string): Promise<boolean> {
    return this.cartItems.filter({ hasText: productName }).isVisible();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.cartItems
      .filter({ hasText: productName })
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async productNames(): Promise<string[]> {
    return this.cartItems.getByTestId('inventory-item-name').allTextContents();
  }
}
