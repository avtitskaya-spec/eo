const DEFAULT_COMPARISON_BODY = {
  id: '264244',
};

const randomProductId = (min = 200000, max = 299999) => {
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  return String(random);
};

export class ComparisonBuilder {
  constructor(defaults = DEFAULT_COMPARISON_BODY) {
    this.defaults = { ...DEFAULT_COMPARISON_BODY, ...defaults };
    this.reset();
  }

  reset() {
    this.body = { ...this.defaults };
    return this;
  }

  withDefaults(defaults = {}) {
    this.defaults = { ...this.defaults, ...defaults };
    return this.reset();
  }

  withId(id) {
    this.body.id = String(id);
    return this;
  }

  withRandomId(min = 200000, max = 299999) {
    this.body.id = randomProductId(min, max);
    return this;
  }

  withoutId() {
    delete this.body.id;
    return this;
  }

  build() {
    return { ...this.body };
  }
}
