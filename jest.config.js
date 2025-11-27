// jest.config.js

module.exports = {
  // testRunner: 'jest-circus/runner',
  testEnvironment: 'allure-jest/node', 
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(spec|test).[tj]s?(x)'],
  cache: false,
  verbose: true,
};
