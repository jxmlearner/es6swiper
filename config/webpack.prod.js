const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");      // 把样式打包成文件只在生产环境下使用

module.exports = merge(common,{
    mode: 'production',
    devtool: 'sourcemap',
    module: {
        rules:[
            {test: /\.(css|styl)$/, use: [
                MiniCssExtractPlugin.loader,
                { loader:'css-loader',options: {sourceMap: true} },
                { loader: 'stylus-loader',options: {sourceMap: true} }
            ]}
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    ]
})