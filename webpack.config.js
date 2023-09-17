/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    context: path.resolve(__dirname, './src'),
    mode: 'development',
    entry: './index',
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.ts'],
        alias: {
            '@normalize': path.resolve(__dirname, './node_modules/modern-normalize'),
            '@src': path.resolve(__dirname, './src'),
        },
    },
    devServer: {
        port: 4200,
        hot: 'only',
        static: {
            directory: path.join(__dirname, './'),
            serveIndex: true,
        },
    },
    devtool: isDev ? 'source-map' : false,
    optimization: {
        minimizer: ['...', new CssMinimizerWebpackPlugin()],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './assets/favicon.ico',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/_redirects'),
                    to: path.resolve(__dirname, './dist'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
        }),
        new EslintPlugin({
            extensions: 'ts',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(ttf|woff|woff2|png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
};
