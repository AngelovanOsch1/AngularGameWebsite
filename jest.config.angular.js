module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    testPathIgnorePatterns: ['\\/node_modules\\/', '<rootDir>/src/.*\\.firestore\\.spec\\.ts$'],
  };
  