const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map', //cheap eval does NOT work in prod
  devServer: {
    historyApiFallback: true,
  },
  entry: "./index.js",
  output: {
    //WHERE TO OUTPUT FILES FROM WEBPACK - /static/
    path: path.resolve(__dirname, '/static'),
    filename: "bundle.js",
    //WHERE PUBLIC ASSETS ARE SERVED FROM -- RELATIVE TO "PATH" ABOVE ... E.G PUBLICPATH NOW = /static/assets/.....
    publicPath: "/assets/"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //MINIFY AND MAKE UGLY... LIKE ME >> T_T >> x_x
    new UglifyJSPlugin({
        minimize: true,
        compress: {
            warnings: false
        },
        sourceMap: true,
    }),
    //SET ENV
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify('production')
    })
  ],
    module: {
        rules: [
            // the 'transform-runtime' plugin tells babel to require the runtime
            // instead of inlining it.
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
                test: /\.jsx$/,
                loader: 'babel-loader', // Do not use "use" here
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {loader: 'url-loader?limit=8192'}
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader?sourceMap",
                    use: "css-loader?sourceMap",
                    publicPath: "/static"
                })
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
}
