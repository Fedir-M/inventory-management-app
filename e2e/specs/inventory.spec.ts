import { test, expect } from '../fixtures/test';

test.describe('Inventory Page E2E Tests', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await inventoryPage.goto();
    await expect(page).toHaveURL('/inventory');
  });

  //* --- TEST 01: inventory header ---
  test('01. Should display inventory header: title, desc and icon', async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.pageHeaderTitle).toBeVisible();
    await expect(inventoryPage.pageHeaderDescription).toBeVisible();
    await expect(inventoryPage.pageHeaderIcon).toBeVisible();
  });

  //* --- TEST 02: Input & search products ---
  test('02. Should allow user to type search query into search input', async ({
    inventoryPage,
  }) => {
    // --- 02.1 ---
    // Проверяем, что инпут виден и доступен для ввода
    await expect(inventoryPage.searchInput).toBeVisible();

    // Вводим поисковый запрос
    await inventoryPage.searchProduct('Selene');

    // Проверяем, что значение в инпуте обновилось корректно
    await expect(inventoryPage.searchInput).toHaveValue('Selene');

    // --- 02.2 ---
    // Вводим запрос для фильтрации
    await inventoryPage.searchProduct('Selene');

    // Проверяем, что в таблице отображается искомый товар, а остальные отфильтровались
    await expect(inventoryPage.productTable).toContainText('Selene Ultimate');
  });

  //* --- TEST 03: Product Table & Sorting ---
  test('03. Should display product table and allow sorting by column', async ({
    inventoryPage,
  }) => {
    // Проверяем видимость таблицы
    await expect(inventoryPage.productTable).toBeVisible();

    // Кликаем по заголовку колонки Title для сортировки
    await inventoryPage.sortByColumn('Title');

    // Проверяем, что таблица осталась видимой после сортировки
    await expect(inventoryPage.productTable).toBeVisible();
  });

  //* --- TEST 04: Pagination ---
  test('04. Should handle pagination correctly', async ({ inventoryPage }) => {
    // Проверяем видимость блока пагинации
    await expect(inventoryPage.paginationBlock).toBeVisible();

    // Переходим на вторую страницу
    await inventoryPage.goToPage(2);

    // Проверяем, что кнопка второй страницы активна
    const pageTwoButton = inventoryPage.paginationBlock
      .locator('a, button')
      .filter({ hasText: /^2$/ });
    await expect(pageTwoButton).toHaveAttribute('data-active', 'true');

    // Возвращаемся на предыдущую страницу
    await inventoryPage.goToPrevPage();

    // Проверяем, что первая страница снова активна
    const pageOneButton = inventoryPage.paginationBlock
      .locator('a, button')
      .filter({ hasText: /^1$/ });
    await expect(pageOneButton).toHaveAttribute('data-active', 'true');
  });
});
