import { test, expect } from '../../src/helpers/fixtures/api.fixture';
import { ComparisonBuilder } from '../../src/builders/comparison.builder';

test.describe('API Comparison', () => {

  test('POST Успешное добавление товара', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder().build();
    const response = await comparisonApi.addProduct(body);
    expect(response.status()).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data.compareId).toBeTruthy();
    expect(typeof json.data.compareId).toBe('string');
  });

  test('POST Невалидный id', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withId('invalid_id')
      .build();
    const response = await comparisonApi.addProduct(body);
    expect(response.status()).not.toBe(500);
    const json = await response.json();
    expect(json.success).toBe(false);
  });

  test('POST Без id', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withoutId()
      .build();
    const response = await comparisonApi.addProduct(body);
    expect(response.status()).not.toBe(200);
  });

  test('Повторное добавление товара', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder().build();
    const firstResponse = await comparisonApi.addProduct(body);
    expect(firstResponse.status()).toBe(200);
    const secondResponse = await comparisonApi.addProduct(body);
    expect(secondResponse.status()).toBe(200);
    const json = await secondResponse.json();
    expect(json.success).toBe(true);
  });

  test('Проверка структуры ответа', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder().build();
    const response = await comparisonApi.addProduct(body);
    const json = await response.json();
    expect(json).toHaveProperty('data');
    expect(json).toHaveProperty('success');
    expect(json).toHaveProperty('version');
    expect(json).toHaveProperty('meta');
    expect(json.meta).toHaveProperty('seo');
    expect(json.meta).toHaveProperty('content');
  });

});