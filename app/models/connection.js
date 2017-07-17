var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var dbURI = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;

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
