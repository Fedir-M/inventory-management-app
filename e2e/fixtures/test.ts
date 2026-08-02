/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';
export { expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignUpPage } from '../pages/SignUpPage';
import { SignInPage } from '../pages/SignInPage';
import { DashboardPage } from '../pages/DashboardPage';

// Шаг А: Объявляем TypeScript-тип для нашей фикстуры
type MyFixtures = {
  homePage: HomePage;
  signUpPage: SignUpPage;
  signInPage: SignInPage;
  dashboardPage: DashboardPage;
};

// Шаг Б: Расширяем стандартный test
export const test = base.extend<MyFixtures>({
  // --- 1. homePage fixture ---
  homePage: async ({ page }, use) => {
    // 1.1. Создаем объект так же, как ты делал вручную в тесте
    const homePage = new HomePage(page);

    // 1.2. Передаем его в тест (метод use отдаєт объект наружу)
    await use(homePage);
  },

  // --- 2. signUpPage fixture ---
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },

  // --- 3. signInPage fixture ---
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);
    await use(signInPage);
  },

  // --- 4. dashboardPage fixture ---
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page)); // Инициализируем фикстуру
  },
});
