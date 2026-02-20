export class ComparisonApi {
  constructor(api) {
    this.api = api;
  }

  async addProduct(body) {
    return this.api.post('/comparison/add', body);
  }

  async getComparison(compareId) {
    return this.api.get(`/comparison/${compareId}`);
  }

  async deleteProduct(body) {
    return this.api.post('/comparison/delete', body);
  }
}