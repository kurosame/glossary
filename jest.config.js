module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['<rootDir>/test/unit/specs/**/*.ts', '<rootDir>/test/unit/specs/**/*.tsx'],
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.tsx',
    '<rootDir>/src/containers/**/*.tsx',
    '<rootDir>/src/modules/**/*.ts',
    '<rootDir>/src/sagas/**/*.ts',
    '<rootDir>/src/utils/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    // FirebaseUI for React is not supported by Jest(jsdom)
    // https://github.com/firebase/firebaseui-web/issues/636
    '<rootDir>/src/containers/Login.tsx',
    // Messaging is not supported by Jest(jsdom)
    // https://github.com/tmobile/jest-jsdom-browser-compatibility/tree/master/testcases-src/tc4-notification-api-missing
    '<rootDir>/src/utils/messaging.ts'
  ],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  coverageReporters: ['html', 'text-summary'],
  verbose: true
}
