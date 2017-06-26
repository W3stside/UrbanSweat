var express = require('express');
var mongoose = require('mongoose');
var Gym = require('../models/gymModel');

var router = express.Router();

//GET operation
router.get( '/', function( req, res, next ) {
  Gym.find( function ( err, gym ) {
    if (err) return next(err);
    res.json(gym);
  });
});

//POST operation (aka enter shit)
router.post('/', function(req, res, next) {
  Gym.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//SHOW gyms ID operation
router.get('/:id', function (req,res,next) {
  Gym.findById(req.params.id, function (err, gym) {
    if (err) return next(err);
    res.json(gym);
  });
});

//UPDATE by ID
router.put('/:id', function (req, res, next) {
  Gym.findByIdAndUpdate(req.params.id, req.body, function (err, gym) {
    if (err) return next(err);
    res.json(gym);
  });
});

//DELETE by ID
router.delete('/:id', function (req, res, next) {
  Gym.findByIdAndRemove(req.params.id, req.body, function (err, gym) {
    if (err) return next(err);
    res.json(gym);
  });
});

module.exports = router;
