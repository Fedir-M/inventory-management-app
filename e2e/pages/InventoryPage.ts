import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly pageHeaderTitle: Locator;
  readonly pageHeaderDescription: Locator;
  readonly pageHeaderIcon: Locator;

  readonly searchInput: Locator;
  readonly productTable: Locator;
  // локаторы для пагинации
  readonly paginationBlock: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;

  constructor(page: Page) {
    super(page);
    // Локаторы на основе data-testid
    this.pageHeaderTitle = page.getByTestId('inventory-header');
    this.pageHeaderDescription = page.getByTestId('inventory-description');
    this.pageHeaderIcon = page.getByTestId('inventory-icon');

    this.searchInput = page.getByTestId('inventory-search-input');
    this.productTable = page.getByTestId('inventory-product-table');
    // Локаторы элементов пагинацией
    this.paginationBlock = page.getByTestId('inventory-pagination');

    // Ищем через роли или общие интерактивные элементы, так как Shadcn рендерит ссылки
    this.nextButton = this.paginationBlock
      .locator('a, button')
      .filter({ hasText: 'Next' });
    this.prevButton = this.paginationBlock
      .locator('a, button')
      .filter({ hasText: 'Previous' });
  }

  async goto() {
    await this.page.goto('/inventory');
  }

  async searchProduct(query: string) {
    await this.searchInput.fill(query);
  }

  async sortByColumn(columnName: string) {
    // Клик по заголовку таблицы для сортировки
    const headerCell = this.productTable
      .locator('th')
      .filter({ hasText: new RegExp(`^${columnName}$`) });
    await headerCell.click();
  }

  // --- Методы пагинации ---

  async goToNextPage() {
    await this.nextButton.click();
  }

  async goToPrevPage() {
    await this.prevButton.click();
  }

  async goToPage(pageNumber: number | string) {
    // Точный клик по ссылке или кнопке с номером страницы
    await this.paginationBlock
      .locator('a, button')
      .filter({ hasText: new RegExp(`^${pageNumber}$`) })
      .click();
  }
}
