import { expect, test } from '../../src/fixtures/test.fixture';
import { products } from '../../src/data/products';
import { loginAsStandardUser } from '../../src/utils/test-helpers';

test.describe('Checkout', () => {
  test.beforeEach(async ({ page, inventoryPage, cartPage }) => {
    await loginAsStandardUser(page);
    await inventoryPage.addProduct(products.backpack.name);
    await inventoryPage.cartLink.click();
    await cartPage.checkout();
  });

  test('starts checkout from the cart', async ({ page }) => {
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });

  test('requires the first name', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('', 'Tester', '01000-000');
    await expect(checkoutPage.errorMessage).toContainText(
      'First Name is required',
    );
  });

  test('requires the last name', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('QA', '', '01000-000');
    await expect(checkoutPage.errorMessage).toContainText(
      'Last Name is required',
    );
  });

  test('requires the postal code', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('QA', 'Tester', '');
    await expect(checkoutPage.errorMessage).toContainText(
      'Postal Code is required',
    );
  });

  test('shows the checkout overview for valid customer information', async ({
    page,
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation('QA', 'Tester', '01000-000');
    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.total).toBeVisible();
  });

  test('calculates item total, tax, and final total', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation('QA', 'Tester', '01000-000');
    const subtotal = await checkoutPage.subtotal.textContent();
    const tax = await checkoutPage.tax.textContent();
    const total = await checkoutPage.total.textContent();
    const amount = (value: string | null): number =>
      Number(value?.replace(/[^0-9.]/g, ''));

    expect(amount(subtotal)).toBe(products.backpack.price);
    expect(amount(tax)).toBeCloseTo(amount(subtotal) * 0.08, 2);
    expect(amount(total)).toBeCloseTo(amount(subtotal) + amount(tax), 2);
  });

  test('completes the order and shows the confirmation message', async ({
    checkoutPage,
  }) => {
    await checkoutPage.fillInformation('QA', 'Tester', '01000-000');
    await checkoutPage.finish();
    await expect(checkoutPage.completeHeader).toHaveText(
      'Thank you for your order!',
    );
  });
});
