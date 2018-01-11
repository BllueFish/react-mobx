/**
 * Created by misslee on 2017/11/23.
 */
const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = {
    entry: [
        'react-hot-loader/patch',
        './client/src/index.js',
    ],
    output: {
        filename: 'js/[name].bundle.js',
        path: './client/dist'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot:true,
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin(),  // 执行热替换时打印模块名字
        new webpack.HotModuleReplacementPlugin(),  //热替换插件
        new UglifyJSPlugin(),  //删除未引用代码

        new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.bundle.js"), //这是之前单独打包出来的react、react-dom等文件
        new ExtractTextPlugin("css/index.css"), // 将所有sass/css文件打包成一个index.css文件
     /*   new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({ // 压缩打包后的代码
            compress: {
                warnings: false
            }
        })*/
    ],
   module: {
      rules:[
          {
              test: /\.jsx?$/,
              use: [{
                  loader:'babel-loader',
                  query: {
                      cacheDirectory: true,
                      plugins: [
                         /* 'transform-runtime',*/
                         /* 'add-module-exports',*/
                          'transform-decorators-legacy'
                      ],
                      presets: ['es2015', 'react',"stage-1"],
                  }
              }],
              exclude: /node_modules\/(?!(stardust))/,
          },
          {
              test: /\.css$/,
              use:['style-loader','css-loader','less-loader']
          },
          {
              test:/\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
              use:'file-loader'
          },
          {
              test: /\.json$/,
              loader: 'json-loader'
          },

      ]
    },

    resolve: {
        "extentions": ["", "js"]//当requrie的模块找不到时，添加这些后缀
    },
};