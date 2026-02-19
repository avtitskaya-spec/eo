
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

    // --- бизнес-методы ---

    async fillPhone(phone) {
        await this.phoneInput.fill(phone);
    }

    async fillName(name) {
        await this.nameInput.fill(name);
    }

    async acceptTerms() {
        await this.acceptSwitch.first().click();
    }

    async continue() {
        await this.continueButton.click();
    }
}