import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  zip: string;
}

export class CheckoutInfoPage extends BasePage {
  private readonly firstNameInput = this.page.getByTestId('firstName');
  private readonly lastNameInput = this.page.getByTestId('lastName');
  private readonly postalCodeInput = this.page.getByTestId('postalCode');
  private readonly continueButton = this.page.getByTestId('continue');
  private readonly errorMessage = this.page.getByTestId('error');

  constructor(page: Page) {
    super(page);
  }

  async fillForm(info: CheckoutInfo) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.zip);
  }

  async continue() {
    await this.continueButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  isErrorVisible() {
    return this.errorMessage.isVisible();
  }
}
