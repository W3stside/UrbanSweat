var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = new Schema({
  _id: String,
  name: {
    type: String,
    min: [1, 'Name must be more than 1 letter.'],
    required: true,
  },
  bgImageURL: {
    type: String,
    required: true,
    default: 'https://c1.staticflickr.com/1/76/169367424_f9fbb93902_b.jpg',
  },
  categories: [{type: Schema.ObjectId, ref: 'Category', required: true, min: [1, 'Must have >= 1 Category.'], }],
});

CitySchema.virtual('url').get(function () {
  return 'http://localhost:3007/models/cities/' + this._id;
});

module.exports = mongoose.model('City', CitySchema);
