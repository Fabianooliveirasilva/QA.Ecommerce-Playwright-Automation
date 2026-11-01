import { type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../data/users';

export async function loginAsStandardUser(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
}
