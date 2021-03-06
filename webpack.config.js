const {CheckerPlugin} = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {optimize} = require('webpack');
const {join} = require('path');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'inline-source-map',
	entry: {
		'index': join(__dirname, 'src/index.ts'),
		'default-sample': join(__dirname, 'samples/default/index.ts'),
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
		new HtmlWebpackPlugin({
			filename: "default-sample.html",
			template: 'samples/default/index.ejs',
			chunks: ['default-sample']
		}),
	],
	resolve: {
		plugins: [new TsconfigPathsPlugin()],
		extensions: ['.ts', '.js'],
	},
};
