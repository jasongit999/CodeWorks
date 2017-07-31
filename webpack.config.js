/// <binding ProjectOpened='config: production' />
"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var HOST = process.env.HOST || "localhost";
var PORT = process.env.PORT || "8888";
var version = (new Date()).getTime();

loaders.push({
    test: /[\/\\]src[\/\\].*\.scss/,
    loaders: [
		'style',
        'css',
		'sass'
		//'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    ]
});

// local css modules
loaders.push({
    test: /[\/\\]src[\/\\].*\.css/,
    loaders: [
		'style?sourceMap',
        'css'
		//'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
    ]
});

loaders.push({
    test: /\.(otf|woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader?limit=100000'
});

// local json modules
loaders.push({
    test: /\.json$/,
    loader: "json-loader"
});





module.exports = {
    entry: [
        './src/index.jsx' // Your appʼs entry point
    ],
    watch:true,
    devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[hash].bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            jQuery: path.resolve(__dirname, 'src/scripts/jquery.1.9.1.js')
        }
    },
    module: {
        loaders: loaders
    },
    devServer: {
        contentBase: "./public",
        // do not print bundle build stats
        noInfo: true,
        // embed the webpack-dev-server runtime into the bundle
        inline: true,
        // serve index.html in place of 404 responses to allow HTML5 history
        historyApiFallback: true,
        port: PORT,
        host: HOST,
        proxy: {
            "**" : "http://localhost:57772"
        }
    },
    plugins: [
		new HtmlWebpackPlugin({
		    title: 'Progress Bar',
		    template: './src/index.html',
		    ver: version
		}),
        new CopyWebpackPlugin([
             {
                 from: './src/styles/mystyle.css', to: './styles/mystyle' + version + '.css'
             }
        ], {
            ignore: [
                // Doesn't copy any files with a txt extension    
                '*.txt'
            ]
        })
    ]
};
