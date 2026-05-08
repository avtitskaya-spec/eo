import { test, expect } from '../../src/helpers/fixtures/fixture';
import { pagesRoutes } from '../../src/routes/page.routes';
import { CheckoutUserBuilder } from '../../src/builders';

test.describe('Корзина: добавление товара и переход к оформлению', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(pagesRoutes.product.chair);
    });

    test('Пользователь может добавить товар в корзину и перейти к оформлению', async ({ app, page }) => {
        await app.product.addProductToCart();
        await expect(app.miniCart.cartCountBadge).toHaveCount(1);
        await app.product.closeCartPopupIfVisible();
        await app.miniCart.openPanel();
        await expect(app.miniCart.product.first()).toBeVisible();
        await expect(app.miniCart.productName.first()).toBeVisible();
        await app.miniCart.goToCheckout();
        await expect(page).toHaveURL(/\/cart\//);
    });

    test('Заполнение данных физ. лица в чекауте', async ({ app }) => {
        const user = new CheckoutUserBuilder().build();
        await app.product.addProductToCart();
        await app.product.closeCartPopupIfVisible();
        await app.miniCart.openPanel();
        await app.miniCart.goToCheckout();
        await app.checkoutP.waitForForm();
        await app.checkoutP.setCustomerType(true);
        await app.checkoutP.fillCustomerData(user);
        await expect(app.checkoutP.nameInput).toHaveValue(user.name);
        await expect.poll(async () => app.checkoutP.getPhoneDigits())
            .toContain(user.phone.replace(/\D/g, '').slice(-10));
        await expect(app.checkoutP.emailInput).toHaveValue(user.email);
    });

    test('Заполнение данных юр. лица в чекауте', async ({ app }) => {
        const user = new CheckoutUserBuilder().build();
        await app.product.addProductToCart();
        await app.product.closeCartPopupIfVisible();
        await app.miniCart.openPanel();
        await app.miniCart.goToCheckout();
        await app.checkoutP.waitForForm();
        await app.checkoutP.setCustomerType(false);
        await app.checkoutP.fillCustomerData(user);
        await expect(app.checkoutP.nameInput).toHaveValue(user.name);
        await expect.poll(async () => app.checkoutP.getPhoneDigits())
            .toContain(user.phone.replace(/\D/g, '').slice(-10));
        await expect(app.checkoutP.emailInput).toHaveValue(user.email);
    });

});
