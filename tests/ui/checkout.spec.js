import {expect} from "@playwright/test";
import { test } from '../../src/helpers/fixtures/fixture';
import {pagesRoutes} from '../../src/routes/page.routes';
import {CheckoutUserBuilder} from '../../src/builders/index';



test.describe('Страница товара', () => {
    test.beforeEach(async ({page}) => {
        await page.goto(pagesRoutes.product.chair);
     });

        test('Добавление товара в мини-корзину', async ({app}) => {
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
        test('Оформление заказа', async({app}) => {
        const checkoutData = new CheckoutUserBuilder().build();;
            await app.product.clickOneClickButton();
            await app.checkoutP.nameInput.waitFor({ state: 'visible' });
            await app.checkoutP.fillCheckoutForm(checkoutData);
            await expect(app.checkoutP.nameInput).toHaveValue(checkoutData.name);
            await expect(app.checkoutP.phoneInput).toHaveValue(checkoutData.phone);
        })
});
