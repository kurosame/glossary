module.exports = {
  env: { browser: true, serviceworker: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json'
  },
  settings: { react: { version: 'detect' }, 'import/resolver': 'webpack' },
  rules: {
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never', tsx: 'never' }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.spec.ts', '**/*.spec.tsx'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'unknown'],
        pathGroups: [
          {
            pattern: '{@mui,@testing-library}/**',
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
    'react/prop-types': 'off', // This is not needed as it is checked by TypeScript
    'react/require-default-props': 'off'
  },
  overrides: [
    {
      files: ['functions/**/*.ts'],
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './functions/tsconfig.json'
      },
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
