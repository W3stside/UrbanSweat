var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then( () => {
    console.info('Successful connection to', dbURI)
  })
  .catch( (err) => {
    console.info('ERROR: unsuccessful connection, error: ', err);
  })

//shut down
mongoose.connection.on('disconnected', function () {
  console.info('Mongoose successfully shut down.')
});
