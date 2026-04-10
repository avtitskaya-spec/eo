import { expect } from '@playwright/test';
import { test } from '../../src/helpers/fixtures/fixture';

test.describe('Главная страница', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('Переход по главному баннеру в каталог', async ({page, app}) => {
        await expect(app.main.mainBanner.first()).toBeVisible();
        await app.main.clickButtonBanner();
        await expect(page).toHaveURL(/catalog/);
    });

    test('Поиск товара через Enter открывает страницу результатов', async ({ page, app }) => {
        const query = 'кресло';
        await app.main.fillSearchQuery(query);
        await expect(app.main.searchResults).toBeVisible();
        await expect(app.main.searchResultsItems.first()).toBeVisible();
        await app.main.submitSearch();
        await expect(page).toHaveURL(/search\/\?s=/);
        await expect(app.main.searchPageTitle).toBeVisible();
    });

});
