import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

let createdPostId: number;

const newPost = {
  title: 'My Test Post',
  body: 'This is the body of my test post for API automation assessment.',
  userId: 1
};

const updatedPost = {
  title: 'My Updated Test Post',
  body: 'This body has been updated to verify the PATCH operation works.'
};

test.describe('Posts API CRUD Operations', () => {
  test('CREATE - should create a new post', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();

    expect(responseBody.id).toBeDefined();
    expect(typeof responseBody.id).toBe('number');
    expect(responseBody.title).toBe(newPost.title);
    expect(responseBody.body).toBe(newPost.body);
    expect(responseBody.userId).toBe(newPost.userId);

    createdPostId = responseBody.id;
    console.log(`Created post with ID: ${createdPostId}`);
  });

  test('READ - should retrieve the created post', async ({ request }) => {
    const testId = 1;

    const response = await request.get(`${BASE_URL}/posts/${testId}`);
    
    expect(response.status()).toBe(200);


    const responseBody = await response.json();

    expect(responseBody.id).toBe(testId);
    expect(responseBody.title).toBeDefined();
    expect(responseBody.body).toBeDefined();
    expect(responseBody.userId).toBeDefined();

    expect(typeof responseBody.title).toBe('string');
    expect(typeof responseBody.body).toBe('string');
    expect(typeof responseBody.userId).toBe('number');

    console.log(`Retrieved post: ${responseBody.title}`);
  });

  test('UPDATE - should update the post using PATCH', async ({ request }) => {
    const testId = 1;

    const response = await request.patch(`${BASE_URL}/posts/${testId}`, {
      data: {
        title: updatedPost.title
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.title).toBe(updatedPost.title);
    expect(responseBody.id).toBe(testId);

    console.log(`Updated post title to: ${responseBody.title}`);
  });

  test('VERIFY UPDATE - should confirm the update was applied', async ({ request }) => {
    const testId = 1;

    const response = await request.get(`${BASE_URL}/posts/${testId}`);

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.id).toBe(testId);
    expect(responseBody.title).toBeDefined();
    expect(responseBody.body).toBeDefined();

    console.log(`Verified post ${testId} exists with title: ${responseBody.title}`);
  });

  test('DELETE - should delete the post', async ({ request }) => {
    const testId = 1;

    const response = await request.delete(`${BASE_URL}/posts/${testId}`);

    expect(response.status()).toBe(200);

    console.log(`Deleted post with ID: ${testId}`);
  });

  test('VERIFY DELETION - should confirm the post is deleted', async ({ request }) => {
    const deletedId = 999;

    const response = await request.get(`${BASE_URL}/posts/${deletedId}`);

    expect(response.status()).toBe(404);

    console.log(`Verified post ${deletedId} returns 404 (Not Found)`);
  });

});