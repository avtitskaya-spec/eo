export class MainPage {

    constructor(page) {
        this.page = page;
        this.mainBanner = page.locator('[alt="Sale"]').describe('Главный баннер');
        this.bannerTitle = page.locator('text=Экспресс Офис').first().describe('Заголовок баннера');
        this.mainBannerButton  = page.locator('.fullscreen-banner__button').describe('Кнопка на баннере');
        this.sliderNext = page.locator('button[aria-label="Следующий слайд"]').describe('Следующий слайд');
        this.sliderPrev = page.locator('button[aria-label="Предыдущий слайд"]').describe('Предыдущий слайд');
        this.leadersBlock = page.locator('.index-page__best-products').describe('Блок "Лидеры продаж"');
        this.leadersItem = page.locator('.index-page__best-products [data-test-id="product-card"]').describe('Карточка товара в "Лидерах продаж"');
        this.leadersShowMore = page.locator('.index-page__best-products button:has-text("показать еще")').describe('Кнопка "Показать еще" в "Лидерах продаж"');
        this.discountBlock = page.locator('.index-page__sale-products').describe('Блок "Товары со скидкой"');
        this.discountItem = page.locator('.index-page__sale-products [data-test-id="product-card"]').describe('Карточка товара в "Товарах со скидкой"');
        this.discountShowMore = page.locator('.index-page__sale-products button:has-text("показать еще")').describe('Кнопка "Показать еще" в "Товарах со скидкой"');
        this.brandBlock = page.locator('.index-page__brands').describe('Блок "Бренды"');
        this.brandItems = page.locator('a[aria-label^="Бренд"]').describe('Ссылка на бренд');
        this.footer = page.locator('footer').describe('Футер страницы');
    }

    // --- бизнес-методы ---
    async  clickButtonBanner() {
        await this.mainBannerButton.first().click();
    }
    async clickSliderNext() {
        await this.sliderNext.click();
    }
    async clickSliderPrev() {
        await this.sliderPrev.click();
    }
    async clickShouMoreLeaders() {
        await this.leadersShowMore.click();
    }

    async getLeadersCount(){
        return this.leadersItem.count();
    }
    async clickLeadersShowMore() {
        await this.leadersShowMore.click();
    }
    async getDiscountItemsCount(){
        return this.discountItem.count();
    }
    async clickDiscountShowMore() {
        await this.discountShowMore.click();
    }
}