#! /usr/bin/env node

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Gym = require('./app/models/gymModel')
var GymInstance = require('./app/models/gymInstanceModel')
var Category = require('./app/models/gymCategoryModel')
var City = require('./app/models/cityModel')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var gyms = [
  {
    "_id" : ObjectId("594862f8461860a98a75410f"),
    "name" : "Max-Out Fitness",
    "website" : "http://fakeGym.com",
    "headquarters" : "1234 Hq Way, Amsterdam",
    "logo" : "https://s-media-cache-ak0.pinimg.com/736x/1a/42/de/1a42de6b58d700347c3571cbb5118082.jpg",
    "summary" : "MAX-OUT FITNESS is Europe's premier gym for everything FITNESS. We have over 500 locations filled with freeweights, foldable benches, ellipticals, Smith machines, and more!"
  },

  /* 2 */
  {
      "_id" : ObjectId("59486767461860a98a754285"),
      "name" : "Crakked Skull",
      "website" : "http://crakked-skull.com",
      "headquarters" : "4321 Sjkol Way, Norway",
      "logo" : "http://www.publicdomainpictures.net/pictures/140000/velka/skull-and-crossbones-1443450010JTF.jpg",
      "summary" : "Crakked Skull is a premier boxing club for anyone. Whether you're a complete newbie or you're a full fledged pro looking for a place to train, we offer our gym and services for all levels."
  },

  /* 3 */
  {
      "_id" : ObjectId("594b044a461860a98a758ef6"),
      "name" : "Mitte Fit",
      "website" : "http://mitte-fit.com",
      "headquarters" : "1111 Marienstrasse, Berlin, Germany",
      "logo" : "https://cdn.pixabay.com/photo/2016/12/14/02/51/gym-1905523_1280.png",
      "summary" : "Mitte Fit is located in the heart of Berlin, Mitte and is the biggest weight lifting gym in Germany. Come join us!"
  },

  /* 4 */
  {
      "_id" : ObjectId("594b04ba461860a98a758f1c"),
      "name" : "Gracie Jiu Jitsu",
      "website" : "http://graciebjj.com",
      "headquarters" : "8909 Rue de la Resistance, Bordeaux, France",
      "logo" : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/BJJ_BlackBelt.svg/2000px-BJJ_BlackBelt.svg.png",
      "summary" : "Come check out Gracie Jiu Jitsu for top training centers in Europe."
  },

  /* 5 */
  {
      "_id" : ObjectId("594b0563461860a98a758f56"),
      "name" : "KO Box",
      "website" : "http://KOBOX.com",
      "headquarters" : "2214 Skjollette, Skjol, Finland",
      "logo" : "https://cdn.pixabay.com/photo/2016/03/31/18/25/boxer-1294352_1280.png",
      "summary" : "KO Box offers training and top quality facilities for beginners or experts. Come in and see for yourself! KO!"
  },
]
var gymInstances = []
var categories = []
var cities = []

function categoryCreate(name, bgImageURL, description = false, cb) {
  categoryDetails = { name, bgImageURL, description }

  var category = new Category(categoryDetails);

  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}


function cityCreate(_id, name, bgImageURL, categories, cb) {
  cityDetails = { _id, name, bgImageURL, categories }

  if (!_id) throw 'ERROR: No _id specified';

  var city = new City(cityDetails);

  city.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New City: ' + city);
    cities.push(city)
    cb(null, city);
  });
}


function gymCreate(name, website = false, headquarters = false, logo, summary, cb) {
  gymDetails = {
    name,
    website,
    headquarters,
    logo,
    summary,
  }

  var gym = new Gym(gymDetails);
  gym.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Gym: ' + gym);
    gyms.push(gym)
    cb(null, gym)
  }  );
}


function gymInstanceCreate(gym, address, bgImageURL, categories, cities, contact = {phone: false, email: false}, description, gallery, pricing = {daily: 0, monthly: 0, yearly: 0, customPlans: false, commitment: false}, cb) {
  gymInstanceDetails = {
    gym,
    address,
    bgImageURL,
    categories,
    cities,
    contact,
    description,
    gallery,
    pricing
  }

  var GymInstances = new GymInstance(gymInstanceDetails);
  GymInstances.save(function (err) {
    if (err) {
      console.log('ERROR CREATING GymInstance: ' + GymInstances);
      cb(err, null)
      return
    }
    console.log('New GymInstance: ' + GymInstances);
    gymInstances.push(GymInstances)
    cb(null, gym)
  }  );
}


function createCategories(cb) {
    async.parallel([
        function(callback) {
          categoryCreate('Weightlifting', 'http://ww1.prweb.com/prfiles/2013/02/21/10454818/208%20FR%203.png','Combination of using muscle targeting machines and free weights to increase mass.', callback);
        },
        function(callback) {
          categoryCreate('Yoga', 'https://upload.wikimedia.org/wikipedia/commons/0/07/Carrie_Yoga_shoot_002_%288328572519%29.jpg','A Hindu spiritual and ascetic discipline, a part of which, including breath control, simple meditation, and the adoption of specific bodily postures, is widely practiced for health and relaxation.', callback);
        },
        function(callback) {
          categoryCreate('Cardio', 'https://upload.wikimedia.org/wikipedia/commons/3/33/Gym_Cardio_Area_Overlooking_Greenery.JPG','Treadmills, stairmasters, indoor tracks - anything related to increasing pulmonary strength.', callback);
        },
        function(callback) {
          categoryCreate('Dance', 'http://sweat.burnthis.com/wp-content/uploads/2013/07/yftpbvTk7tXYJbdqoMT9gFkiEPPiauPzULRhaXHBzgM-960x525-1374767927.jpeg','Rythmic movement as fitness.', callback);
        },
        function(callback) {
          categoryCreate('Crossfit', 'http://www.garage-gyms.com/wp-content/uploads/2013/12/crossfit-babe1.jpg','Combination of free weight excercises designed by Olympic athletes.', callback);
        },
        ],
        // optional callback
        cb);
}


function createGyms(cb) {
    async.parallel([
        function(callback) {
          gymCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [cities[0],], callback);
        },
        function(callback) {
          gymCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [cities[0],], callback);
        },
        function(callback) {
          gymCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [cities[0],], callback);
        },
        function(callback) {
          gymCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [cities[1],], callback);
        },
        function(callback) {
          gymCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [cities[1],], callback);
        },
        function(callback) {
          gymCreate('Test Book 1', 'Summary of test book 1', 'ISBN111111', authors[4], [cities[0],cities[1]], callback);
        },
        function(callback) {
          gymCreate('Test Book 2', 'Summary of test book 2', 'ISBN222222', authors[4], false, callback)
        }
        ],
        // optional callback
        cb);
}


function createGymInstances(cb) {
    async.parallel([
        function(callback) {
          gymInstanceCreate(gyms[1], 'google.com/pictures', [categories[0],categories[1],categories[2],categories[3]], [cities[0],cities[3]], '1234 Day Way', {email: 'david.sato64@gmail.com', phone: '123-123-1234'}, {daily: 20, monthly: 50, yearly: 500, customPlans: false, commitment: false}, 'THe best gym ever.', callback)
        }
    ], cb);
}


async.series([
  createGymInstances
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+ err);
    }
    else {
        console.log('SUCCESS: ' + results);
    }
    //All done, disconnect from database
    mongoose.connection.close();
});
