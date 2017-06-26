var express = require('express');
    mongoose = require('mongoose'),
    City = require('../models/cityModel'),
    Category = require('../models/gymCategoryModel');

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
router.put('/:id', function (req, res, next) {
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

// == GET cities and POPULATE categories
router.get( "/loadCats/:id", function( req, res, next ) {
  City.find(req.params.id === 'all' || req.params.id === '' ? {} : {_id: req.params.id})
      .populate('categories')
      .exec( function (err, resp) {
        var data = [];
        if (err) throw 'Error';
        resp.forEach( city => { data.push( city ) });
        res.json(data);
      });
});

// == GET Array of all CATEGORIES by CITY
router.get( "/loadCatsArray/:id", function( req, res, next ) {
  City.find(req.params.id === 'all' || req.params.id === '' ? {} : {_id: req.params.id})
      .populate('categories')
      .exec( function (err, resp) {
        var data = [];
        if (err) throw 'Error';
        resp.forEach( city => { city.categories.forEach( cat => { data.push(cat) })})
        res.json(data);
      });
});

module.exports = router;
