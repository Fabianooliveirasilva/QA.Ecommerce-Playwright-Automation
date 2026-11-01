import { expect, test } from '../../src/fixtures/test.fixture';
import { products } from '../../src/data/products';
import { loginAsStandardUser } from '../../src/utils/test-helpers';

test.describe('Cart', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await loginAsStandardUser(page);
    await inventoryPage.addProduct(products.backpack.name);
  });

  test('is accessible from the inventory', async ({ page, inventoryPage }) => {
    await inventoryPage.cartLink.click();
    await expect(page).toHaveURL(/\/cart\.html$/);
  });

  test('displays added products and their price', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.cartLink.click();
    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(
      cartPage.cartItems.filter({ hasText: products.backpack.name }),
    ).toBeVisible();
    await expect(
      cartPage.cartItems.first().getByTestId('inventory-item-price'),
    ).toHaveText('$29.99');
  });

  test('removes a product from the cart', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.cartLink.click();
    await cartPage.removeProduct(products.backpack.name);
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });

  test('continues shopping from the cart', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.cartLink.click();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test('updates the cart badge as products are added and removed', async ({
    inventoryPage,
    cartPage,
  }) => {
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.addProduct(products.bikeLight.name);
    await expect(inventoryPage.cartBadge).toHaveText('2');
    await inventoryPage.cartLink.click();
    await cartPage.removeProduct(products.backpack.name);
    await expect(cartPage.cartBadge).toHaveText('1');
  });
});
