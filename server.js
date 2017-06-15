var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config'),
    //Create new Express instance
    app = new (require('express'))(),
    port = 3007,
    //Express middleware
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    //Connect that Database bish
    mongoose = require('./app/models/connection'),
    //Config the compiler for Webpack
    compiler = webpack(config),
    //Cities route
    cities = require('./app/routes/citiesRoutes');

//Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

//db REST API routes
app.use('/models/cities', cities);

//Where to serve HTML site for React App
app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});
