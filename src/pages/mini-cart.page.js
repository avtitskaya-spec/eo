export class MiniCartPage {
    constructor(page) {
        this.page = page;
        this.cartCountBadge = page.locator('.cart-link__count');
        this.container = page.locator('.cart-products-panel__container');
        this.product = page.locator('.cart-products-panel__product');
        this.productName = page.locator('.cart-products-panel__product-name');
        this.checkoutButton = page.locator('.cart-products-panel__buttons a.button--fill');
        this.oneClickButton = page.locator('.cart-products-panel__buttons a.button--outline');
        this.cartLink = page.getByTestId('cart-link');
 }

    // --- бизнес-методы ---
    async hoverLink() {
        await this.cartLink.hover();
    }

    async openPanel() {
        await this.hoverLink();
        await this.container.waitFor({ state: 'visible', timeout: 7000 });
    }

    async getFirstProductName() {
        const firstProductName = await this.productName.first().innerText();
        return firstProductName.replace(/\s+/g, ' ').trim();
    }
}
