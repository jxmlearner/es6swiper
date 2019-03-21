const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common,{
    mode: 'development',
    devtool: 'inline-sourcemap',
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,      //一切服务都启用gzip 压缩
        hot: true,//启用模块热替换特性，这个需要配合：webpack.HotModuleReplacementPlugin插件
        //host: '0.0.0.0', //指定一个host,默认是localhost,如果想开发的时候外部能访问,设置成0.0.0.0
        port: 8880,
        publicPath:'/',
        proxy: {
            "/api": {
                target: 'http://192.168.0.167:8080'
            }
        }
    },
    module: {
        rules:[
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    { 
                        loader: 'url-loader',
                        options: {
                            limit: 10240        //base64限制值10kb
                        }
                    }
                ]
            },
            { 
                test: /\.(css|styl)$/, 
                use: [
                    'style-loader',
                    { loader:'css-loader',options: {sourceMap: true} },
                    { loader: 'stylus-loader',options: {sourceMap: true} }
                ]
            }
        ]
    },
    plugins: [
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
        new HtmlWebpackPlugin({
            title: '每日优鲜',
            template: 'fresh.html',
            filename:'fresh.html',
            chunks:['fresh']
        })
    ]
})