module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testMatch: ['<rootDir>/test/unit/specs/**/*.ts', '<rootDir>/test/unit/specs/**/*.tsx'],
  transform: { '^.+\\.(t|j)sx?$': '@swc/jest' },
  transformIgnorePatterns: ['/node_modules/(?!firebase|@firebase)'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/src/$1' },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.tsx',
    '<rootDir>/src/containers/**/*.tsx',
    '<rootDir>/src/modules/**/*.ts',
    '<rootDir>/src/sagas/**/*.ts'
  ],
  coveragePathIgnorePatterns: [
    // FirebaseUI for React is not supported by Jest(jsdom)
    // https://github.com/firebase/firebaseui-web/issues/636
    '<rootDir>/src/containers/Login.tsx',
    '<rootDir>/src/components/FirebaseAuth.tsx'
  ],
  coverageDirectory: '<rootDir>/test/unit/coverage',
  coverageReporters: ['html', 'text-summary'],
  verbose: true
}
