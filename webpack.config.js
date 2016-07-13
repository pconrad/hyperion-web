/* eslint no-console: 0 */

const path = require('path');
const webpack = require('webpack');
const excludedFolders = [/node_modules/];
let devtools = 'source-map';
let minimizeCss = 'minimize';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.WEBPACK_ENV;

const dependencies = Object.keys(require('./package.json').dependencies)
  .filter(x => x !== 'bootstrap'); // Don't include it, it is added to the 'vendor' chunk

console.log(`Merging dependencies ${dependencies} into 'vendor' chunk`);

const plugins = [
    new ExtractTextPlugin('[name].[hash].css', {
        allChunks: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'], // , 'manifest'
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
        appMountId: 'app',
        favicon: './src/assets/images/favicon.png',
        hash: true,
        inject: false,
        mobile: true,
        template: require('html-webpack-template'),
        title: 'Hyperion',
        unsupportedBrowser: true,
    }),
];

if (env === 'production') {
    console.log('This is a production build');
    // Set NODE_ENV to "production" so the React production lib is used. (No warnings in the dev console.)
    plugins.push(new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }));
    // If errors occur do not "emmit" the build to the build-folder.
    plugins.push(new webpack.NoErrorsPlugin());
    // Remove duplicate code.
    plugins.push(new webpack.optimize.DedupePlugin());
    // Minimize javascript
    plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true, compressor: { warnings: false } }));

    // Do not create .map source files
    devtools = '';
} else {
    console.log('This is a development build');
    plugins.push(new webpack.DefinePlugin({ 'process.env': {
        NODE_ENV: JSON.stringify('development'),
        API_HOST: JSON.stringify(process.env.API_HOST),
    } }));
    // Do not minimize CSS
    minimizeCss = '-minimize';
}

module.exports = {
    // Entry point for the application
    entry: {
        app: './src/entry.js',
        vendor: [...dependencies, 'bootstrap/dist/css/bootstrap.min.css'],
    },
    // Output the result
    output: {
        path: './build/',
        filename: '[name].[hash].js',
    },
    // Tell webpack where to find files
    resolve: {
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js', '.css', '.svg', '.html'],
        modulesDirectories: ['node_modules/bootstrap/dist/', 'node_modules'],
    },
    // Create maps so we can see the source for our js files
    devtool: devtools,
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: excludedFolders,
        }],
        // Define loaders
        loaders: [
            // CSS Loader
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader',
                  `css-loader?module&importLoaders=1&localIdentName=[local]&${minimizeCss}&sourceMap!postcss-loader`),
            },
            // JS / EcmaScript 6-7 loader.
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: excludedFolders,
                query: { presets: ['es2015', 'react'] },
            },
            // JPG / PNG loader
            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader?name=[path][name].[ext]&context=src&limit=1',
            },
            // TTF loader
            {
                test: /\.ttf$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream',
            },
            // EOT loader
            {
                test: /\.eot$/,
                loader: 'file',
            },
            // WOFF / WOFF2 Loader
            {
                test: /\.(woff|woff2)$/,
                loader: 'url?prefix=font/&limit=5000',
            },
            // HTML loader
            {
                test: /\.html$/,
                loader: 'url-loader?name=[path][name].[ext]&context=src&limit=1',
            },
            // SVG Loader
            {
                test: /\.svg$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml',
            },
        ],
    },
    // Used plugins
    plugins: plugins,
    // CSS loader config
    postcss: function (webpack) {
        return [
            require('postcss-import')({ addDependencyTo: webpack }),
            require('postcss-url')(),
            require('postcss-cssnext')(),
            require('postcss-browser-reporter')(),
            require('postcss-reporter')(),
        ];
    },
    // eslint config
    eslint: {
        configFile: './.eslintrc',
        emitError: false,
        emitWarning: true,
    },
};
