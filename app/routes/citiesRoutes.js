var express = require('express');
var mongoose = require('mongoose');
var City = require('../models/citiesModel');

var router = express.Router();

//GET operation
router.get( '/', function( req, res, next ) {
  City.find( function ( err, city ) {
    if (err) return next(err);
    res.json(city);
  });
});

//POST operation (aka enter shit)
router.post('/', function(req, res, next) {
  City.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//SHOW cities ID operation
router.get('/:id', function (req,res,next) {
  City.findById(req.params.id, function (err, city) {
    if (err) return next(err);
    res.json(city);
  });
});

//UPDATE by ID
router.put(':id', function (req, res, next) {
  City.findByIdAndUpdate(req.params.id, req.body, function (err, city) {
    if (err) return next(err);
    res.json(city);
  });
});

//DELETE by ID
router.delete('/:id', function (req, res, next) {
  City.findByIdAndRemove(req.params.id, req.body, function (err, city) {
    if (err) return next(err);
    res.json(city);
  });
});

module.exports = router;
