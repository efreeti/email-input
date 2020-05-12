const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin/typings');
const { optimize } = require('webpack');
const { join } = require('path');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'inline-source-map',
	entry: {
		'index': join(__dirname, 'src/index.ts'),
	},
	output: {
		path: join(__dirname, 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts?$/,
				use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}',
			},
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new CheckerPlugin(),
		...(process.env.NODE_ENV !== 'production' ? [] : [
			new optimize.AggressiveMergingPlugin(),
			new optimize.OccurrenceOrderPlugin()
		]),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		}),
	],
	resolve: {
		extensions: ['.ts', '.js'],
	},
};
