class CheckoutUserBuilder {
  constructor() {
    this.data = {
      name: 'Test User',
      phone: '+79999999999',
    };
  }

  withName(name) {
    this.data.name = name;
    return this;
  }

  withPhone(phone) {
    this.data.phone = phone;
    return this;
  }

  build() {
    return { ...this.data };
  }
}

module.exports = {
  CheckoutUserBuilder,
};