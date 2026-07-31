import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly backHomeLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h2');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: /^enter$/i });
    this.backHomeLink = page.getByRole('link', { name: 'Back Home' });
  }

  // --- Методы класса ---
  // Путь к странице '/sign-in'
  async open() {
    await this.page.goto('/sign-in');
  }

  async loginUser(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);

    await this.submitButton.click();
  }
}
