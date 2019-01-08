const path = require('path')
const fs = require('fs')
const postcssPresetEnv = require('postcss-preset-env')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

const root = fs.realpathSync(process.cwd())
const reslove = (dir) => path.resolve(root, dir)

module.exports = {
  target: 'node',
  entry: reslove('src/index.ts'),
  output: {
    path: reslove('lib'),
    filename: 'index.umd.js',
    library: 'react-custom-toast',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(jsx|tsx|ts|js)$/,
        use: ['babel-loader']
      },
      {
        test: /\.(styl)$/,
        include: reslove('src'),
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({
                  autoprefixer: { grid: true }
                })
              ]
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  externals: [nodeExternals()]
}
