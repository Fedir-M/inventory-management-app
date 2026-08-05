import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddProductPage extends BasePage {
  // Локаторы хедера
  readonly pageHeaderTitle: Locator;
  readonly pageHeaderDescription: Locator;
  readonly pageHeaderIcon: Locator;

  // Локаторы формы
  readonly nameInput: Locator;
  readonly priceInput: Locator;
  readonly quantityInput: Locator;
  readonly lowStockInput: Locator;
  readonly categoryInput: Locator;
  readonly skuInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    // Инициализация локаторов хедера
    this.pageHeaderTitle = page.getByRole('heading', { name: 'Add product' });
    this.pageHeaderDescription = page.locator(
      'text=Add your new product here.',
    );
    this.pageHeaderIcon = page.locator('svg.text-brand-bg-sideBar');

    // Инициализация локаторов формы с kebab-case data-testid
    this.nameInput = page.locator('[data-testid="product-name-input"]');
    this.priceInput = page.locator('[data-testid="product-price-input"]');
    this.quantityInput = page.locator('[data-testid="product-quantity-input"]');
    this.lowStockInput = page.locator(
      '[data-testid="product-low-stock-input"]',
    );
    this.categoryInput = page.locator('[data-testid="product-category-input"]');
    this.skuInput = page.locator('[data-testid="product-sku-input"]');
    this.descriptionInput = page.locator(
      '[data-testid="product-description-input"]',
    );
    this.submitButton = page.locator('[data-testid="submit-product-btn"]');
  }

  async open() {
    await this.goto('/add-product');
  }

  async fillProductForm(data: {
    name: string;
    price: string;
    quantity: string;
    lowStock?: string;
    category: string;
    sku: string;
    description?: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.priceInput.fill(data.price);
    await this.quantityInput.fill(data.quantity);
    if (data.lowStock) {
      await this.lowStockInput.fill(data.lowStock);
    }
    await this.categoryInput.fill(data.category);
    await this.skuInput.fill(data.sku);
    if (data.description) {
      await this.descriptionInput.fill(data.description);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}
