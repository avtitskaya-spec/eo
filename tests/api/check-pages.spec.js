import { test, expect } from '@playwright/test';
import { CheckApi } from '../../src/services';
import { pagesRoutes } from '../../src/routes/page.routes';

const url = pagesRoutes.catalog.chairs;


test.describe('API healthcheck', () => {
  let response;
  let body;
  let status;

  test.beforeAll(async ({ request }) => {
    const api = new CheckApi(request);
    response = await api.get(url);
    body = await response.text();
    status = await response.status();
  });

  test('Страница отвечает 200', async () => {
    expect(status, `GET ${url} вернул ${status}`).toBe(200);
  });

  test('Content-Type — text/html', async () => {
    expect(response.headers()['content-type'], 'Некорректный content-type').toContain('text/html');
  });

  test('HTML не пустой', async () => {
    expect(body.length, 'Ответ пришёл пустым').toBeGreaterThan(500);
  });

  test('В ответе есть <title>', async () => {
    expect(body, 'Отсутствует тег <title>').toContain('<title>');
  });

  test('Canonical URL присутствует', async () => {
    expect(body, 'Отсутствует canonical').toContain('rel="canonical"');
  });
});