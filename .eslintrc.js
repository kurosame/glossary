module.exports = {
  env: { browser: true, serviceworker: true },
  extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true } },
  settings: { react: { version: 'detect' }, 'import/resolver': 'webpack' },
  rules: {
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'unknown'],
        pathGroups: [
          {
            pattern: '{@material-ui,@testing-library}/**',
            group: 'external',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' }
      }
    ],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off' // This is not needed as it is checked by TypeScript
  },
  overrides: [
    {
      files: ['functions/**/*.ts'],
      rules: {
        'import/prefer-default-export': 'off'
      }
    },
    {
      files: ['src/sw/fcm-sw.ts'],
      rules: {
        'no-restricted-globals': 'off',
        'no-underscore-dangle': ['error', { allow: ['__WB_MANIFEST'] }]
      }
    }
  ],
  ignorePatterns: ['webpack.config.js']
}
