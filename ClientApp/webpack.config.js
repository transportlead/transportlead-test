const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const port = parseInt(process.env.PORT, 10) || 8080;

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                },
            },
        ],
    },
    devServer: {
        compress: true,
        hot: true,
        port,
        contentBase: path.join(__dirname, 'public'),
        onListening: function(server) {
            const port = server.listeningApp.address().port;
            console.log('Starting the development server...');
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: path.resolve(__dirname, 'dist', 'index.html')
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css"
        }),
    ],
};
