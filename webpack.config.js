const path = require('path')
const Copy = require('copy-webpack-plugin')
const ForkTsChecker = require('fork-ts-checker-webpack-plugin')
const HardSource = require('hard-source-webpack-plugin')
const Html = require('html-webpack-plugin')

module.exports = (env, argv) => ({
  entry: {
    bundle: path.join(__dirname, 'src', 'index.tsx')
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    open: true,
    port: 8000,
    proxy: {
      '/api/*': 'http://localhost:3000'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            transpileOnly: true
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new Copy([{ from: 'assets', to: 'assets' }]),
    new ForkTsChecker(),
    new HardSource(),
    new Html({
      template: path.join(__dirname, 'src', 'index.html')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { '@': path.join(__dirname, 'src') }
  },
  devtool: argv.mode === 'development' ? '#inline-source-map' : false
})
