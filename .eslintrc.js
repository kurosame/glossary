module.exports = {
  env: { browser: true, serviceworker: true },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' }, 'import/resolver': 'webpack' },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    // False positives in SFC?
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-prop-types.md#false-positives-sfc
    'react/no-unused-prop-types': 'off',
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
