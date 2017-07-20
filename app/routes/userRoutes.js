var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/usersModel');

//Password encryption/hashing
var bcrypt = require('bcrypt');
const saltRounds = 10;

//import passport session management
var passport = require('passport');

var router = express.Router();

//POST --> User LOGIN
/*router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), function (req, res) {
    //Send status to FrontEnd and let Router handle reDirect to save state
    res.status(200).send(req.user);
});*/

router.post('/login', function(req,res,next) {
    passport.authenticate('local', function (err, userID, info) {
        console.log(userID);
        if (err) return next(err);
        //Send reason for no user found or whatever happens thats NOT a server error
        if(!userID) return res.send(info);

        //SUCCESS: Send status to FrontEnd and let Router handle reDirect to save state
        req.login(userID, function (err) {
            if(err) return next(err);
            //if successful login
            res.status(200).send(userID);
        })
    })(req, res, next);
});

//POST --> User Registration
router.post('/register', function(req, res, next) {

    //cache req.body sections
    var username = req.body.username,
        first_name = req.body.first_name,
        last_name = req.body.last_name,
        email = req.body.email,
        password = req.body.password;
    //hash that shit
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) throw err;
        // Store hash in your password DB.
        // create User here
        User.create({username, first_name, last_name, email, password: hash})
            //send RESPONSE back to confirm
            .then(userInfo => {
                const userID = userInfo._id;
                //Pass passport login method current Users _id
                req.login(userID, function (err) {
                    //redirect to home/root
                    res.redirect('/');
                })
            })
            .catch(err => {
                return next(err);
            })
    });
})

module.exports = router;
