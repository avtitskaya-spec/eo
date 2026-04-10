import {expect} from "@playwright/test";
import { test } from '../../src/helpers/fixtures/fixture';
import {pagesRoutes} from '../../src/routes/page.routes';

test.describe('Страница товара', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(pagesRoutes.product.chair);
     });

        test('Добавление товара увеличивает счетчик мини-корзины', async ({app}) => {
            await app.product.addProductToCart();
            await expect(app.miniCart.cartCountBadge).toHaveCount(1);
        });

        test('Добавленный товар отображается в мини-корзине', async ({app}) => {
            await app.product.addProductToCart();
            await app.product.closeCartPopupIfVisible();
            await app.miniCart.openPanel();
            await expect(app.miniCart.product.first()).toBeVisible();
            await expect(app.miniCart.productName.first()).toBeVisible();
        });

        test('Переход в корзину из мини-корзины', async ({app, page}) => {
            await app.product.addProductToCart();
            await app.product.closeCartPopupIfVisible();
            await app.miniCart.openPanel();
            await app.miniCart.checkoutButton.first().click();
            await expect(page).toHaveURL(/\/cart\//);
        });

});
