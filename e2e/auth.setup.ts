import { test as setup, expect } from '@playwright/test';
import { SignInPage } from './pages/SignInPage';
import path from 'path';

// Абсолютный путь к файлу сессии
const authFile = path.join(__dirname, '../e2e/.auth/user.json');
// const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const signInPage = new SignInPage(page);

  // 1. Открываем страницу входа и логинимся через UI
  await signInPage.open();
  await signInPage.loginUser('shaky@3d.com', 'Shaky@2026');

  // 2. Убеждаемся, что попали на дашборд
  await expect(page).toHaveURL('/dashboard');

  // 3. Сохраняем состояние сессии в файл
  await page.context().storageState({ path: authFile });
});
