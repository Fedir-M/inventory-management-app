import { test, expect } from '../fixtures/test';

test.describe('HomePage of Inventory Management', () => {
  test('should display the main heading and buttons', async ({ homePage }) => {
    // === 1. ARRANGE (Подготовка) ===
    // Arrange: ручной 'const homePage = new HomePage(page)' больше не нужен!
    // Playwright создал и передал его автоматически.

    // === 2. ACT (Действие) ===
    await homePage.open();

    // === 3. ASSERT (Проверка) ===
    // (проверяем элементы через созданный Page Object)
    await expect(homePage.mainHeading).toHaveText('Inventory Management');

    await expect(homePage.signInLink).toBeVisible();
    await expect(homePage.signInLink).toHaveAttribute('href', '/sign-in');

    await expect(homePage.learnMoreLink).toBeVisible();
    await expect(homePage.learnMoreLink).toHaveAttribute('href', '#');

    await expect(homePage.signUpLink).toBeVisible();
    await expect(homePage.signUpLink).toHaveAttribute('href', '/sign-up');
  });
});
