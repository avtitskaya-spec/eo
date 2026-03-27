const DEFAULT_CHECKOUT_USER = {
  name: 'Test User',
  phone: '+79999999999',
  email: 'test@mail.ru',
};

export class CheckoutUserBuilder {
  constructor() {
    this.data = { ...DEFAULT_CHECKOUT_USER };
  }

  build() {
    return { ...this.data };
  }
}
