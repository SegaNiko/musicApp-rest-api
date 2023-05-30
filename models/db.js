const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(res => {console.log('database is conected')})
  .catch(err => console.log('some error with conecting to DB'))