var webpack = require('webpack');
var path = require('path');

module.exports = {
    watch: true,
    entry: {
        counter: 'examples/counter/js',
        todomvc: 'examples/todomvc/js'
    },
    output: {
        path: './examples/',
        filename: '[name]/all.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            examples: './examples'
        }
    }
};
