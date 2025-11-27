

const axios = require('axios');

describe('ReqRes API — POST /users (with API Key)', () => {
  it('should create a new user and return 201 with id and createdAt', async () => {
    const newUser = {
      name: 'morpheus',
      job: 'leader'
    };

    const response = await axios.post('https://reqres.in/api/users', newUser, {
      headers: {
        'x-api-key': 'reqres-free-v1' 
      }
    });

    
    expect(response.status).toBe(201);

    
    expect(response.data).toHaveProperty('name', 'morpheus');
    expect(response.data).toHaveProperty('job', 'leader');
    expect(response.data).toHaveProperty('id');
    expect(response.data).toHaveProperty('createdAt');

    
    expect(typeof response.data.id).toBe('string');
    expect(typeof response.data.createdAt).toBe('string');

   
    const date = new Date(response.data.createdAt);
    expect(date.toString()).not.toBe('Invalid Date');
  });
});