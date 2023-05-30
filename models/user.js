const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  user_type: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  instrument: {
    type: String,
  },
  musical_direction: String
});

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error('Invalid email')
  try {
    const user = await this.findOne({ email });
    if (user) return false;

    return true;
  } catch (err) {

    return false
  }
}

userSchema.statics.isNameInUse = async function (name) {
  if (!name) throw new Error('Invalid name')
  try {
    const user = await this.findOne({ name });
    if (user) return false;

    return true;
  } catch (err) {

    return false
  }
}

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error('Password is mission, can not compare!');

  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log('Error while comparing password!', error.message);
  }
};


// bcrypt
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);

      this.password = hash;
      next();
    });
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;