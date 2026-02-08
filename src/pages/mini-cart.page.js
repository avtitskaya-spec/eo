export class MiniCartPage {
    constructor(page) {
        this.page = page;
        this.cartCountBadge = page.locator('.cart-link__count');
        this.container = page.locator('.cart-products-panel__container');
        this.product = page.locator('.cart-products-panel__product');
        this.cartLink = page.getByTestId('cart-link');
 }

    // --- бизнес-методы ---
    async hoverLink() {
        await this.cartLink.hover();
    }
}