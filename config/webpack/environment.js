const {environment} = require('@rails/webpacker')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require('webpack')

const lessLoader = {
    test: /\.less$/,
    use: [{
        loader: MiniCssExtractPlugin.loader,
    }, {
        loader: "css-loader"
    }, {
        loader: "less-loader",
        options: {
            lessOptions: {
                javascriptEnabled: true
            }
        }
    }]
}

// environment.plugins.append(
//     'Provide',
//     new webpack.ProvidePlugin({
//         $: 'jquery',
//         jQuery: 'jquery',
//         'window.jQuery': 'jquery',
//         Popper: ['popper.js', 'default']
//     })
// )

environment.loaders.prepend('less', lessLoader)

module.exports = environment;
