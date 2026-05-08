import { test } from '@playwright/test';

export class ComparisonApi {
  constructor(api) {
    this.api = api;
  }

  async parseResponse(response) {
    return {
      status: response.status(),
      body: await response.json().catch(() => null),
    };
  }

  async addProduct(body) {
    return test.step('API: добавить товар в сравнение', async () => {
      const response = await this.api.post('/comparison/add', body);
      return this.parseResponse(response);
    });
  }

  async getComparison(compareId) {
    return test.step('API: получить список сравнения', async () => {
      const response = await this.api.get(`/comparison/${compareId}`);
      return this.parseResponse(response);
    });
  }

  async deleteProduct(body) {
    return test.step('API: удалить товар из сравнения', async () => {
      const response = await this.api.post('/comparison/delete', body);
      return this.parseResponse(response);
    });
  }
}
