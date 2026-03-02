import { test, expect } from '../fixtures';
import { Users } from '../utils/users';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test('valid credentials navigate to inventory page', async ({ loginPage, page }) => {
    await loginPage.login(Users.standard.username, Users.standard.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('invalid credentials show an error message', async ({ loginPage }) => {
    await loginPage.login('bad_user', 'bad_password');
    await expect(loginPage.isErrorVisible()).resolves.toBe(true);
    const message = await loginPage.getErrorMessage();
    expect(message).toContain('Username and password do not match');
  });

  test('locked-out user sees locked-out error', async ({ loginPage }) => {
    await loginPage.login(Users.lockedOut.username, Users.lockedOut.password);
    const message = await loginPage.getErrorMessage();
    expect(message).toContain('Sorry, this user has been locked out');
  });

  test('logged-in user can log out and return to login page', async ({ loginPage, page }) => {
    await loginPage.login(Users.standard.username, Users.standard.password);
    await expect(page).toHaveURL(/inventory/);
    await loginPage.logout();
    await expect(page).toHaveURL('/');
  });
});
