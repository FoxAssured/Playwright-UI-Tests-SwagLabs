import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

const SORT_VALUES: Record<SortOption, string> = {
  az: 'az',
  za: 'za',
  lohi: 'lohi',
  hilo: 'hilo',
};

export class InventoryPage extends BasePage {
  private readonly inventoryList = this.page.getByTestId('inventory-list');
  private readonly sortDropdown = this.page.getByTestId('product-sort-container');
  private readonly cartBadge = this.page.getByTestId('shopping-cart-badge');
  private readonly cartLink = this.page.getByTestId('shopping-cart-link');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/inventory.html');
  }

  async getItemNames(): Promise<string[]> {
    return this.inventoryList
      .getByTestId('inventory-item-name')
      .allInnerTexts();
  }

  async addItemToCart(itemName: string) {
    const item = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: itemName });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async removeItemFromCart(itemName: string) {
    const item = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: itemName });
    await item.getByRole('button', { name: /remove/i }).click();
  }

  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(SORT_VALUES[option]);
  }

  async getCartBadgeCount(): Promise<number> {
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }

  isCartBadgeVisible() {
    return this.cartBadge.isVisible();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
