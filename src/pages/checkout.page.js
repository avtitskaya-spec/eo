
export class CheckoutPage {


    constructor(page) {
        this.page = page;
        this.title = page.getByTestId('cart-title'),
        this.nameInput = page.locator('[name="name"]');
        this.phoneInput = page.locator('.cart-customer-form__inputs input[name="phone"]');
        this.emailInput = page.locator('[name="email"]');
        this.acceptSwitch = page.locator('[name="accept"]');
        this.continueButton = page.locator('.cart-continue-button');
    }

    // --- бизнес-метод ---
    async fillCheckoutForm(checkoutData) {
        await test.step('Заполнить форму оформления заказа', async () => {
            await this.nameInput.fill(checkoutData.name);
            await this.phoneInput.fill(checkoutData.phone);
            if (checkoutData.email) {
                await this.emailInput.fill(checkoutData.email);
            }
            await this.acceptSwitch.first().click();
            await this.continueButton.click();
        });
    }
}