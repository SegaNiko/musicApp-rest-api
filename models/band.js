const mongoose = require('mongoose');

const bandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  user_type: { type: String, required: true },
  musical_direction: { type: String, required: true },
});

const Band = mongoose.model('Band', bandSchema);

module.exports = Band;
