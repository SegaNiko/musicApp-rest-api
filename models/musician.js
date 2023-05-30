const mongoose = require('mongoose');

const musicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  user_type: { type: String, required: true },
  instrument: { type: String, required: true },
});

const Musicians = mongoose.model('Musician', musicianSchema);

module.exports = Musicians;
