import {expect} from "@playwright/test";
import { test } from '../../src/helpers/fixtures/fixture';
import {pagesRoutes} from '../../src/routes/page.routes';
import {CheckoutUserBuilder} from '../../src/builders/index';

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

        test('Купить в 1 клик: открывается форма заказа и можно заполнить данные', async({app, page}) => {
        const checkoutData = new CheckoutUserBuilder().build();
            await app.product.clickOneClickButton();
            await expect(page).toHaveURL(/oneClickMode|\/cart\//);
            await app.checkoutP.nameInput.waitFor({ state: 'visible' });
            await app.checkoutP.fillCustomerData(checkoutData);
            await expect(app.checkoutP.nameInput).toHaveValue(checkoutData.name);
            await expect.poll(async () => {
                const phoneValue = await app.checkoutP.phoneInput.inputValue();
                return phoneValue.replace(/\D/g, '');
            }).toContain(checkoutData.phone.replace(/\D/g, '').slice(-10));
        })
});
