export class ComparisonBuilder {
  constructor() {
    this.body = {
      id: '264244',
    };
  }

  withId(id) {
    this.body.id = id;
    return this;
  }

  withoutId() {
    delete this.body.id;
    return this;
  }

  build() {
    return this.body;
  }
}