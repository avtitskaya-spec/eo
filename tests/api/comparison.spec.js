import { test, expect } from '../../src/helpers/fixtures/api.fixture';
import { ComparisonBuilder } from '../../src/builders';

const parseJsonSafe = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

test.describe('API Comparison', () => {

  test('POST Успешное добавление товара', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withRandomId()
      .build();
    const response = await comparisonApi.addProduct(body);
    expect(response.status()).toBe(200);
    const json = await parseJsonSafe(response);
    expect(json).toBeTruthy();
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
    const json = await parseJsonSafe(response);
    if (json) {
      expect(json.success).toBe(false);
    }
  });

  test('POST Без id', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withoutId()
      .build();
    const response = await comparisonApi.addProduct(body);
    expect(response.status()).not.toBe(200);
    const json = await parseJsonSafe(response);
    if (json) {
      expect(json.success).toBe(false);
    }
  });

  test('Повторное добавление товара', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder().build();
    const firstResponse = await comparisonApi.addProduct(body);
    expect(firstResponse.status()).toBe(200);
    const secondResponse = await comparisonApi.addProduct(body);
    expect(secondResponse.status()).toBe(200);
    const json = await parseJsonSafe(secondResponse);
    expect(json).toBeTruthy();
    expect(json.success).toBe(true);
  });

  test('GET Получение списка сравнения по compareId', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withRandomId()
      .build();
    const addResponse = await comparisonApi.addProduct(body);
    expect(addResponse.status()).toBe(200);
    const addJson = await parseJsonSafe(addResponse);
    expect(addJson).toBeTruthy();
    const compareId = addJson.data.compareId;
    expect(compareId).toBeTruthy();

    const getResponse = await comparisonApi.getComparison(compareId);
    expect(getResponse.status()).toBe(200);
    const getJson = await parseJsonSafe(getResponse);
    expect(getJson).toBeTruthy();
    expect(getJson).toHaveProperty('data');
    expect(getJson).toHaveProperty('success');
  });

  test('POST Удаление товара из сравнения', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder().build();
    const addResponse = await comparisonApi.addProduct(body);
    expect(addResponse.status()).toBe(200);
    const addJson = await parseJsonSafe(addResponse);
    expect(addJson).toBeTruthy();

    const deleteBody = {
      id: body.id,
      compareId: addJson.data.compareId,
    };
    const deleteResponse = await comparisonApi.deleteProduct(deleteBody);
    expect(deleteResponse.status()).not.toBe(500);
    const deleteJson = await parseJsonSafe(deleteResponse);
    if (deleteJson) {
      expect(deleteJson).toHaveProperty('success');
    }
  });

  test('GET Невалидный compareId не приводит к 500', async ({ comparisonApi }) => {
    const response = await comparisonApi.getComparison('invalid_compare_id');
    expect(response.status()).not.toBe(500);
  });

});
