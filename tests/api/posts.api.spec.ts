import { test, expect } from '@playwright/test';
import { testPost, patchData, defaultPost, testId } from '../../constants/apiTestData';

let createdPostId: number;

test.describe.serial('Posts API CRUD Operations', () => {

  test('Step 1 - Create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
      data: testPost
    });

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(201);
    });

    await test.step('Verify response body', async () => {
      const responseBody = await response.json();

      expect(responseBody).toHaveProperty('id');
      expect(typeof responseBody.id).toBe('number');
      expect(responseBody.title).toBe(testPost.title);
      expect(responseBody.body).toBe(testPost.body);
      expect(responseBody.userId).toBe(testPost.userId);

      createdPostId = responseBody.id;
    });
  });

  test('Step 2 - Verify created post does not exist', async ({ request }) => {
    const response = await request.get(`/posts/${createdPostId}`);

    await test.step('Verify response status', async () => {
      expect(response.status()).toBe(404);
    });
  });

  test('Step 3 - Retrieve existing post', async ({ request }) => {
    const response = await request.get(`/posts/${testId}`);

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await test.step('Verify response body matches default data', async () => {
      const responseBody = await response.json();

      expect(responseBody.id).toBe(defaultPost.id);
      expect(responseBody.userId).toBe(defaultPost.userId);
      expect(responseBody.title).toBe(defaultPost.title);
      expect(responseBody.body).toBe(defaultPost.body);
    });
  });

  test('Step 4 - Update post', async ({ request }) => {
    const response = await request.patch(`/posts/${testId}`, {
      data: patchData
    });

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await test.step('Verify response body returns updated data', async () => {
      const responseBody = await response.json();

      expect(responseBody).toHaveProperty('id');
      expect(responseBody.id).toBe(testId);
      expect(responseBody.title).toBe(patchData.title);
      expect(responseBody.body).toBe(patchData.body);
    });
  });

  test('Step 5 - Verify update was not persisted', async ({ request }) => {
    const response = await request.get(`/posts/${testId}`);

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await test.step('Verify original data remains unchanged', async () => {
      const responseBody = await response.json();

      expect(responseBody.id).toBe(defaultPost.id);
      expect(responseBody.title).toBe(defaultPost.title);
      expect(responseBody.title).not.toBe(patchData.title);
    });
  });

  test('Step 6 - Delete a post', async ({ request }) => {
    const response = await request.delete(`/posts/${testId}`);

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });

  test('Step 7 - Verify delete did not persist', async ({ request }) => {
    const response = await request.get(`/posts/${testId}`);

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await test.step('Verify data still exists with default values', async () => {
      const responseBody = await response.json();

      expect(responseBody.id).toBe(defaultPost.id);
      expect(responseBody.userId).toBe(defaultPost.userId);
      expect(responseBody.title).toBe(defaultPost.title);
      expect(responseBody.body).toBe(defaultPost.body);
    });
  });
});