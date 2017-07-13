// nodejs 中的path模块
var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssExtractor = new ExtractTextPlugin(1,'styles/[name].[chunkhash].css');

var conf = require('./src/conf.json');

module.exports = {
    // 入口文件
    entry: {
        app: './src/app.js',
        main: './src/styles/main.css.js',
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
            'vue$': 'vue/dist/vue.js',
            'jquery': 'jquery'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        cssExtractor
    ],
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loaders: [
                    'vue'
                ]
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
                test: /\.(png|jpg|gif)$/,
                loader: 'url',
                query: {
                    limit: 0,
                    name: '[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(mp4|ogg|svg|mp3)$/,
                loader: 'file'
            },
            {
                test: /\.scss$/,
                loader: cssExtractor.extract('style', 'css?sourceMap!sass?sourceMap'),
                include: path.resolve(__dirname, 'src/styles')
            }, 
            {
                test: /\.css$/,
                loader: cssExtractor.extract('style', 'css'),
                include: path.resolve(__dirname, 'src/styles')
            },
            {
                test: /\.css$/,
                loaders: [
                    'file?name=styles/[name].[ext]',
                    'extract',
                    'css'
                ],
                exclude: path.resolve(__dirname, 'src/styles')
            }, 
            {
                test: /\.css\.map$/,
                loader: 'file?name=styles/[name].[ext]'
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file?name=fonts/[name].[ext]'
            }, 
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loaders: [
                    'url?mimetype=image/svg+xml',
                    'file?name=fonts/[name].[ext]'
                ]
            }
        ]
    }
}