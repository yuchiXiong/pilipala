process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const extendConfig = {
    devtool: false
};

environment.config.merge(extendConfig);

module.exports = environment.toWebpackConfig()
