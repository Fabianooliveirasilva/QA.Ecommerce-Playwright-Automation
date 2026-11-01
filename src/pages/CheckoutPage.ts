import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput = this.page.getByTestId('firstName');
  readonly lastNameInput = this.page.getByTestId('lastName');
  readonly postalCodeInput = this.page.getByTestId('postalCode');
  readonly errorMessage = this.page.getByTestId('error');
  readonly subtotal = this.page.getByTestId('subtotal-label');
  readonly tax = this.page.getByTestId('tax-label');
  readonly total = this.page.getByTestId('total-label');
  readonly completeHeader = this.page.getByTestId('complete-header');

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.page.getByTestId('continue').click();
  }

  async finish(): Promise<void> {
    await this.page.getByTestId('finish').click();
  }

  async cancel(): Promise<void> {
    await this.page.getByTestId('cancel').click();
  }
}
