var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
  _id: String,
  name: String,
  bgImageURL: String,
  categories: Array
});

module.exports = mongoose.model('City', CitySchema, 'city');
