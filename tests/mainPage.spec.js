import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';

test.describe('Главная страница', () => {
    test.beforeEach(async ({ page }, testinfo) => {
        await page.goto(testinfo.project.use.baseURL);
    });

    test('Проверка главного баннера', async ({page, app}) => {
        await expect(app.main.mainBanner.first()).toBeVisible();
        await app.main.clickButtonBanner();
        await expect(page).toHaveURL(/catalog/);
    });

    test('Блок "Наши бренды"', async ({app}) => {
        const block = app.main.brandBlock;
        const brandItems = app.main.brandItems;
        await expect(block).toBeVisible();
        await expect(brandItems.first()).toBeVisible();
        const count = await brandItems.count();
        expect(count).toBe(14);
    });

});
