import { test, expect } from '../fixtures';
import { Users } from '../utils/users';
import { Products } from '../utils/testData';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.navigate();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.navigate();
  });

  test('all six products are listed on the inventory page', async ({ inventoryPage }) => {
    const names = await inventoryPage.getItemNames();
    expect(names).toHaveLength(6);
  });

  test('sort A→Z orders products alphabetically ascending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort());
  });

  test('sort Z→A orders products alphabetically descending', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getItemNames();
    expect(names).toEqual([...names].sort().reverse());
  });

  test('cart badge increments when item is added', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(Products.backpack);
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(1);
  });

  test('cart badge updates for multiple added items', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(Products.backpack);
    await inventoryPage.addItemToCart(Products.bikeLight);
    const count = await inventoryPage.getCartBadgeCount();
    expect(count).toBe(2);
  });
});
