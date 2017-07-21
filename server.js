//SERVER Setup

//Set up .env
require('dotenv').config()

//Connect Mongo before running app
var mongooseConnectionURI;

if (process.env.NODE_ENV !== 'production') {

/////////////////////////////////////////////////////////////
////////////////  IF in DEV mode
/////////////////////////////////////////////////////////////

    //Connect local MongoDB
    var localMongooseConnection = require('./app/models/localConnection');
    //Cache URI for rest of session
    mongooseConnectionURI = `${process.env.DB_HOST}/${process.env.DB_NAME}`;
    //Start App
    var app = new(require('express'))(),
        port = process.env.PORT || 8080,
        //Bring in Webpack
        webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        //Which webpack config to use... should be dev as of now
        config = require('./webpack.dev.config'),
        //Config the compiler for Webpack
        compiler = webpack(config);

    //Express + Webpack Middleware
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler));
} else if (process.env.NODE_ENV === 'production') {

/////////////////////////////////////////////////////////////
////////////////  IF in PROD mode
/////////////////////////////////////////////////////////////

    //Connect local MongoDB
    var prodMongooseConnection = require('./app/models/connection');
    //Cache URI for rest of session
    mongooseConnectionURI = process.env.MONGODB_URI;
    //Start App
    var app = new(require('express'))(),
        port = process.env.PORT || 8080;
}

    //Express middleware
var logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

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
    LocalStrategy = require('passport-local').Strategy,
    MongoStore = require('connect-mongo')(session),
    bcrypt = require('bcrypt'),
    //helper FNS
    utils = require('./utils/utils'),
    //Mongoose
    mongoose = require('mongoose');

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
  store: new MongoStore({url: mongooseConnectionURI}),
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))

//Passport Middleware Integration (LOGIN and SESSIONS)
app.use(passport.initialize());
app.use(passport.session());

//db REST API routes
app.use('/models/cities', cities);
app.use('/models/gyms', gyms);
app.use('/models/gymInstance', gymInstance);
app.use('/models/categories', categories);
//Login, Register here
app.use('/', users);

//Where to serve HTML site for React App - HOME PAGE
app.get("/*", function(req, res) {
    //Check User in current session
    console.log(`Current USER = ${req.user}`);
    console.log(`USER AUTHED? ${req.isAuthenticated()}`);
    //serve main html file
    res.sendFile(__dirname + '/dist/index.html')
});

//LOGIN STRATEGY - For when users login
passport.use(new LocalStrategy(
    function(username, password, done) {
        //console.log(username);
        //console.log(password);
        User.findOne({username})
        //Get User
        .then(user => {
            //CHECK USERNAME: if User is not found aka does not exist aka they got their username wrong
            if(!user) {
                console.log(`No user with username ${username} found`)
                return done(null, false, {message: 'Incorrect username or password'})
            };
            console.log(`SUCCESS - User found with config: ${user}`);
            //Otherwise if found then:
            //CHECK PASSWORD: Compare passwords to check if good
            bcrypt.compare(password, user.password)
                .then(passwordCheck => {
                    //Validate Passwords
                    if(!passwordCheck) {
                        return done(null, false, {message: 'Incorrect username or password'})
                    } else if (passwordCheck) {
                        return done(null, {_id: user._id});
                    }
                })
                .catch(err => {
                    throw err;
                });
        })
        .catch( err => {
            throw err;
        })
    }
))

//Passport serialization and deserialization for persistent login sessions
passport.serializeUser(function(userID, done) {
    console.log('SERIALIZING USER');
    done(null, userID);
});

//Once serialized - use below for subsequent requests
passport.deserializeUser(function(userID, done) {
    console.log('DE-SERIALIZING USER');
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
