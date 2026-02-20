import { test } from '@playwright/test';

export class CheckApi {
  constructor(request, apiUrl) {
    this.request = request;
    this.apiUrl = apiUrl;
  }

  async get(endpoint) {
    return test.step(`GET ${endpoint}`, async () => {
      return await this.request.get(`${this.apiUrl}${endpoint}`);
    });
  }

  async post(endpoint, body = {}) {
    return test.step(`POST ${endpoint}`, async () => {
      return await this.request.post(`${this.apiUrl}${endpoint}`, {
        data: body,
      });
    });
  }

  async delete(endpoint, body = {}) {
    return test.step(`DELETE ${endpoint}`, async () => {
      return await this.request.delete(`${this.apiUrl}${endpoint}`, {
        data: body,
      });
    });
  }

  async getHtml(endpoint) {
    return test.step(`GET HTML ${endpoint}`, async () => {
      const response = await this.request.get(`${this.apiUrl}${endpoint}`);
      const body = await response.text();

      return {
        response,
        status: response.status(),
        headers: response.headers(),
        body,
        url: response.url(),
      };
    });
  }
}