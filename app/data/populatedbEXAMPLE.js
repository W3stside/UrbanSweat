#! /usr/bin/env node

console.log('This script populates a some test books, authors, cities and gyminstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

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

var gyms = []
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

function cityCreate(_id, name, bgImageUrl, categories, cb) {
  cityDetails = { _id, name, bgImageUrl, categories }

  var city = new City(cityDetails);

  city.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New City: ' + city);
    cities.push(city)
    cb(null, city);
  }   );
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


function gymInstanceCreate(gym, bgImageUrl, categories, cities, address, contact = {}, email = false, phone = false, description, cb) {
  gymInstanceDetails = {
    gym,
    bgImageUrl,
    categories,
    cities,
    address,
    contact: contact: {
      email,
      phone
    },
    description,
  }

  var gyminstance = new GymInstance(gymInstanceDetails);
  gyminstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING GymInstance: ' + gyminstance);
      cb(err, null)
      return
    }
    console.log('New GymInstance: ' + gyminstance);
    gymInstances.push(gyminstance)
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


function createBookInstances(cb) {
    async.parallel([
        function(callback) {
          bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // optional callback
        cb);
}



async.series([
    createGenreAuthors,
    createBooks,
    createBookInstances
],
// optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+gyminstances);

    }
    //All done, disconnect from database
    mongoose.connection.close();
});
