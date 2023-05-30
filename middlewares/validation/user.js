const { check, validationResult } = require('express-validator');

exports.validateUserSignUp = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required!')
    .isString()
    .withMessage('Must be a valid name!')
    .isLength({ min: 2, max: 20 })
    .withMessage('Name must be from 2 to 20 character!'),
  check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
  check('user_type').trim().isLength({ min: 2, max: 20 }).withMessage('Choose the type of user and your specialize!'),
  check('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Password is empty!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be from 8 to 20 characters long!'),
  check('confirmPassword')
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Both password must be same!');
      }
      return true;
    }),
];

exports.userVlidation = (req, res, next) => {
  const result = validationResult(req).array();

  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check('email').trim().isEmail().withMessage('email / password is required!'),
  check('password').trim().not().isEmpty().withMessage('email / password is required!'),
];