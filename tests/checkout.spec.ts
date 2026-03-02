import { test, expect } from '../fixtures';
import { Users } from '../utils/users';
import { Products, Checkout } from '../utils/testData';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.navigate();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.addItemToCart(Products.backpack);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test('complete checkout happy path shows order confirmation', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await checkoutInfoPage.fillForm(Checkout.valid);
    await checkoutInfoPage.continue();

    await expect(page).toHaveURL(/checkout-step-two/);
    const overviewItems = await checkoutOverviewPage.getItemNames();
    expect(overviewItems).toContain(Products.backpack);

    await checkoutOverviewPage.finish();

    await expect(page).toHaveURL(/checkout-complete/);
    const header = await checkoutCompletePage.getHeader();
    expect(header).toBe('Thank you for your order!');
  });

  test('missing first name shows validation error', async ({ checkoutInfoPage }) => {
    await checkoutInfoPage.fillForm(Checkout.missingFirstName);
    await checkoutInfoPage.continue();
    const error = await checkoutInfoPage.getErrorMessage();
    expect(error).toContain('First Name is required');
  });

  test('missing last name shows validation error', async ({ checkoutInfoPage }) => {
    await checkoutInfoPage.fillForm(Checkout.missingLastName);
    await checkoutInfoPage.continue();
    const error = await checkoutInfoPage.getErrorMessage();
    expect(error).toContain('Last Name is required');
  });

  test('missing zip code shows validation error', async ({ checkoutInfoPage }) => {
    await checkoutInfoPage.fillForm(Checkout.missingZip);
    await checkoutInfoPage.continue();
    const error = await checkoutInfoPage.getErrorMessage();
    expect(error).toContain('Postal Code is required');
  });

  test('checkout overview displays correct item and total', async ({
    checkoutInfoPage,
    checkoutOverviewPage,
  }) => {
    await checkoutInfoPage.fillForm(Checkout.valid);
    await checkoutInfoPage.continue();

    const items = await checkoutOverviewPage.getItemNames();
    expect(items).toContain(Products.backpack);

    const total = await checkoutOverviewPage.getTotal();
    expect(total).toMatch(/Total: \$\d+\.\d{2}/);
  });
});
