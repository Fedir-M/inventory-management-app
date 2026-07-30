import { test, expect } from '@playwright/test';

test.describe('HomePage of Inventory Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main heading and buttons', async ({ page }) => {
    // 1. проверка загаловка + наличие самого текста
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Inventory Management');

    // 2. Проверяем, что ссылка "Sign In" видна и ведет на правильный маршрут
    const signInLink = page.getByRole('link', { name: 'Sign In' });
    await expect(signInLink).toBeVisible();
    await expect(signInLink).toHaveAttribute('href', '/sign-in');

    // 3. Проверяем ссылку "Learn More"
    const learnMoreLink = page.getByRole('link', { name: 'Learn More' });
    await expect(learnMoreLink).toBeVisible();
    await expect(learnMoreLink).toHaveAttribute('href', '#');

    // 4. Проверяем ссылку "Sign Up" внутри блока регистрации
    const signUpLink = page.getByRole('link', { name: 'Sign Up' });
    await expect(signUpLink).toBeVisible();
    await expect(signUpLink).toHaveAttribute('href', '/sign-up');
  });
});
