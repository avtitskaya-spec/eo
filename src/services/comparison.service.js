export class ComparisonApi {
  constructor(api) {
    this.api = api;
  }

  async addProduct(body) {
    return this.api.post('/comparison/add', body);
  }

  async deleteProduct(body) {
    return this.api.post('/comparison/delete', body);
  }
}