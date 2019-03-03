const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");      // 把样式打包成文件只在生产环境下使用
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(common,{
    mode: 'production',
    devtool: 'sourcemap',
    module: {
        rules:[
            {test: /\.(css|styl)$/, use: [
                MiniCssExtractPlugin.loader,
                { loader:'css-loader',options: {sourceMap: true} },
                { loader:'postcss-loader',options: {
                    ident: 'postcss',
                    sourceMap: true,
                    plugins: loader => [
                        require('autoprefixer')({browsers:['>0.15% in CN']})
                    ]
                    } 
                },
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
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({     //压缩js
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new optimizeCss()      //压缩css
        ]
    }
})