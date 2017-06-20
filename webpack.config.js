var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "frontend"),
        filename: "app_bundled.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'}
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'index.html'
    })]
}