// __tests__/api.test.js
const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com';
// Добавим константу для максимального времени отклика (в миллисекундах)
const MAX_RESPONSE_TIME_MS = 2000; // Например, 2 секунды

describe('JSONPlaceholder API Tests', () => {
  // ... (ваши существующие тесты) ...

  // --- НОВЫЕ ТЕСТЫ НА ПРОИЗВОДИТЕЛЬНОСТЬ ---

  test('Performance: Fetch single post should respond quickly', async () => {
    allure.epic('Performance Tests');
    allure.feature('Response Time');
    allure.story('Single Resource Fetch');
    allure.severity('normal');
    allure.description('Verifies that fetching a single post resource responds within acceptable time limits.');

    const startTime = Date.now();
    try {
      const response = await axios.get(`${BASE_URL}/posts/1`);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // --- Allure Attachment ---
      allure.attachment('Response Data', JSON.stringify(response.data, null, 2), 'application/json');

      // --- Assertions ---
      expect(response.status).toBe(200);
      // Проверяем время отклика
      expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME_MS);

      console.log(`✅ Fetched single post in ${responseTime} ms (Max: ${MAX_RESPONSE_TIME_MS} ms).`);
    } catch (error) {
      // Если запрос упал, логируем ошибку и всё равно проверяем время (хотя оно будет 0 или некорректным)
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.error(`❌ Error fetching single post after ${responseTime} ms:`, error.message);
      // Allure запишет ошибку и тест будет помечен как FAILED
      throw error; // Перебрасываем ошибку, чтобы тест упал
    }
  });

  test('Performance: Fetch multiple posts should respond within time limits', async () => {
    allure.epic('Performance Tests');
    allure.feature('Response Time');
    allure.story('Multiple Resource Fetch');
    allure.severity('normal');
    allure.description('Verifies that fetching a list of posts responds within acceptable time limits.');

    const startTime = Date.now();
    try {
      const response = await axios.get(`${BASE_URL}/posts`);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      // --- Allure Attachment ---
      allure.attachment('Response Data (first 10 items)', JSON.stringify(response.data.slice(0, 10), null, 2), 'application/json');

      // --- Assertions ---
      expect(response.status).toBe(200);
      expect(Array.isArray(response.data)).toBe(true);
      // Проверяем время отклика
      expect(responseTime).toBeLessThan(MAX_RESPONSE_TIME_MS);

      console.log(`✅ Fetched ${response.data.length} posts in ${responseTime} ms (Max: ${MAX_RESPONSE_TIME_MS} ms).`);
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.error(`❌ Error fetching multiple posts after ${responseTime} ms:`, error.message);
      throw error;
    }
  });

  test('Performance: Consecutive requests should be handled', async () => {
    allure.epic('Performance Tests');
    allure.feature('Stability');
    allure.story('Consecutive Requests');
    allure.severity('normal');
    allure.description('Verifies that the API can handle a small series of consecutive requests without failure.');

    const numberOfRequests = 5;
    const requestPromises = [];
    const responseTimes = [];

    // Создаем массив промисов для нескольких запросов
    for (let i = 1; i <= numberOfRequests; i++) {
      const startTime = Date.now();
      requestPromises.push(
        axios.get(`${BASE_URL}/posts/${i}`)
          .then(response => {
            const endTime = Date.now();
            const time = endTime - startTime;
            responseTimes.push(time);
            return { id: i, status: response.status, time };
          })
          .catch(error => {
            const endTime = Date.now();
            const time = endTime - startTime;
            responseTimes.push(time); // Записываем время, даже если запрос упал
            console.error(`Error on request ${i} after ${time} ms:`, error.message);
            throw error; // Перебрасываем ошибку для корректной обработки
          })
      );
    }

    try {
      // Ждем выполнения всех промисов
      const results = await Promise.all(requestPromises);

      // --- Allure Attachment ---
      allure.attachment('Response Times', JSON.stringify(responseTimes, null, 2), 'application/json');
      allure.attachment('Request Results', JSON.stringify(results, null, 2), 'application/json');

      // --- Assertions ---
      // Проверяем, что все запросы вернули 200 OK
      results.forEach((result, index) => {
        expect(result.status).toBe(200);
      });

      // Проверяем, что все времена отклика в пределах нормы
      responseTimes.forEach((time, index) => {
        expect(time).toBeLessThan(MAX_RESPONSE_TIME_MS);
      });

      const averageTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      console.log(`✅ Completed ${numberOfRequests} consecutive requests. Average time: ${averageTime.toFixed(2)} ms (Max per request: ${MAX_RESPONSE_TIME_MS} ms).`);
    } catch (error) {
      console.error('❌ Error during consecutive requests:', error.message);
      throw error; // Перебрасываем, чтобы тест упал
    }
  });

  // ... (остальные тесты, если есть) ...
});
