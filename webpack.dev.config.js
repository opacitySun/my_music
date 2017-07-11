var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// 引入基本配置
var config = require('./webpack.config');

config.output.publicPath = '/';

config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
        template: path.resolve(__dirname, 'src/views/app.html'),
        inject: true,
        hash: true,
        cache: false,
        showErrors: true,
        minify:{    //压缩HTML文件
            removeComments:false,    //移除HTML中的注释
            collapseWhitespace:false    //删除空白符与换行符
        }
    })
);

config.module.loaders.push(
    {
        test: /\.(jpe?g|png(\*)?|gif)$/,
        loaders: [
            'file?name=images/[name].[ext]',
            'url?limit=0'
        ]
    }
);

// 动态向入口配置中注入 webpack-hot-middleware/client
var devClient = './dev/dev-client';
Object.keys(config.entry).forEach(function (name, i) {
    var extras = [devClient]
    config.entry[name] = extras.concat(config.entry[name])
});

//创建静态文件定位map
config.devtool="source-map";

module.exports = config;