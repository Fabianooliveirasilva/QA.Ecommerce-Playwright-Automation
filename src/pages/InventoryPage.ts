import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly cartLink = this.page.getByTestId('shopping-cart-link');
  readonly inventoryContainer = this.page.getByTestId('inventory-container');
  readonly productCards = this.page.getByTestId('inventory-item');
  readonly sortSelect = this.page.getByTestId('product-sort-container');
  readonly cartBadge = this.page.getByTestId('shopping-cart-badge');

  async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortSelect.selectOption(value);
  }

  async addProduct(productName: string): Promise<void> {
    await this.productCards
      .filter({ hasText: productName })
      .getByRole('button', { name: /add to cart/i })
      .click();
  }

  async removeProduct(productName: string): Promise<void> {
    await this.productCards
      .filter({ hasText: productName })
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async productNames(): Promise<string[]> {
    return this.productCards
      .getByTestId('inventory-item-name')
      .allTextContents();
  }

  async productPrices(): Promise<number[]> {
    const prices = await this.productCards
      .getByTestId('inventory-item-price')
      .allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }

  async openMenu(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
