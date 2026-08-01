import { test, expect } from '../fixtures/test';

test.describe('Authentication - Navigation Flow', () => {
  test('Should navigate between Sign-Up, Sign-In and Home pages correctly', async ({
    signUpPage,
    signInPage,
    page,
  }) => {
    // 1. Открываем страницу регистрации
    await signUpPage.open();

    // 2. Кликаем по ссылке перехода на страницу '/sign-in'
    await signUpPage.signInLink.click();
    await expect(page).toHaveURL('/sign-in');

    // 3. Возвращаемся на главную страницу через ссылку "Back Home"
    await signInPage.backHomeLink.click();
    await expect(page).toHaveURL('/');
  });
});
