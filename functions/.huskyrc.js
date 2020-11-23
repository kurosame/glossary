module.exports = {
  hooks: {
    'pre-commit': ['tsc -p ./ --noEmit', 'lint-staged'].join(' && ')
  }
}
