const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const { EntriesPlugin, HtmlExtPlugin } = require('falcon-webpack');
const { version, line } = require('./package.json') || {};
module.exports = {
  entry: './src/index.tsx',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle-[name]-[hash:5].js',
    chunkFilename: `bundle-[name]-[hash:5].js`
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory([
                    {
                      libraryName: 'antd',
                      libraryDirectory: 'lib'
                    },
                    {
                      libraryName: 'qm-ui',
                      libraryDirectory: 'lib',
                      camel2DashComponentName: false
                    },
                    {
                      libraryName: 'qm-ux',
                      libraryDirectory: 'lib',
                      camel2DashComponentName: false
                    },
                    {
                      libraryName: 'qm-bus',
                      libraryDirectory: 'lib',
                      camel2DashComponentName: false
                    }
                  ])
                ]
              }),
              compilerOptions: {
                module: 'es2015'
              }
            }
          }
        ]
      },
      {
        test: /\.(jsx?|es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      { test: /\.(png|gif)$/, loader: 'file-loader' }
    ]
  },
  externals: {
    QMDecorator: 'window.QMDecorator'
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src/web_modules'), 'node_modules'],
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      plume2: 'plume2/es5'
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle-[name]-[hash:5].css',
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __DEBUG__: true,
      __DEV__: true,
      'process.env.NODE_ENV': JSON.stringify('env')
    }),
    new HtmlExtPlugin({
      option: {
        env: '5' //.dev | 0,1,2,3,4,5 | null
      },
      context: __dirname,
      filename: ['./properties/config.json', './properties/bundles.json']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.ejs'
    })
  ],
  devServer: {
    port: 8080,
    disableHostCheck: true
  }
};
