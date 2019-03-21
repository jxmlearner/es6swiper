const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");      // 把样式打包成文件只在生产环境下使用
const optimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common,{
    mode: 'production',
    devtool: 'sourcemap',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    { 
                        loader: 'url-loader',
                        options: {
                            limit: 10240        //base64限制值10kb
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(css|styl)$/, 
                use: [
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
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            title: '首页',
            template: 'index.html',
            chunks:['index','styles']
        }),        
        new HtmlWebpackPlugin({
            title: '小米官网焦点图制作',
            template: 'mi.html',
            filename: 'mi.html',
            chunks:['mi','styles']
        }),
        new HtmlWebpackPlugin({
            title: '端午节',
            template: 'festival.html',
            filename:'festival.html',
            chunks:['festival','styles','vendors']
        }),         
        new HtmlWebpackPlugin({
            title: '腾讯新闻',
            template: 'news.html',
            filename:'news.html',
            chunks:['news','styles','vendors']
        }),  
        new HtmlWebpackPlugin({
            title: '每日优鲜',
            template: 'fresh.html',
            filename:'fresh.html',
            chunks:['fresh','styles','vendors']
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendors",
                    chunks: "all", 
                    minChunks: 2,
                    test: /[\\/]node_modules[\\/]/,
                    priority: 0 
                },
                styles: {
                    name: 'styles',
                    test: /\.css$|\.styl$/,
                    chunks: 'all',
                    enforce: true,
                    minChunks: 2,
                    priority: 10
                }
            }
        },
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