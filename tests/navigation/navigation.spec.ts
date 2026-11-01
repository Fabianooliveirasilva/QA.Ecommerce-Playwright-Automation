import { expect, test } from '../../src/fixtures/test.fixture';
import { loginAsStandardUser } from '../../src/utils/test-helpers';

test.describe('Navigation', () => {
  test('navigates between inventory and cart', async ({
    page,
    inventoryPage,
    cartPage,
  }) => {
    await loginAsStandardUser(page);
    await inventoryPage.cartLink.click();
    await expect(page).toHaveURL(/\/cart\.html$/);
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test('logs out and returns to the login page', async ({
    page,
    inventoryPage,
    loginPage,
  }) => {
    await loginAsStandardUser(page);
    await inventoryPage.logout();
    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.errorMessage).toHaveCount(0);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('requires authentication to access inventory directly', async ({
    page,
    loginPage,
  }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/\/$/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('supports browser back navigation from the cart', async ({
    page,
    inventoryPage,
  }) => {
    await loginAsStandardUser(page);
    await inventoryPage.cartLink.click();
    await page.goBack();
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });
});
