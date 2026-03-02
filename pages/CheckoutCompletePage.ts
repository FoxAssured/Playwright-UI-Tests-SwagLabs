import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
  private readonly completeHeader = this.page.getByTestId('complete-header');
  private readonly completeText = this.page.getByTestId('complete-text');
  private readonly backToProductsButton = this.page.getByTestId('back-to-products');

  constructor(page: Page) {
    super(page);
  }

  async getHeader(): Promise<string> {
    return this.completeHeader.innerText();
  }

  async getCompleteText(): Promise<string> {
    return this.completeText.innerText();
  }

  async backToProducts() {
    await this.backToProductsButton.click();
  }

  isCompleteHeaderVisible() {
    return this.completeHeader.isVisible();
  }
}
