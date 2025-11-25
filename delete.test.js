const axios = require('axios');

describe('ReqRes API — DELETE /users/:id (with API Key)', () => {
  it('should delete user with ID 2 and return 204 No Content', async () => {
    try {
      const response = await axios.delete('https://reqres.in/api/users/2', {
        headers: {
          'x-api-key': 'reqres-free-v1' 
        }
      });

      // Ожидаем статус 204 — успешное удаление без тела ответа
      expect(response.status).toBe(204);
      // Тело ответа должно быть пустым
      expect(response.data).toBe('');
    } catch (error) {
      // Некоторые HTTP-клиенты могут не возвращать 204 как ошибку,
      // но axios обычно обрабатывает 2xx как успешные
      throw error;
    }
  });
});