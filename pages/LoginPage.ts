import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByTestId('username');
  private readonly passwordInput = this.page.getByTestId('password');
  private readonly loginButton = this.page.getByTestId('login-button');
  private readonly errorMessage = this.page.getByTestId('error');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.innerText();
  }

  isErrorVisible() {
    return this.errorMessage.isVisible();
  }
}
