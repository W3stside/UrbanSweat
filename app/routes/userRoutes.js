var express = require('express');
var mongoose = require('mongoose');
var User = require('../models/usersModel');

//Password encryption/hashing
var bcrypt = require('bcrypt');
const saltRounds = 10;

var router = express.Router();

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
        //create User here
        User.create({
            username,
            first_name,
            last_name,
            email,
            password: hash
        }, function(err, resp) {
            if (err) return next(err);

            res.json(resp);
        })
        res.render('index');
    });
})

module.exports = router;
