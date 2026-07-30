import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = page.locator('h1'); // Или уточним селектор под вашу верстку
  }

  async open() {
    await this.goto('/');
  }
}
