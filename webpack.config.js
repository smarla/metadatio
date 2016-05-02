var webpack = require('webpack');

module.exports = {
    entry: [
        './index.js'
    ],
    module: {
        loaders: [{
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'react-hot!babel'
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
        // Only emit files when there are no errors
        new webpack.NoErrorsPlugin(),

        // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin()
    ]
};