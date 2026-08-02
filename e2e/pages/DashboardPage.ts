import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  // Четыре основных блока дашборда по твоим data-testid
  readonly keyMetricsCard: Locator;
  readonly graphCard: Locator;
  readonly stockLevelsCard: Locator;
  readonly efficiencyCard: Locator;

  // Внутренние KPI-метрики
  readonly totalProductsKpi: Locator;
  readonly totalValueKpi: Locator;
  readonly lowStockKpi: Locator;

  // Внутри блока Stock Levels
  readonly lowStockTab: Locator;
  readonly outOfStockTab: Locator;
  readonly stockRows: Locator;

  // Внутри блока New products per week
  readonly chartPoints: Locator;
  readonly chartTooltip: Locator;

  // Внутри блока Efficiency
  readonly efficiencyMetric: Locator;

  constructor(page: Page) {
    super(page);

    // Локаторы для осн 4х блоков
    this.keyMetricsCard = page.locator('[data-testid="key-metrics-card"]');
    this.graphCard = page.locator('[data-testid="graph-card"]');
    this.stockLevelsCard = page.locator('[data-testid="stock-levels-card"]');
    this.efficiencyCard = page.locator('[data-testid="efficiency-card"]');

    // Локаторы для KPI внутри Key Metrics
    this.totalProductsKpi = page.locator('[data-testid="totalProductsKpi"]');
    this.totalValueKpi = page.locator('[data-testid="totalValueKpi"]');
    this.lowStockKpi = page.locator('[data-testid="totalLowStockKpi"]');

    // Внутри блока Stock Levels
    this.lowStockTab = page.locator('button', { hasText: 'Low Stock' });
    this.outOfStockTab = page.locator('button', { hasText: 'Out of Stock' });
    this.stockRows = page.locator('[data-testid^="stock-row-"]');

    // Локаторы для New products per week
    // Цепляемся за кружочки/точки графика (обычно это элементы circle или интерактивные точки в библиотеках графиков)
    this.chartPoints = page.locator('[data-testid="graph-card"] circle'); // или по селектору точек твоего графика
    this.chartTooltip = page.locator('text=value :'); // или по контейнеру тултипа, судя по скриншоту там есть текст "value :"

    // Локаторы для Efficiency
    this.efficiencyMetric = page.locator(
      '[data-testid="efficiency-card"] [data-testid="efficiency-value"]',
    );
  }

  async open() {
    await this.goto('/dashboard'); // Используем метод из BasePage
  }
}
