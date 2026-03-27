export class ProductPage {
    constructor(page) {
        this.page = page;
        this.productTitle = page.getByTestId('product-detail-title');
        this.buyOneClickButton = page.getByTestId('product-detail-buy-one-click-button');
        this.addToCartButton = page.getByTestId('product-detail-add-to-cart-button');
        this.colorPopup = page.locator('.dropdown.product-colors');
        this.colorPopupTitle = page.locator('.product-colors__title');
        this.colorsAllButton = page.getByTestId('product-detail-colors-all-button');
        this.headerIconFavoritesRemoveByAria = page.locator('[data-test-id="product-detail-icons-favorites"] [data-test-id="favorites-button"][aria-label*="Убрать" i]');
        this.headerIconFavorites = page.getByTestId('product-detail-icons-favorites');
        this.cartPopup = page.locator('.modal__wrapper');
        this.cartPopupCloseButton = page.locator('button.close-button.modal__close[aria-label="Закрыть"]');

 }

    // --- бизнес-методы ---
   async clickOneClickButton() {
        await this.buyOneClickButton.click();
    }
    async addProductToCart() {
        await this.addToCartButton.click()
    }
     async openModal() {
        await this.colorsAllButton.click();
    }
     async clickIconFavorite() {
        await this.headerIconFavorites.click();
    }

    async getTitleText() {
        const title = await this.productTitle.first().innerText();
        return title.replace(/\s+/g, ' ').trim();
    }

    async closeCartPopupIfVisible() {
        if (await this.cartPopup.isVisible().catch(() => false)) {
            await this.cartPopupCloseButton.first().click();
            await this.cartPopup.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => null);
        }
    }
}
