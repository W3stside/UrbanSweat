var path = require('path')
var webpack = require('webpack')
console.log(path.join(__dirname, 'index.html'));

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: "bundle.js",
    publicPath: "/assets/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
    module: {
        rules: [
            // the 'transform-runtime' plugin tells babel to require the runtime
            // instead of inlining it.
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: /static/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'react'],
                        plugins: ['transform-runtime']
                    }
                }
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader", // Do not use "use" here
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {loader: 'url-loader?limit=8192'}
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader!css-loader!sass-loader'}
                ]
            }
        ]
    }
}
