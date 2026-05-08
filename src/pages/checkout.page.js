
import { test } from '@playwright/test';

export class CheckoutPage {


    constructor(page) {
        this.page = page;
        this.title = page.getByTestId('cart-title'),
        this.customerTypeSwitch = page.locator('fieldset.cart-customer-individual input.switch__field[name="isIndividual"][role="switch"][type="checkbox"]');
        this.nameInput = page.locator('[name="name"]');
        this.phoneInput = page.locator('.cart-customer-form__inputs input[name="phone"]');
        this.emailInput = page.locator('[name="email"]');
        this.acceptSwitch = page.locator('[name="accept"]');
        this.continueButton = page.locator('.cart-continue-button');
        this.checkoutButton = page.locator('.cart-checkout__button');
    }

    // --- бизнес-метод ---
    async setCustomerType(isIndividual) {
        await test.step(`Выбрать тип покупателя: ${isIndividual ? 'физлицо' : 'юрлицо'}`, async () => {
            await this.customerTypeSwitch.first().waitFor({ state: 'visible', timeout: 10000 });
            const currentState = await this.customerTypeSwitch.first().isChecked().catch(() => false);
            if (currentState !== isIndividual) {
                await this.customerTypeSwitch.first().click();
            }
        });
    }

    async waitForForm() {
        await test.step('Дождаться формы оформления', async () => {
            await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });
        });
    }

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

    async getPhoneDigits() {
        const phone = await this.phoneInput.inputValue();
        return phone.replace(/\D/g, '');
    }
}
