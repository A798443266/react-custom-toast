const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const postcssPresetEnv = require('postcss-preset-env')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = fs.realpathSync(process.cwd())
const reslove = (dir) => path.resolve(root, dir)

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'
  return {
    entry: reslove('example/index.js'),
    output: {
      path: reslove('docs'),
      publicPath: isDev ? '/' : './',
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        styles: reslove('example/styles')
      }
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|ts|js)$/,
          use: ['babel-loader']
        },
        {
          test: /\.(styl|css)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
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
        },
        {
          test: /\.(svg|png|ttf|woff|eot)$/,
          use: 'url-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: reslove('public/index.html')
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
