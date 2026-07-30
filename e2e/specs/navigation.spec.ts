import { test, expect } from '@playwright/test';

test.describe('Authentication - Navigation Flow', () => {
  test('Should navigate between Sign-Up, Sign-In and Home pages correctly', async ({
    page,
  }) => {
    // 1. Открываем страницу регистрации
    await page.goto('/sign-up');

    // 2. Кликаем по ссылке перехода на страницу входа
    const signInLink = page.getByRole('link', {
      name: /already have\? sign-in/i,
    });
    await signInLink.click();
    await expect(page).toHaveURL('/sign-in');

    // 3. Возвращаемся на главную страницу через ссылку "Back Home"
    const backHomeLink = page.getByRole('link', { name: 'Back Home' });
    await backHomeLink.click();
    await expect(page).toHaveURL('/');
  });
});
