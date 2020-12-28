process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const extendConfig = {
    devtool: false
};

const outputConfig = {
    output: {
        publicPath: 'https://assets.bubuyu.top/'
    }
}

environment.config.merge(extendConfig);
environment.config.merge(outputConfig);

module.exports = environment.toWebpackConfig()
