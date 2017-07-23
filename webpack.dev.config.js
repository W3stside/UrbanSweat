var path = require('path')
var webpack = require('webpack')

module.exports = {
    //SOURCE MAP for dev only - not usable in prod. Points errors to correct place in file structure from dev tools in chrome for examplay
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
    },
    entry: [
        //'webpack/hot/dev-server',
        //USE webpacks hot middleware as a server entry point for hot-loading modules (no need to refresh entire page just chunks... FAST and COOOOL!)
        'webpack-hot-middleware/client',
        //Obvious file entry point
        `./index.js`
    ],
    output: {
        //RELATIVE output path of where you want webpack bundles to go e.g "/" + config.output.publicPath (below) = http://localhost:8000/assets/
        path: '/',
        //NAME of outputted webpack BUNDLE ... get it?
        filename: 'bundle.js',
        //where bundle will be served... corresponds to script tag in html...
        publicPath: "http://localhost:3007/assets/"
    },
    //watch: true,
    plugins: [
        //Enables HMR
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        //Define global vars during compile for logging etc
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
