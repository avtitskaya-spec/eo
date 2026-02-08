import { MainPage, ProductPage, CheckoutPage, MiniCartPage} from './index';
// import {Fixture} from '../helpers/fixtures';

export class App {
   
    constructor(page) {
        this.page = page;
        this.main = new MainPage(page);
        this.product = new ProductPage(page);
        this.checkoutP = new CheckoutPage(page);
        this.miniCart = new MiniCartPage(page);
    }
}