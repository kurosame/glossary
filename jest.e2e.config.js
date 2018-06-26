module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testMatch: ['<rootDir>/test/e2e/specs/**/*.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  preset: 'jest-puppeteer',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  verbose: true
}
