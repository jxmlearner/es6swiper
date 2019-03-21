const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve(__dirname,'../src/index.js'),
        mi: path.resolve(__dirname,'../src/mi.js'),
        festival: path.resolve(__dirname,'../src/festival.js'),     //端午
        news: path.resolve(__dirname,'../src/news.js'),             //腾讯新闻
        fresh: path.resolve(__dirname,'../src/fresh.js'),           //每日优鲜
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
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
                to: path.resolve(__dirname, '../dist/static') 
            }
        ])       
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'../src'),
            Utilities: path.resolve(__dirname, '../src/utilities/'),
            Templates: path.resolve(__dirname, '../src/templates/')
        }
    }
}