module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  comments: false
}
