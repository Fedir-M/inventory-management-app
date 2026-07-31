import { test, expect } from '../fixtures/test';

test.describe('Authentication - Sign-Up(UI)', () => {
  test('01. Should display SignUp form elements correctly', async ({
    signUpPage,
  }) => {
    // Act
    await signUpPage.open();

    // Assert
    // 1. Проверяем заголовок формы
    await expect(signUpPage.heading).toContainText('Create an account');

    // 2. Проверяем поля ввода по их id (через locator)
    await expect(signUpPage.nameInput).toBeVisible();
    await expect(signUpPage.emailInput).toBeVisible();
    await expect(signUpPage.passwordInput).toBeVisible();

    // 3. Проверяем кнопку отправки ("Sign-Up")
    await expect(signUpPage.submitButton).toBeVisible();

    // 4. Проверяем ссылки навигации
    await expect(signUpPage.signInLink).toBeVisible();
    await expect(signUpPage.signInLink).toHaveAttribute('href', '/sign-in');

    await expect(signUpPage.backHomeLink).toBeVisible();
    await expect(signUpPage.backHomeLink).toHaveAttribute('href', '/');
  });

  test('02. Should successfully SignUp with unique credentials and redirect to /dashboard', async ({
    signUpPage,
    page,
  }) => {
    // === 1. ARRANGE (Подготовка) ===
    // Генерируем уникальный email на основе таймстампа, чтобы тест можно было запускать многократно
    const uniqueEmail = `testuser_${Date.now()}@mail.yes`;

    // === 2. ACT (Действие) ===
    await signUpPage.open();

    // Заполняем форму
    await signUpPage.nameInput.fill('Test User');
    await signUpPage.emailInput.fill(uniqueEmail);
    await signUpPage.passwordInput.fill('SecurePass2026!');

    // Ждем отправки запроса на аутентификацию/регистрацию
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes('/api/auth') && res.status() !== 304,
      ),
      signUpPage.submitButton.click(),
    ]);

    // === 3. ASSERT (Проверка) ===
    console.log('Sign-Up API response status:', response.status());

    // Проверяем успешный редирект на дашборд (через page)
    await expect(page).toHaveURL('/dashboard');
  });
});
