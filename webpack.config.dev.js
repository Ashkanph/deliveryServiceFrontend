
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/');
var APP_DIR = path.resolve(__dirname, 'src/');

var config = {
    mode: 'development',
    entry: APP_DIR + '/index.js',
    output: {
        path: BUILD_DIR,
        filename: 'static/bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: BUILD_DIR,
        compress: true,
        port: 4000,
        historyApiFallback: true
    },
    module: {
		rules: [
			// Transform all ES6 files to plain old ES5.
			{
				test: /\.(js|jsx)$/,
				exclude: [/node_modules/, /dist/],
				loader: 'babel-loader',
                include: APP_DIR,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', "stage-0", 'react']
                }
			},
			{
				test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader',
                          'sass-loader?sourceMap'],
                exclude: [/node_modules/, /dist/],
                include: APP_DIR,
            },
		],
    }
};

module.exports = config;