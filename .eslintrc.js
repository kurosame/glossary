module.exports = {
  extends: ['@kurosame/eslint-config-react'],
  env: { serviceworker: true },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['functions/test/**', 'stories/**', 'test/**'] }
    ]
  }
}
