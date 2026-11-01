import { expect, test } from '../../src/fixtures/test.fixture';
import { users } from '../../src/data/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => loginPage.open());

  test('logs in successfully with a standard user', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });

  test('rejects an invalid username', async ({ loginPage }) => {
    await loginPage.login('invalid_user', users.standard.password);
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );
  });

  test('rejects an invalid password', async ({ loginPage }) => {
    await loginPage.login(users.standard.username, 'invalid_password');
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service',
    );
  });

  test('requires a username and password', async ({ loginPage }) => {
    await loginPage.loginWithEmptyCredentials();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('does not allow a locked out user to log in', async ({ loginPage }) => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out',
    );
  });

  test('accepts the problem user account', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(users.problem.username, users.problem.password);
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });

  test('accepts the performance glitch user account', async ({
    loginPage,
    inventoryPage,
  }) => {
    test.slow();
    await loginPage.login(
      users.performanceGlitch.username,
      users.performanceGlitch.password,
    );
    await expect(inventoryPage.inventoryContainer).toBeVisible();
  });
});
