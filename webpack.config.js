// nodejs 中的path模块
var path = require('path');
var webpack = require('webpack');
var stylishReporter = require('jshint-loader-reporter')('stylish');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var conf = require('./js/conf.json');

module.exports = {
    // 入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的index.js文件
    entry: {
        app: './js/app.js',
        //main: './resource/styles/main.css.js',
        commons: conf.commons
    },
    // 输出配置
    output: {
        // 输出路径是 myProject/webapp
        path: path.resolve(__dirname, 'webapp'),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    resolve: {
        extensions: ['', '.js', '.css', '.scss','.vue'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['webapp']),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'views/app.html'),
            inject: true,
            hash: false,
            cache: true,
            showErrors: true,
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
        })
    ],
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loaders: [
                    'html'
                ]
            },
            // 加载图片
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash:7]'
                }
            }
        ]
    },
    jshint: {
        emitErrors: true,
        failOnHint: true,
        reporter:stylishReporter
    }
}