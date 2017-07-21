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
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }
      },
      {
        test: /\.(png|jpg)$/,
        use: {
            loader: 'url-loader?limit=8192'
        }
      },
      {
        test: /\.css$/,
        use: {
            loader: 'style-loader!css-loader'    
        }
      }
    ]
  }
}
