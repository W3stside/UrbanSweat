var express = require('express');
var mongoose = require('mongoose');
var Category = require('../models/gymCategoryModel');
var City = require('../models/cityModel')

var router = express.Router();

//GET operation
router.get( '/', function( req, res, next ) {
  Category.find( function ( err, resp ) {
    if (err) return next(err);
    res.json(resp);
  });
});

//POST operation (aka enter shit)
router.post('/', function(req, res, next) {
  Category.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//SHOW gyms ID operation
router.get('/:id', function (req,res,next) {
  Category.findById(req.params.id, function (err, gym) {
    if (err) return next(err);
    res.json(gym);
  });
});

//UPDATE by ID
router.put('/:id', function (req, res, next) {
  Category.findByIdAndUpdate(req.params.id, req.body, function (err, gym) {
    if (err) return next(err);
    res.json(gym);
  });
});

//DELETE by ID
router.delete('/:id', function (req, res, next) {
  Category.findByIdAndRemove(req.params.id, req.body, function (err, gym) {
    if (err) return next(err);
    res.json(gym);
  });
});

router.get('/findByCategory/:category', function (req,res,next) {
  Category.where( {category: req.params.category} )
     .find( function (err, gymInst) {
        if (err) return next(err);
        res.json(gymInst);
      });
});

// == GET cities and POPULATE categories
router.get( "/fetchCategories/:id", function( req, res, next ) {
  Category.find(req.params.id === 'all' || req.params.id === '' ? {} : {_id: req.params.id})
      .populate('gym')
      .exec( function (err, resp) {
        var data = [];
        if (err) throw 'Error';
        //resp.forEach( gymInst => { data.push( gymInst.gym.map( cat => cat.name ))})
        res.json(resp);
      });
});

router.get("/fetchCategoriesByCity/:id", function ( req, res, next) {
    City.find(req.params.id === 'all' || req.params.id === '' ? {} : {cities: req.params.id})
           .populate('categories')
           .exec( function (err, resp) {
             if (err) return next(err);
             //resp.forEach(city => {console.log(city.categories)})
             res.json(resp);
           });
});

module.exports = router;
