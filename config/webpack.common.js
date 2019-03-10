const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve(__dirname,'../src/index.js'),
        mi: path.resolve(__dirname,'../src/mi.js')
    },
    output: {
        filename: '[name].[hash:8].bundle.js',
        path: path.resolve(__dirname,'../dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'eslint-loader',
                        options: {
                            fix: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    plugins: [ 
        new CleanWebpackPlugin(['dist'],{root: path.resolve(__dirname, '../')}),       
        new HtmlWebpackPlugin({
            title: '首页',
            template: 'index.html'
        }),        
        new HtmlWebpackPlugin({
            title: '小米官网焦点图制作',
            template: 'mi.html'
        })        
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname,'../src'),
            Utilities: path.resolve(__dirname, '../src/utilities/'),
            Templates: path.resolve(__dirname, '../src/templates/')
        }
    }
}