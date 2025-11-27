// __tests__/api.tests.js

const axios = require('axios');

describe('ReqRes API Tests (with API Key)', () => {
  it('should return list of users with status 200', async () => {
    const response = await axios.get('https://reqres.in/api/users', {
      headers: {
        'x-api-key': 'reqres-free-v1' // ← вот он! Твой ключ
      }
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('data');
    expect(Array.isArray(response.data.data)).toBe(true);
    expect(response.data.data.length).toBe(6); // как в знаниях
  });
});