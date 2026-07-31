import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignUpPage extends BasePage {
  // «оглавление» или спецификация класса. Здесь мы просто заявляем TypeScript: «У нашей страницы будут вот такие элементы с такими именами, и каждый из них является локатором (Locator)».
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly signInLink: Locator;
  readonly backHomeLink: Locator;

  //   Инициализация этих элементов. Здесь мы связываем объявленные поля с реальными селекторами на странице (page.locator, page.getByRole), используя переданный экземпляр браузерной страницы (page). Без этого шага поля были бы просто именами без привязки к HTML.
  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h2');
    this.nameInput = page.locator('#userName'); // или page.getByRole('textbox', { name: /name/i })
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: /sign-up/i });
    this.signInLink = page.getByRole('link', {
      name: /already have\? sign-in/i,
    });
    this.backHomeLink = page.getByRole('link', { name: 'Back Home' });
  }

  // --- Методы класса ---
  // Путь к странице регистрации
  async open() {
    await this.page.goto('/sign-up');
  }

  // Удобный метод для заполнения и отправки формы (инкапсулируем действие регистрации)
  async registerUser(name: string, email: string, pass: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);

    // Логика с ожиданием ответа API, которая была в тесте, тоже может жить здесь или в тесте.
    // Оставим клик здесь или сделаем метод сабмита:
    await this.submitButton.click();
  }
}
