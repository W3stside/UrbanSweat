//SERVER Setup

    //Import User model for Passport + Mongo querying based on logins/regs
var User = require('./app/models/usersModel'),
    //AUTH Packages
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    MongoStore = require('connect-mongo')(session),
    bcrypt = require('bcrypt');

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + Plug in .ENV file for whatever that does. jk i actually know what it does
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

//Plug in .ENV file for whatever that does. jk i actually know what it does
require('dotenv').config()

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + CONNECT to MongoDB && cache mongo uri later....
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

var mongooseConnectionURI;
//Development?
if (process.env.NODE_ENV !== 'production') {
    //Connect local MongoDB
    console.log('Connecting to MongoDB....')
    var localMongooseConnection = require('./app/models/localConnection');
    //Cache URI for rest of session
    mongooseConnectionURI = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
}
//PRODUCTION
else if (process.env.NODE_ENV === 'production') {
    //Connect online MongoDB
    var prodMongooseConnection = require('./app/models/connection');
    //Cache URI for rest of session
    mongooseConnectionURI = process.env.MONGODB_URI;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + Configure the Strategy for use by Passport.
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.

if (process.env.NODE_ENV === 'final_production') {
    //Implement Facebook login strategy for Production
    passport.use(new FacebookStrategy({
        clientID: JSON.stringify(process.env.FACEBOOK_APP_ID),
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${__dirname}/auth/facebook/return`
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
} else {
    //LOGIN STRATEGY - For when users login
    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log(username);
            console.log(password);
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
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + Start App + bring in middleware and routes
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

var app = new (require('express'))(),
    port = process.env.PORT || 8080,
    express = require('express'),
    path = require('path'),
    //Express + express middleware
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    //EXPRESS ROUTES
    cities = require('./app/routes/cityRoutes'),
    gyms = require('./app/routes/gymRoutes'),
    gymInstance = require('./app/routes/gymInstanceRoutes'),
    categories = require('./app/routes/categoryRoutes'),
    users = require('./app/routes/userRoutes'),
    //helper FNS
    utils = require('./utils/utils'),
    //Mongoose
    mongoose = require('mongoose');

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + DEV OR PROD - MODE START POINT
// + Conditionally set app starting points....
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        //Which webpack config to use... should be dev as of now
        config = require('./webpack.dev.config.js'),
        //Config the compiler for Webpack
        compiler = webpack(config);
    //Express + Webpack Middleware
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
} else if (process.env.NODE_ENV === 'production') {
    //Set "/static/" in the file system as root for serving static files - e.g webpack bundles here so... you probably want to serve... from there... brochacho.
    //Can set initial argument as "Virtual path" e.g app.use('/potatoes', express.static(path.resolve(__dirname, 'static'))); --> http://localhost:8000/potatoes/picturesOfCatsForGrandma.jpeg
    app.use('/static', express.static(path.resolve(__dirname, 'static')));
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + Express Middleware
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//Express-Session start
app.use(session({secret: utils.makeId(), store: new MongoStore({ url: mongooseConnectionURI }), resave: true, saveUninitialized: true }))

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + Initialize Passport and restore authentication state, if any, from the Strategies and userRoutes
// + Passport Middleware Integration (LOGIN and SESSIONS)
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

app.use(passport.initialize());
app.use(passport.session());

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + ROUTES here
// + db REST API routes
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

app.use('/models/cities', cities);
app.use('/models/gyms', gyms);
app.use('/models/gymInstance', gymInstance);
app.use('/models/categories', categories);
//Login, Register routes here
app.use('/', users);

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + Where to serve HTML site for React App - HOME PAGE
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

app.get("/*", function(req, res) {
    //Check User in current session
    console.log(`Current USER = ${req.user}`);
    console.log(`USER AUTHED? ${req.isAuthenticated()}`);
    //serve main html file
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + Passport serialization and deserialization for persistent login sessions
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

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

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
// + tell app to LISTEN
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
