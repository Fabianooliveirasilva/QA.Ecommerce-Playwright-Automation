import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginButton = this.page.getByTestId('login-button');
  readonly errorMessage = this.page.getByTestId('error');

  async login(username: string, password: string): Promise<void> {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
  }

  async loginWithEmptyCredentials(): Promise<void> {
    await this.login('', '');
  }

  async isDisplayed(): Promise<boolean> {
    return this.loginButton.isVisible();
  }
}
