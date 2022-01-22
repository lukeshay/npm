/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  coverageDirectory: '.jest-coverage',
  cacheDirectory: '.jest-cache',
  coverageReporters: ['lcov', 'text', 'html'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

module.exports = config;
