var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config'),
    //Create new Express instance
    app = new(require('express'))(),
    port = 3007,
    //Express middleware
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    //Config the compiler for Webpack
    compiler = webpack(config),
    //EXPRESS ROUTES
    cities = require('./app/routes/cityRoutes'),
    gyms = require('./app/routes/gymRoutes'),
    gymInstance = require('./app/routes/gymInstanceRoutes'),
    categories = require('./app/routes/categoryRoutes'),
    users = require('./app/routes/userRoutes'),
    //MODELS
    User = require('./app/models/usersModel'),
    //AUTH Packages
    session = require('express-session'),
    passport = require('passport'),
    //helper FNS
    utils = require('./utils/utils');

//Set up .env
require('dotenv').config()

//Connect that Database bish
var mongooseConnect = require('./app/models/connection');

//Express Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//Express-Session start
app.use(session({
  secret: utils.makeId(),
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))

//Passport Integration (LOGIN and SESSIONS)
app.use(passport.initialize());
app.use(passport.session());

//Express + Webpack Middleware
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

//db REST API routes
app.use('/models/cities', cities);
app.use('/models/gyms', gyms);
app.use('/models/gymInstance', gymInstance);
app.use('/models/categories', categories);
app.use('/registration', users);

//Where to serve HTML site for React App
app.get("/*", function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

//Passport serialization and deserialization for persistent login sessions
passport.serializeUser(function(userID, done) {
    done(null, userID);
});

passport.deserializeUser(function(userID, done) {
    User.findById(userID, function(err, user) {
        done(err, userID);
    });
});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
