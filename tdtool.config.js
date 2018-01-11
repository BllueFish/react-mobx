const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const Config = require('tdtool').Config;

const clientConfig = new Config({
    entry: {
        [pkg.name]: './src/demo1/main'
    },
    sourceMap: true,
    devtool: "source-map",
    filename: '[name].[hash].js',
    extends: ['react', ['less', {
        extractCss: {
            filename: '[name].[hash].css',
            allChunks: true
        },
        happypack: true
    }]],
    template: true,
    devServer: true
});

clientConfig.add('output.path', path.join(process.cwd(), 'dist'));
clientConfig.add('output.chunkFilename', '[name].[chunkhash].chunk.js');

module.exports = clientConfig.resolve();
