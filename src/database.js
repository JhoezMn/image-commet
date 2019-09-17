const mongoose = require('mongoose');
const { database } = require('./keys');

mongoose.connect(database.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true    
})
  .then(db => console.log('Base de Dato conectada'))
  .catch(err => console.log(err));
