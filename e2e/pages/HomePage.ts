import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;
  readonly signInLink: Locator;
  readonly learnMoreLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = page.locator('h1');
    this.signInLink = page.getByRole('link', { name: 'Sign In' });
    this.learnMoreLink = page.getByRole('link', { name: 'Learn More' });
    this.signUpLink = page.getByRole('link', { name: 'Sign Up' });
  }

  async open() {
    await this.goto('/');
  }
}
