
import { test } from '@playwright/test';

export class CheckoutPage {


    constructor(page) {
        this.page = page;
        this.title = page.getByTestId('cart-title'),
        this.nameInput = page.locator('[name="name"]');
        this.phoneInput = page.locator('.cart-customer-form__inputs input[name="phone"]');
        this.emailInput = page.locator('[name="email"]');
        this.acceptSwitch = page.locator('[name="accept"]');
        this.continueButton = page.locator('.cart-continue-button');
        this.checkoutButton = page.locator('.cart-checkout__button');
    }

    // --- бизнес-метод ---
    async fillCustomerData(checkoutData) {
        await test.step('Заполнить данные покупателя', async () => {
            await this.nameInput.fill(checkoutData.name);
            await this.phoneInput.fill(checkoutData.phone);
            if (checkoutData.email) {
                await this.emailInput.fill(checkoutData.email);
            }
            if (!(await this.acceptSwitch.first().isChecked())) {
                await this.acceptSwitch.first().check({ force: true });
            }
        });
    }

    async fillCheckoutForm(checkoutData) {
        await this.fillCustomerData(checkoutData);
    }

    async fillOneClickForm(checkoutData) {
        await this.fillCustomerData(checkoutData);
    }
}
