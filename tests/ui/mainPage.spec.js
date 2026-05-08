import { test, expect } from '../../src/helpers/fixtures/fixture';

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
        await app.main.search(query);
        await expect(page).toHaveURL(/search\/\?s=/);
        await expect(app.main.searchPageTitle).toBeVisible();
    });

    test('Поиск по первой подсказке открывает страницу с результатами', async ({ page, app }) => {
        const startUrl = page.url();
        await app.main.openFirstSuggestion('стол');
        await expect(page).toHaveURL(/search|catalog/);
        await expect(page).not.toHaveURL(startUrl);
    });

});
