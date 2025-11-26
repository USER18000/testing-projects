// __tests__/api.test.js
const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('JSONPlaceholder API Tests', () => {

  test('should fetch all posts successfully', async () => {
    // --- Allure Labels ---
    allure.epic('API Tests');
    allure.feature('Posts');
    allure.story('Get All Posts');
    allure.severity('normal');
    allure.description('Verifies that the /posts endpoint returns a list of posts with correct structure.');

    // --- Вызов API ---
    const response = await axios.get(`${BASE_URL}/posts`);

    // --- Allure Attachment ---
    allure.attachment('Response Data', JSON.stringify(response.data, null, 2), 'application/json');

    // --- Assertions ---
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);

    const firstPost = response.data[0];
    expect(firstPost).toHaveProperty('userId');
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');

    console.log(`✅ Fetched ${response.data.length} posts successfully.`);
  });

  test('should fetch a specific user by ID successfully', async () => {
    // --- Allure Labels ---
    allure.epic('API Tests');
    allure.feature('Users');
    allure.story('Get User By ID');
    allure.severity('normal');
    allure.description('Verifies that the /users/{id} endpoint returns details for a specific user.');

    const userId = 1;
    const response = await axios.get(`${BASE_URL}/users/${userId}`);

    // --- Allure Attachment ---
    allure.attachment('User Response Data', JSON.stringify(response.data, null, 2), 'application/json');

    // --- Assertions ---
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', userId);
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('email');
    expect(response.data).toHaveProperty('address');
    expect(response.data).toHaveProperty('phone');
    expect(response.data).toHaveProperty('website');
    expect(response.data).toHaveProperty('company');

    console.log(`✅ Fetched user with ID ${userId} successfully.`);
  });

  test('should create a new post successfully', async () => {
    // --- Allure Labels ---
    allure.epic('API Tests');
    allure.feature('Posts');
    allure.story('Create New Post');
    allure.severity('normal');
    allure.description('Verifies that the /posts endpoint accepts a new post and returns it with an assigned ID.');

    const newPost = {
      title: 'Test Post Title',
      body: 'This is the body of the test post.',
      userId: 1
    };

    // --- Вызов API ---
    const response = await axios.post(`${BASE_URL}/posts`, newPost);

    // --- Allure Attachments ---
    allure.attachment('Request Payload', JSON.stringify(newPost, null, 2), 'application/json');
    allure.attachment('Response Data', JSON.stringify(response.data, null, 2), 'application/json');

    // --- Assertions ---
    expect(response.status).toBe(201); // 201 Created
    expect(response.data).toHaveProperty('id'); // Новый ID должен быть назначен
    expect(response.data).toHaveProperty('title', newPost.title);
    expect(response.data).toHaveProperty('body', newPost.body);
    expect(response.data).toHaveProperty('userId', newPost.userId);

    console.log(`✅ Created new post with ID ${response.data.id} successfully.`);
  });

  // Тест, который должен упасть (для демонстрации отчета Allure)
  test('should fail to fetch a non-existent post', async () => {
    // --- Allure Labels ---
    allure.epic('API Tests');
    allure.feature('Posts');
    allure.story('Get Non-existent Post');
    allure.severity('minor'); // Не критично, если API не возвращает 404
    allure.description('Verifies the API behavior when requesting a post that does not exist.');

    const invalidId = 999999; // Скорее всего, не существует

    const response = await axios.get(`${BASE_URL}/posts/${invalidId}`);

    // --- Allure Attachment ---
    allure.attachment('Response Data for Invalid ID', JSON.stringify(response.data, null, 2), 'application/json');

    // Этот expect intentionally fails для демонстрации
    expect(response.status).toBe(404); // JSONPlaceholder возвращает 200 и пустой объект, а не 404!

    console.log(`❌ Expected 404 for post ID ${invalidId}, but got ${response.status}.`);
  });
});