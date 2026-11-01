import { expect, test } from '../../src/fixtures/test.fixture';
import { catalog, products } from '../../src/data/products';
import { loginAsStandardUser } from '../../src/utils/test-helpers';

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }) => loginAsStandardUser(page));

  test('displays the complete product inventory', async ({ inventoryPage }) => {
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(inventoryPage.productCards).toHaveCount(catalog.length);
  });

  test('displays product names and prices', async ({ inventoryPage }) => {
    await expect(inventoryPage.productCards.first()).toContainText(
      products.backpack.name,
    );
    await expect(
      inventoryPage.productCards.first().getByTestId('inventory-item-price'),
    ).toHaveText('$29.99');
  });

  test('sorts products by price from low to high', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts products by price from high to low', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.productPrices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sorts products alphabetically', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.productNames();
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test('sorts products in reverse alphabetical order', async ({
    inventoryPage,
  }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.productNames();
    expect(names).toEqual([...names].sort((a, b) => b.localeCompare(a)));
  });

  test('adds a product to the shopping cart', async ({ inventoryPage }) => {
    await inventoryPage.addProduct(products.backpack.name);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('removes a product from the shopping cart', async ({
    inventoryPage,
  }) => {
    await inventoryPage.addProduct(products.backpack.name);
    await inventoryPage.removeProduct(products.backpack.name);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
