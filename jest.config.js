// jest.config.js

module.exports = {
  // testRunner: 'jest-circus/runner', // Обычно необязательно, если используется стандартное окружение или кастомное, которое его поддерживает
  testEnvironment: 'allure-jest/node', // <--- Правильно: строка, не массив
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[tj]s?(x)'],
  cache: false,
  verbose: true,
};