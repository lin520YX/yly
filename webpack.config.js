let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CopyWebackPlugin = require('copy-webpack-plugin');
let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
            })
        ]
    },

    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
              test:require.resolve('jquery'),
              use:[
                  {
                      loader: 'expose-loader',
                      options: 'jQuery'
                  }, {
                      loader: 'expose-loader',
                      options: '$'
                  }
              ]
            },
            {
                test: /\.css/,
                use: [
                    'style-loader'
                    , 'css-loader']
            },
            {
                test: /\.js/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.(png|git|jpg)/,
                use:['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunk: ['main']
        }),
        new CopyWebackPlugin([
            {
                from: './src/images',
                to: path.resolve(__dirname, 'dist/images')
            },
            {
                from: './src/sound',
                to: path.resolve(__dirname, 'dist/sound')
            }]),
    ]
}