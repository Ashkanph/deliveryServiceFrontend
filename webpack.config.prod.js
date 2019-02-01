
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist/static/');
var APP_DIR = path.resolve(__dirname, 'src/');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
    mode: 'production',
    entry: ["@babel/polyfill", APP_DIR + '/index.js'],
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
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
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
                ],
            },
		],
	},
    optimization: {
        minimize: true,
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              parse: {},
              compress: {},
              mangle: true, // Note `mangle.properties` is `false` by default.
              output: null,
              toplevel: false,
              nameCache: null,
              ie8: false,
              keep_fnames: false,
            },
          }),
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'style.css',
            chunkFilename: 'style.css',
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        // I don't need locale files of moment
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fa/)
    ],
};

module.exports = config;