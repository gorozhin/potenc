var path = require('path');

module.exports = {
    entry: {
        index: ['@babel/polyfill', './public/javascripts/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        publicPath : '/dist/',
        filename: '[name].entry.js'
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
            }
            ]
    }
};