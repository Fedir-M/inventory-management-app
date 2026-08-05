import { test, expect } from '../fixtures/test';

test.describe('Authentication Guard & Access Control', () => {
  // Сбрасываем storageState для всех тестов в этом блоке, чтобы проверить гостей
  test.use({ storageState: { cookies: [], origins: [] } });

  // Массив защищенных маршрутов, которые должен проверять тест
  const protectedRoutes = [
    '/dashboard',
    '/inventory',
    '/add-product',
    '/settings',
  ];

  // 1. Тест редиректов для гостей (неавторизованных пользователей)
  for (const route of protectedRoutes) {
    test(`Should redirect unauthenticated user from ${route} to /sign-in`, async ({
      page,
    }) => {
      // Пытаемся напрямую перейти на защищенный маршрут
      await page.goto(route);

      // Ожидаем принудительный редирект на страницу входа
      await expect(page).toHaveURL('/sign-in');
    });
  }
});

// Отдельный блок для тестов, которым нужна авторизация (если есть другие тесты)
test.describe('Authenticated Flow', () => {
  // 2. Тест успешного входа (authenticated flow)
  test('Should successfully login with valid credentials and redirect to /dashboard', async ({
    signInPage,
    page,
  }) => {
    // Открываем страницу входа
    await signInPage.open();

    // Используем готовый метод логина или заполняем поля
    await signInPage.emailInput.fill('shaky@3d.com');
    await signInPage.passwordInput.fill('Shaky@2026');

    // Перехватываем сетевой запрос авторизации и кликаем submit
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) =>
          res.url().includes('/api/auth/sign-in/email') && res.status() !== 304,
      ),
      signInPage.submitButton.click(),
    ]);

    // Проверяем, что бэкенд ответил успешно
    console.log('Auth API response status:', response.status());
    expect(response.status()).toBe(200);

    // Проверяем успешный редирект на дашборд
    await expect(page).toHaveURL('/dashboard');
  });
});
