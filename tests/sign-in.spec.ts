import { test, expect } from '@playwright/test';

test.describe('Authentication - Sign-In', () => {
  // Перед каждым тестом переходим на страницу входа
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in');
  });

  test('01. Should display Sign-In form elements correctly', async ({
    page,
  }) => {
    // 1. Проверяем заголовок или приветствие на странице входа
    const heading = page.locator('h2');
    await expect(heading).toBeVisible();

    // 2. Проверяем поля ввода по связанным лейблам
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await expect(emailInput).toBeVisible();

    const passwordInput = page.getByRole('textbox', { name: /пароль/i });
    await expect(passwordInput).toBeVisible();

    // 3. Проверяем кнопку отправки формы ("Enter")
    const submitButton = page.getByRole('button', { name: /^enter$/i });
    await expect(submitButton).toBeVisible();

    // 4. Проверяем ссылку "Back Home"
    const backHomeLink = page.getByRole('link', { name: 'Back Home' });
    await expect(backHomeLink).toBeVisible();
    await expect(backHomeLink).toHaveAttribute('href', '/');
  });

  test('should show error or validation on empty submit', async ({ page }) => {
    const submitButton = page.getByRole('button', { name: /^enter$/i });
    await submitButton.click();

    await expect(page).toHaveURL('/sign-in');
  });

  test('02. Should successfully Sign-In with valid credentials and redirect to dashboard', async ({
    page,
  }) => {
    // // Включаем логирование консоли браузера, чтобы видеть ошибки Better Auth в терминале
    // page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()));

    const emailInput = page.getByRole('textbox', { name: /email/i });
    await emailInput.fill('shaky@3d.com');

    const passwordInput = page.getByRole('textbox', { name: /пароль/i });
    await passwordInput.fill('Shaky@2026');

    const submitButton = page.getByRole('button', { name: /^enter$/i });

    // Ждем отправки запроса и ответа от бэкенда при клике
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('/api/auth') && res.status() !== 304,
      ),
      submitButton.click(),
    ]);

    console.log('Auth API response status:', response.status());

    // Проверяем редирект
    await expect(page).toHaveURL('/dashboard');
  });
});
