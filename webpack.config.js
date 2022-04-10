const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const createHtmlPagesBlogWithWebpack = (fileName) => {
    return new HtmlWebpackPlugin({
        filename: `${fileName.toLowerCase()}.html`,
        template: `./src/blog/${fileName.toLowerCase()}.html`,
    });
}

const createHTMLPagesBlogArr = (pagesArray) => {
    res = [];
    for (let i = 0; i < pagesArray.length; i++) {
        res.push(createHtmlPagesBlogWithWebpack(pagesArray[i]));
    }
    return res;
}

const htmlPagesBlog = createHTMLPagesBlogArr([
    'blog',
    'day-1',
    'day-2',
    'day-3',
    'day-4',
    'day-5',
    'day-6',
    'day-7',
    'day-8',
    'day-9',
    'day-10',
    'day-11',
    'day-12',
    'day-13'
]);

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js',
        blog: './src/blog/script-blog.js'
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
            filename: 'index.html',
            template: './src/index.html',
            // minify: {
            //     collapseWhitespace: true
            // }
        }),
        ...htmlPagesBlog,
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets/favicon'), to: path.resolve(__dirname, 'build') },
                { from: path.resolve(__dirname, 'src/assets/img'), to: path.resolve(__dirname, 'build') },
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