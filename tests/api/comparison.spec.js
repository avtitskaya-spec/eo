import { test, expect } from '../../src/helpers/fixtures/api.fixture';
import { ComparisonBuilder } from '../../src/builders';

test.describe('API Comparison', () => {

  test('POST Успешное добавление товара', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withRandomId()
      .build();
    const result = await comparisonApi.addProduct(body);
    expect(result.status).toBe(200);
    expect(result.body).toBeTruthy();
    expect(result.body.success).toBe(true);
    expect(result.body.data.compareId).toBeTruthy();
    expect(typeof result.body.data.compareId).toBe('string');
  });

  test('POST Невалидный id', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withId('invalid_id')
      .build();
    const result = await comparisonApi.addProduct(body);
    expect(result.status).not.toBe(500);
    if (result.body) {
      expect(result.body.success).toBe(false);
    }
  });

  test('POST Без id', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withoutId()
      .build();
    const result = await comparisonApi.addProduct(body);
    expect(result.status).not.toBe(200);
    if (result.body) {
      expect(result.body.success).toBe(false);
    }
  });

  test('Повторное добавление товара', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder().build();
    const firstResult = await comparisonApi.addProduct(body);
    expect(firstResult.status).toBe(200);
    const secondResult = await comparisonApi.addProduct(body);
    expect(secondResult.status).toBe(200);
    expect(secondResult.body).toBeTruthy();
    expect(secondResult.body.success).toBe(true);
  });

  test('GET Получение списка сравнения по compareId', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder()
      .withRandomId()
      .build();
    const addResult = await comparisonApi.addProduct(body);
    expect(addResult.status).toBe(200);
    expect(addResult.body).toBeTruthy();
    const compareId = addResult.body.data.compareId;
    expect(compareId).toBeTruthy();

    const getResult = await comparisonApi.getComparison(compareId);
    expect(getResult.status).toBe(200);
    expect(getResult.body).toBeTruthy();
    expect(getResult.body).toHaveProperty('data');
    expect(getResult.body).toHaveProperty('success');
  });

  test('POST Удаление товара из сравнения', async ({ comparisonApi }) => {
    const body = new ComparisonBuilder().build();
    const addResult = await comparisonApi.addProduct(body);
    expect(addResult.status).toBe(200);
    expect(addResult.body).toBeTruthy();

    const deleteBody = {
      id: body.id,
      compareId: addResult.body.data.compareId,
    };
    const deleteResult = await comparisonApi.deleteProduct(deleteBody);
    expect(deleteResult.status).not.toBe(500);
    if (deleteResult.body) {
      expect(deleteResult.body).toHaveProperty('success');
    }
  });

  test('GET Невалидный compareId не приводит к 500', async ({ comparisonApi }) => {
    const result = await comparisonApi.getComparison('invalid_compare_id');
    expect(result.status).not.toBe(500);
  });

});
