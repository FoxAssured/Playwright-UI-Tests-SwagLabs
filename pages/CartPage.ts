import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartItems = this.page.getByTestId('cart-item');
  private readonly checkoutButton = this.page.getByTestId('checkout');
  private readonly continueShoppingButton = this.page.getByTestId('continue-shopping');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/cart.html');
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_name').allInnerTexts();
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
