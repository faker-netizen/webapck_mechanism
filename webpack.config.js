const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['./loaders/style-loader/index.js','css-loader']
            },
            {
                test: /\.js$/,
                use: ["./loaders/clean-log-loader.js"]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: "./loaders/banner-loader/index.js", options: {
                        author: 'lxl2'
                    }
                }],
            },
            {
                test: /\.js$/,
                loader: './loaders/primary-babel-loader/index.js',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                type: 'javascript/auto',
                loader: './loaders/file-loader/index.js',
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html')
    })],
    mode: 'development',
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 9000
    }
}