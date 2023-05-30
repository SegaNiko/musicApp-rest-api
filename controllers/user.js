const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Band = require('../models/band');
const Musician = require('../models/musician');

exports.createUser = async (req, res) => {
  const { name, email, password, user_type, musical_direction, instrument } = req.body;
  const isNewUser = await User.isThisEmailInUse(email);

  if (!isNewUser) {
    return res.json({
      success: false,
      message: 'This email is already in use, try sign-in',
    });
  }

  try {
    let createdUser;

    if (user_type === 'band') {
      const user = await User({
        name,
        email,
        password,
        user_type,
        musical_direction: musical_direction.toLowerCase(),
      });
      await user.save();

      const band = await Band({
        name,
        email,
        user_type,
        musical_direction: musical_direction.toLowerCase(),
      });
      createdUser = await band.save();
    } else {
      const user = await User({
        name,
        email,
        password,
        user_type,
        instrument: instrument.toLowerCase(),
      });

      await user.save();
      const musician = await Musician({
        name,
        email,
        user_type,
        instrument: instrument.toLowerCase(),
      });
      createdUser = await musician.save();
    }

    res.json({ success: true, user: createdUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the user.',
    });
  }
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: 'user not found, with the given email!',
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: 'email / password does not match!',
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  let oldTokens = user.tokens || [];

  if (oldTokens.length) {
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
      if (timeDiff < 86400) {
        return t;
      }
    });
  }

  await User.findByIdAndUpdate(user._id, {
    tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
  });

  const userInfo = {
    name: user.name,
    email: user.email,
    user_type: user.user_type,
    id: user._id,
  };

  res.json({ success: true, user: userInfo, token });
};

exports.signOut = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization fail!' });
    }

    const tokens = req.user.tokens;

    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ success: true, message: 'Sign out successfully!' });
  }
};
