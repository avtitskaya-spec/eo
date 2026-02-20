import { test as base } from '@playwright/test';
import { CheckApi, ComparisonApi } from '../../services';


export const test = base.extend({
  api: async ({ request, apiUrl }, use) => {
    const api = new CheckApi(request, apiUrl);
    await use(api);
  },

  comparisonApi: async ({ api }, use) => {
    const comparisonApi = new ComparisonApi(api);
    await use(comparisonApi);
  },
});

export const expect = test.expect;