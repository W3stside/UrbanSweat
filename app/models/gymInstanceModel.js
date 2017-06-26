var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GymInstanceSchema = new Schema({
  gym: {
    type: Schema.ObjectId,
    ref: 'Gym',
    required: true,
    min: 1,
    max: [1, 'There can only be 1 root Gym per Instance. Please check again.'],
  },
  address: {
    type: String,
    required: true,
    min: [1, 'Must be more than 1 character.'],
  },
  bgImageURL: {
    type: String,
    required: true,
  },
  categories: [ { type: Schema.ObjectId, ref: 'Category', required: true, min: 1, } ],
  cities: [ { type: String, ref: 'City', required: true, min: 1, }, ],
  contact: {
    email: String,
    phone: String,
  },
  description: {
    type: String,
    required: true,
    min: [1, 'Description must be more than 1 character.'],
    max: [1000, 'Description cannot be more than 1000 characters.'],
  },
  gallery: [ {type: String, required: true, min: [1, 'Must have at least 1 photo of interior.'], max: [15, 'No more than 15 photos allowed.'], }],
  pricing: {
    daily: {
      type: Number
    },
    monthly: {
      type: Number,
    },
    yearly: {
      type: Number,
    },
    customPlans: {
      type: Boolean,
      default: false,
    },
    commitment: {
      type: Boolean,
      required: true,
    },
  }
});

//GymInstanceSchema.virtual('GymInstance').get( function () {
//  return '/models/gymInstance/' + this._id;
//});

module.exports = mongoose.model('GymInstance', GymInstanceSchema);
