// jest.config.js
module.exports = {
    testEnvironment: 'node',
    reporters: [
      'default',
      ['@allure-js/allure-jest', {
        resultsDir: 'allure-results'
      }]
    ]
  };