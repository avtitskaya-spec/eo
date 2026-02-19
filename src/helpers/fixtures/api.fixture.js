import { test as base } from '@playwright/test';
import { CheckApi } from '../../services/page.service';

export const test = base.extend({
  api: async ({ request }, use) => {
    const api = new CheckApi(request);
    await use(api);
  },
});

export const expect = test.expect;