var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// 引入基本配置
var config = require('./webpack.config');

/*
config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract("css")
    }
};
*/

config.plugins.push(
    new CleanWebpackPlugin(['webapp']),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    // 压缩代码
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        favicon: path.resolve(__dirname, 'src/images/favicon.ico'),
        template: path.resolve(__dirname, 'src/views/app.html'),
        inject: true,
        hash: true,
        cache: true,
        showErrors: true,
        minify:{    //压缩HTML文件
            removeComments:true,    //移除HTML中的注释
            collapseWhitespace:true    //删除空白符与换行符
        }
    })
);

// config.module.loaders.push(
//     {
//         test: /\.(jpe?g|png(\*)?|gif)$/,
//         loaders: [
//             'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
//             'image-webpack?bypassOnDebug=true&optimizationLevel=7&interlaced=false'
//         ]
//     }
// );

module.exports = config;