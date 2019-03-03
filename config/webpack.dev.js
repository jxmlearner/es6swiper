const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common,{
    mode: 'development',
    devtool: 'inline-sourcemap',
    module: {
        rules:[
            {test: /\.(css|styl)$/, use: [
                'style-loader',
                { loader:'css-loader',options: {sourceMap: true} },
                { loader: 'stylus-loader',options: {sourceMap: true} }
            ]}
        ]
    }
})