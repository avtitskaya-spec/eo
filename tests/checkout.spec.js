import {expect} from "@playwright/test";
import { test } from '../src/helpers/fixtures/fixture';
import {pagesRoutes} from '../src/routes/page.routes';


test.describe('Добавление товара в корзину', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(pagesRoutes.product.chair);
     });

        test('Отображения добавленного товара в мини-корзине', async ({app}) => {
            await app.product.addProductToCart();
            await expect(app.miniCart.cartCountBadge).toHaveCount(1);
        });

        test('Открытие попапа "Все цвета"', async ({app}) => {
            await app.product.openModal();
            await expect(app.product.colorPopup).toBeVisible();
            await expect(app.product.colorPopupTitle).toHaveText('Все цвета');
        });

        test('Добавление в избранное: кнопка меняет состояние', async ({app}) => {
            await expect(app.product.headerIconFavorites).toBeVisible();
            await app.product.clickIconFavorite();
            await expect(app.product.headerIconFavoritesRemoveByAria).toBeVisible();
        });
});