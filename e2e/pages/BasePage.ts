import { Page } from '@playwright/test';

export class BasePage {
  // creating field for every Inheritor of this class
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async getUrl() {
    return this.page.url();
  }
}
