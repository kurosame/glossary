const os = require('os')
const path = require('path')
const Copy = require('copy-webpack-plugin')
const ForkTsChecker = require('fork-ts-checker-webpack-plugin')
const HardSource = require('hard-source-webpack-plugin')
const Html = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = (_, argv) => ({
  entry: {
    bundle: path.join(__dirname, 'src', 'index.tsx')
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial'
    }
  },
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              // workers: require('os').cpus().length - 1
              workers: 1
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true
            }
          },
          'eslint-loader',
          'stylelint-custom-processor-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new Copy([
      {
        from: path.join(__dirname, 'assets'),
        to: path.join(__dirname, 'dist', 'assets'),
        ignore: '.gitkeep'
      }
    ]),
    new ForkTsChecker({ checkSyntacticErrors: true }),
    new HardSource(),
    new Html({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.join(__dirname, 'src', 'firebase', 'messaging-sw.js'),
      swDest: 'messaging-sw.js'
    })
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: { '@': path.join(__dirname, 'src') }
  },
  devtool: argv.mode === 'development' ? '#inline-source-map' : false,
  performance: {
    assetFilter: function(filename) {
      return !/^vendor-\w+\.js$/.test(filename)
    }
  }
})
