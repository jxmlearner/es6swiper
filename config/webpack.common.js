const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve(__dirname,'../src/index.js'),
        mi: path.resolve(__dirname,'../src/mi.js'),
        festival: path.resolve(__dirname,'../src/festival.js'),     //端午
        news: path.resolve(__dirname,'../src/news.js'),             //腾讯新闻
    },
    output: {
        filename: '[name].[hash:8].bundle.js',
        path: path.resolve(__dirname,'../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include:[
                    path.resolve(__dirname,'../src'),
                    path.resolve(__dirname,'../node_modules/swiper'),
                    path.resolve(__dirname,'../node_modules/dom7')
                ],
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: false
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ 'file-loader' ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src', 'link:href'],
                        minimize: true,
                        root: path.resolve(__dirname, '../src/assets')                        
                    }
                }
            }
        ]
    },
    plugins: [ 
        new CleanWebpackPlugin(['dist'],{root: path.resolve(__dirname, '../')}),       
        new HtmlWebpackPlugin({
            title: '首页',
            template: 'index.html',
            chunks:['index']
        }),        
        new HtmlWebpackPlugin({
            title: '小米官网焦点图制作',
            template: 'mi.html',
            filename: 'mi.html',
            chunks:['mi']
        }),
        new HtmlWebpackPlugin({
            title: '端午节',
            template: 'festival.html',
            filename:'festival.html',
            chunks:['festival']
        }),         
        new HtmlWebpackPlugin({
            title: '腾讯新闻',
            template: 'news.html',
            filename:'news.html',
            chunks:['news']
        }),         
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'../src'),
            Utilities: path.resolve(__dirname, '../src/utilities/'),
            Templates: path.resolve(__dirname, '../src/templates/')
        }
    }
}