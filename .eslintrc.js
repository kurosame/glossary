module.exports = {
  env: { browser: true, serviceworker: true },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' }, 'import/resolver': 'webpack' },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    // Rule conflict
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error']
  },
  overrides: [
    {
      files: ['functions/**/*.ts'],
      rules: {
        'import/prefer-default-export': 'off'
      }
    }
  ]
}
