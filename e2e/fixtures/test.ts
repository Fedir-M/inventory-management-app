/* eslint-disable react-hooks/rules-of-hooks */
import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage'; // твой класс главной страницы

// Шаг А: Объявляем TypeScript-тип для нашей фикстуры
type MyFixtures = {
  homePage: HomePage;
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
});

// Экспортируем expect, чтобы брать всё из одного файла фикстур
export { expect } from '@playwright/test';
