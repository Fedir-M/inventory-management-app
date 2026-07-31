import { test, expect } from '../fixtures/test';

test.describe('Authentication - Sign-In', () => {
  // Act
  // Перед каждым тестом переходим на страницу входа
  test.beforeEach(async ({ signInPage }) => {
    await signInPage.open();
  });

  // --- Test 01 ---
  test('01. Should display SignIn form elements correctly', async ({
    signInPage,
  }) => {
    // 1. Проверяем заголовок или приветствие на странице входа
    await expect(signInPage.heading).toBeVisible();

    // 2. Проверяем поля ввода по связанным лейблам
    await expect(signInPage.emailInput).toBeVisible();
    await expect(signInPage.passwordInput).toBeVisible();

    // 3. Проверяем кнопку отправки формы ("Enter")
    await expect(signInPage.submitButton).toBeVisible();

    // 4. Проверяем ссылку "Back Home"
    await expect(signInPage.backHomeLink).toBeVisible();
    await expect(signInPage.backHomeLink).toHaveAttribute('href', '/');
  });

  // --- Test 02 ---
  test('02. Should successfully SignIn with valid credentials and redirect to dashboard', async ({
    signInPage,
    page,
  }) => {
    // Act
    await signInPage.emailInput.fill('shaky@3d.com');
    await signInPage.passwordInput.fill('Shaky@2026');

    // Ждем отправки запроса и ответа от бэкенда при клике
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('/api/auth') && res.status() !== 304,
      ),
      signInPage.submitButton.click(),
    ]);

    console.log('Auth API response status:', response.status());

    // Проверяем редирект
    await expect(page).toHaveURL('/dashboard');
  });

  // --- Test 03 ---
  test('03. Should show error or validation on empty submit', async ({
    signInPage,
    page,
  }) => {
    // Act
    await signInPage.submitButton.click();

    // Assert
    await expect(page).toHaveURL('/sign-in');
  });
});
