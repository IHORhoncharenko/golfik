const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'build'),
    },
    devServer: {
        static: './build',
        open: true,
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // minify: {
            //     collapseWhitespace: true
            // }
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets/favicon'), to: path.resolve(__dirname, 'build') },
                { from: path.resolve(__dirname, 'src/assets/img'), to: path.resolve(__dirname, 'build') },
                { from: path.resolve(__dirname, 'src/assets/blog'), to: path.resolve(__dirname, 'build') },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    stats: {
        children: true,
    },
    optimization: {
        minimize: true,
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
        },
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ]
    }
};