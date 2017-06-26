var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GymSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  website: String,
  headquarters: String,
  logo: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
    min: [1, 'Summary must be more than 1 character.'],
    max: [300, 'Summary cannot be more than 300 characters.'],
  },
});

GymSchema.virtual('Gym').get( function () {
  return '/' + this._id;
});

module.exports = mongoose.model('Gym', GymSchema);
