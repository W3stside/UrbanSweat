var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
    },
    entry: [
        'webpack-hot-middleware/client',
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/assets/"
    },
    //watch: true,
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          PRODUCTION: JSON.stringify(false)
        })
    ],
    module: {
        rules: [
            /*{
                test: /\.js$/,
                enforce: "pre",
                use: [{
                    loader: 'jshint-loader',
                    options: {
                        //set ESVersion
                        esversion: 6,
                		// any jshint option http://www.jshint.com/docs/options/
                		camelcase: true,
                		// jshint errors are displayed by default as warnings
                		// set emitErrors to true to display them as errors
                		emitErrors: false,
                		// jshint to not interrupt the compilation
                		// if you want any file with jshint errors to fail
                		// set failOnHint to true
                		failOnHint: false,
                	}
                }],
                exclude: /node_modules/,
                // more options in the optional jshint object
            },*/
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: __dirname,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'react']
                        //plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: ['url-loader?limit=8192']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                use: ['style-loader, css-loader, sass-loader']
            }
        ]
    }
}
