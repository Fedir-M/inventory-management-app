import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('HomePage of Inventory Management', () => {
  test('should display the main heading and buttons', async ({ page }) => {
    // Arrange (Подготовка)
    const homePage = new HomePage(page);

    // Act (Действие)
    await homePage.open();

    // Assert (Проверка) (проверяем элементы через созданный Page Object)
    await expect(homePage.mainHeading).toHaveText('Inventory Management');

    await expect(homePage.signInLink).toBeVisible();
    await expect(homePage.signInLink).toHaveAttribute('href', '/sign-in');

    await expect(homePage.learnMoreLink).toBeVisible();
    await expect(homePage.learnMoreLink).toHaveAttribute('href', '#');

    await expect(homePage.signUpLink).toBeVisible();
    await expect(homePage.signUpLink).toHaveAttribute('href', '/sign-up');
  });
});
