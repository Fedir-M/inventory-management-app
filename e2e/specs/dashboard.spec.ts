import { test, expect } from '../fixtures/test';

test.describe('Dashboard: Analytics & State Validation', () => {
  //* --- TEST 01: Key Metrics ---
  test('01. Key Metrics - should display main cards and correct KPI data formats', async ({
    signInPage,
    dashboardPage,
    page,
  }) => {
    // === ARRANGE & ACT ===
    await signInPage.open();
    await signInPage.loginUser('shaky@3d.com', 'Shaky@2026');
    await expect(page).toHaveURL('/dashboard');

    // === ASSERT MACRO (Структура дашборда) ===
    await expect(dashboardPage.keyMetricsCard).toBeVisible();
    await expect(dashboardPage.graphCard).toBeVisible();
    await expect(dashboardPage.stockLevelsCard).toBeVisible();
    await expect(dashboardPage.efficiencyCard).toBeVisible();

    // === ASSERT MICRO (KPI метрики) ===
    await expect(dashboardPage.totalProductsKpi).toBeVisible();
    const productsText = await dashboardPage.totalProductsKpi.textContent();
    expect(productsText).toMatch(/\d+/);

    await expect(dashboardPage.totalValueKpi).toBeVisible();
    const valueText = await dashboardPage.totalValueKpi.textContent();
    expect(valueText).toMatch(/\$\s?[\d,.]+/);

    await expect(dashboardPage.lowStockKpi).toBeVisible();
    const lowStockText = await dashboardPage.lowStockKpi.textContent();
    expect(lowStockText).toMatch(/\d+/);
  });

  //* --- TEST 02: Stock Levels ---
  test('02. Stock Levels - should support tab switching and product navigation', async ({
    signInPage,
    dashboardPage,
    page,
  }) => {
    // === ARRANGE & ACT ===
    await signInPage.open();
    await signInPage.loginUser('shaky@3d.com', 'Shaky@2026');
    await expect(page).toHaveURL('/dashboard');

    // === ASSERT MICRO (Stock Levels) ===
    await expect(dashboardPage.stockLevelsCard).toBeVisible();

    // По умолчанию активна вкладка Low Stock, проверяем строки
    // .first() — метод Playwright, сужающий выборку до самого первого элемента коллекции.
    const firstRow = dashboardPage.stockRows.first();
    await expect(firstRow).toBeVisible();

    // Переключаемся на вкладку Out of Stock
    await dashboardPage.outOfStockTab.click();

    // Проверяем клик по первой строке и навигацию на детальную страницу товара
    const targetRow = dashboardPage.stockRows.first();
    if (await targetRow.isVisible()) {
      await targetRow.click();
      await expect(page).toHaveURL(/\/product\/.+/);
    }
  });

  //* --- TEST 03: New products per week ---
  test('03. New products per week - should display chart and show tooltip on hover', async ({
    signInPage,
    dashboardPage,
    page,
  }) => {
    // === ARRANGE & ACT ===
    await signInPage.open();
    await signInPage.loginUser('shaky@3d.com', 'Shaky@2026');
    await expect(page).toHaveURL('/dashboard');

    // === ASSERT MICRO (New products per week) ===
    // 1. Проверяем видимость карточки графика
    await expect(dashboardPage.graphCard).toBeVisible();

    // 2. Проверяем наличие точек на графике
    const firstPoint = dashboardPage.chartPoints.first();
    await expect(firstPoint).toBeVisible();

    const pointsCount = await dashboardPage.chartPoints.count();
    expect(pointsCount).toBeGreaterThan(0);

    // 3. Наводим на одну из точек (например, на последнюю или первую) и проверяем тултип
    await firstPoint.hover();

    // 4. Проверяем, что появился тултип с данными (как на скриншоте)
    await expect(dashboardPage.chartTooltip).toBeVisible();
    const tooltipText = await dashboardPage.chartTooltip.textContent();
    expect(tooltipText).toContain('value');
  });

  //* --- TEST 04: Efficiency ---
  test('04. Efficiency - should display efficiency card and metric value correctly', async ({
    signInPage,
    dashboardPage,
    page,
  }) => {
    // === ARRANGE & ACT ===
    await signInPage.open();
    await signInPage.loginUser('shaky@3d.com', 'Shaky@2026');
    await expect(page).toHaveURL('/dashboard');

    // === ASSERT MICRO (Efficiency Block) ===
    // 1. Проверяем видимость карточки Efficiency
    await expect(dashboardPage.efficiencyCard).toBeVisible();

    // 2. Проверяем, что внутри карточки присутствует корректная метрика (например, число или процент)
    const efficiencyValue = dashboardPage.efficiencyCard.locator(
      '[data-testid="efficiency-value"]',
    );
    await expect(efficiencyValue).toBeVisible();
    await expect(dashboardPage.efficiencyCard).not.toBeEmpty();
  });
});
