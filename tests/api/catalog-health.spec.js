import { expect, test } from '../../src/helpers/fixtures/api.fixture';
import { pagesRoutes } from '../../src/routes/page.routes';
import { api } from '../../src/helpers/fixtures/api.fixture';


const url = pagesRoutes.catalog.chairs;

test.describe('HTTP | Catalog page healthcheck', () => {

  test('Страница отвечает 200', async ({ api }) => {
    const response = await api.get(url);
    expect(
      response.status(),
      `GET ${url} вернул ${response.status()}`
    ).toBe(200);
  });

  test('Content-Type — text/html', async ({ api }) => {
    const response = await api.get(url);
    expect(
      response.headers()['content-type'],
      'Некорректный content-type'
    ).toContain('text/html');
  });

  test('HTML не пустой', async ({ api }) => {
    const response = await api.get(url);
    const body = await response.text();
    expect(
      body.length,
      'Ответ пришёл пустым'
    ).toBeGreaterThan(500);
  });

  test('В ответе есть <title>', async ({ api }) => {
    const response = await api.get(url);
    const body = await response.text();
    expect(
      body,
      'Отсутствует тег <title>'
    ).toContain('<title>');
  });

  test('Canonical URL присутствует', async ({ api }) => {
    const response = await api.get(url);
    const body = await response.text();
    expect(
      body,
      'Отсутствует canonical'
    ).toContain('rel="canonical"');
  });

});