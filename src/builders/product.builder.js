class CheckoutUserBuilder {
  constructor() {
    this.data = {
      name: 'Test User',
      phone: '+79999999999',
      email: 'test@mail.ru'
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

  withEmail(email) {
    this.data.email = email;
    return this;
  }

  build() {
    return { ...this.data };
  }
}

module.exports = {
  CheckoutUserBuilder,
};