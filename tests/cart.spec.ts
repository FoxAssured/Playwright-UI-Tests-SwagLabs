import { test, expect } from '../fixtures';
import { Users } from '../utils/users';
import { Products } from '../utils/testData';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.addItemToCart(Products.backpack);
    await inventoryPage.addItemToCart(Products.bikeLight);
    await inventoryPage.goToCart();
  });

  test('added items appear in the cart', async ({ cartPage }) => {
    const names = await cartPage.getCartItemNames();
    expect(names).toContain(Products.backpack);
    expect(names).toContain(Products.bikeLight);
  });

  test('removing an item from the cart takes it out of the list', async ({ cartPage }) => {
    await cartPage.removeItem(Products.backpack);
    const names = await cartPage.getCartItemNames();
    expect(names).not.toContain(Products.backpack);
    expect(names).toContain(Products.bikeLight);
  });

  test('Continue Shopping navigates back to the inventory page', async ({ cartPage, page }) => {
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);
  });

  test('Checkout button navigates to checkout info page', async ({ cartPage, page }) => {
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});
