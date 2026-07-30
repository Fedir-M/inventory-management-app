import { test, expect } from '@playwright/test';

test.describe('Authentication - Sign-Up(UI)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up');
  });

  test('01. Should display Sign-Up form elements correctly', async ({
    page,
  }) => {
    // 1. Проверяем заголовок формы
    const heading = page.locator('h2');
    await expect(heading).toContainText('Create an account');

    // 2. Проверяем поля ввода по их id (через locator)
    const nameInput = page.locator('#userName');
    await expect(nameInput).toBeVisible();

    const emailInput = page.locator('#email');
    await expect(emailInput).toBeVisible();

    const passwordInput = page.locator('#password');
    await expect(passwordInput).toBeVisible();

    // 3. Проверяем кнопку отправки ("Sign-Up")
    const submitButton = page.getByRole('button', { name: /sign-up/i });
    await expect(submitButton).toBeVisible();

    // 4. Проверяем ссылки навигации
    const signInLink = page.getByRole('link', {
      name: /already have\? sign-in/i,
    });
    await expect(signInLink).toBeVisible();
    await expect(signInLink).toHaveAttribute('href', '/sign-in');

    const backHomeLink = page.getByRole('link', { name: 'Back Home' });
    await expect(backHomeLink).toBeVisible();
    await expect(backHomeLink).toHaveAttribute('href', '/');
  });

  test('02. Should successfully Sign-Up with unique credentials and redirect to /dashboard', async ({
    page,
  }) => {
    // // Включаем логирование консоли браузера для отладки
    // page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()));

    // Генерируем уникальный email на основе таймстампа, чтобы тест можно было запускать многократно
    const uniqueEmail = `testuser_${Date.now()}@mail.yes`;

    // Заполняем форму
    const nameInput = page.getByRole('textbox', { name: /name/i });
    await nameInput.fill('Test User');

    const emailInput = page.getByRole('textbox', { name: /e-mail/i });
    await emailInput.fill(uniqueEmail);

    const passwordInput = page.locator('input[type="password"]');
    await passwordInput.fill('SecurePass2026!');

    const submitButton = page.getByRole('button', { name: /sign-up/i });

    // Ждем отправки запроса на аутентификацию/регистрацию
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('/api/auth') && res.status() !== 304,
      ),
      submitButton.click(),
    ]);

    console.log('Sign-Up API response status:', response.status());

    // Проверяем успешный редирект на дашборд
    await expect(page).toHaveURL('/dashboard');
  });
});
