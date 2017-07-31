/// <binding ProjectOpened='config: production' />
"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var version = (new Date()).getTime();


loaders.push({
    test: /[\/\\]src[\/\\].*\.scss/,
    loaders: [
		'style',
        'css',
		'sass'
    ]
});

// local css modules
loaders.push({
    test: /[\/\\]src[\/\\].*\.css/,
    loaders: [
		'style?sourceMap',
        'css'
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
    entry: {
        web: './src/index.jsx'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[hash].bundle.js',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: { jQuery: path.resolve(__dirname, 'src/scripts/jquery.1.9.1.js')}
    },
    module: {
        loaders: loaders
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin("init.js"),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin({ multiStep: true }),
        new webpack.DefinePlugin({
		    'process.env': {
		        NODE_ENV: JSON.stringify('production')
		    }
        }),
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
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};
