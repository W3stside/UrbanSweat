var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    min: [1, 'Must be more than 1 char'],
  },
  bgImageURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    min: [3, 'Must be more than 3 char'],
    max: [150, 'Cannot be more than 150 char'],
  },
});

module.exports = mongoose.model('Category', CategorySchema );
