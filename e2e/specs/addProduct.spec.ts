import { test, expect } from '../fixtures/test';

test.describe('Add Product Page: Structure & Critical Write Operations', () => {
  test.beforeEach(async ({ page, addProductPage }) => {
    // Браузер уже залогинен через storageState.
    // Сразу открываем страницу добавления продукта:
    await addProductPage.open();
    await expect(page).toHaveURL('/add-product');
  });

  //* --- TEST 01: Header Block ---
  test('01. Header - should display correct title, description, and icon', async ({
    addProductPage,
  }) => {
    // === ASSERT ===
    await expect(addProductPage.pageHeaderTitle).toBeVisible();
    await expect(addProductPage.pageHeaderDescription).toBeVisible();
    await expect(addProductPage.pageHeaderIcon).toBeVisible();
  });

  // --- TEST 02: Form Block & Happy Path ---
  test('02. Form - should successfully validate and add a new product', async ({
    addProductPage,
    page,
  }) => {
    // === ARRANGE & ACT ===

    const uniqueSku = `sku-test-${Date.now()}`;

    await addProductPage.fillProductForm({
      name: 'Polymer 3D Filament',
      price: '49.99',
      quantity: '25',
      lowStock: '5',
      category: 'Materials',
      sku: uniqueSku,
      description: 'High quality PLA filament for 3D printing',
    });

    await addProductPage.submit();

    // === ASSERT ===
    await expect(page.locator(`text=${uniqueSku}`)).toBeVisible({
      timeout: 10000,
    });
  });

  // --- TEST 03: Last 10 Added Products Block ---
  test('03. Last 10 Products - should display recent products list containing the newly added item', async ({
    addProductPage,
    page,
  }) => {
    // === ARRANGE & ACT ===

    const uniqueSku = `sku-test-${Date.now()}`;
    const productName = 'Resin Liquid UV';

    await addProductPage.fillProductForm({
      name: productName,
      price: '29.99',
      quantity: '10',
      category: 'Resin',
      sku: uniqueSku,
    });

    await addProductPage.submit();

    // === ASSERT ===
    await expect(page.locator(`text=${uniqueSku}`)).toBeVisible({
      timeout: 10000,
    });
  });
});
