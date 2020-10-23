const {environment} = require('@rails/webpacker')
const webpack = require('webpack')

const lessLoader = {
    test: /\.less$/,
    use: [{
        loader: "style-loader"
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

environment.plugins.append(
    'Provide',
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
    })
)

environment.loaders.prepend('style', lessLoader)

module.exports = environment
