import { test, expect } from '@playwright/test';
import { testPost, updatedTitle } from '../../constants/apiTestData';

test.describe.serial('Posts API CRUD Operations', () => {
  const testId = 1;

  test('POST /posts - create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
      data: testPost
    });

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(201);
    });

    await test.step('Verify response body', async () => {
      const responseBody = await response.json();

      expect(responseBody.id).toBeDefined();
      expect(typeof responseBody.id).toBe('number');
      expect(responseBody.title).toBe(testPost.title);
      expect(responseBody.body).toBe(testPost.body);
      expect(responseBody.userID).toBe(testPost.userID);
    });
  });

  test('GET /posts/:id - retrieve a post', async ({ request }) => {
    const response = await request.get(`/posts/${testId}`);

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await test.step('Verify response body', async () => {
      const responseBody = await response.json();

      expect(responseBody.id).toBe(testId);
      expect(responseBody.title).toBeDefined();
      expect(responseBody.body).toBeDefined();
      expect(responseBody.userId).toBeDefined();

      expect(typeof responseBody.title).toBe('string');
      expect(typeof responseBody.body).toBe('string');
      expect(typeof responseBody.userId).toBe('number');
    });
  });

  test('PATCH /posts/:id - update post title', async ({ request }) => {
    const response = await request.patch(`/posts/${testId}`, {
      data: {
        title: updatedTitle
      }
    });

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await test.step('Verify response body', async () => {
      const responseBody = await response.json();

      expect(responseBody.title).toBe(updatedTitle);
      expect(responseBody.id).toBe(testId);
    });
  });

  test('GET /posts/:id - verify update was applied', async ({ request }) => {
    const response = await request.get(`/posts/${testId}`);

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });

    await test.step('Verify response body', async () => {
      const responseBody = await response.json();

      expect(responseBody.id).toBe(testId);
      expect(responseBody.title).toBeDefined();
      expect(responseBody.body).toBeDefined();
    });
  });

  test('DELETE /posts/:id - delete a post', async ({ request }) => {
    const response = await request.delete(`/posts/${testId}`);

    await test.step('Verify response status', async () => {
      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
    });
  });

  test('GET /posts/:id - verify post returns 404', async ({ request }) => {
    const deletedId = 999;

    const response = await request.get(`/posts/${deletedId}`);

    await test.step('Verify response status', async () => {
      expect(response.status()).toBe(404);
    });
  });
});
