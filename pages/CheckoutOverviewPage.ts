import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly cartItems = this.page.getByTestId('cart-item');
  private readonly subtotalLabel = this.page.getByTestId('subtotal-label');
  private readonly taxLabel = this.page.getByTestId('tax-label');
  private readonly totalLabel = this.page.getByTestId('total-label');
  private readonly finishButton = this.page.getByTestId('finish');

  constructor(page: Page) {
    super(page);
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_name').allInnerTexts();
  }

  async getSubtotal(): Promise<string> {
    return this.subtotalLabel.innerText();
  }

  async getTax(): Promise<string> {
    return this.taxLabel.innerText();
  }

  async getTotal(): Promise<string> {
    return this.totalLabel.innerText();
  }

  async finish() {
    await this.finishButton.click();
  }
}
