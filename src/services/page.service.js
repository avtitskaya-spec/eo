import { test } from '@playwright/test';

export class CheckApi {
  constructor(request) {
    this.request = request;
  }

  async get(url) {
    return test.step(`GET ${url}`, async () => {
      return this.request.get(url);
    });
  }

  async getHtml(url) {
    return test.step(`GET HTML ${url}`, async () => {
      const response = await this.request.get(url);
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