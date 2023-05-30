const express = require('express');

const router = express.Router();
const { createUser, userSignIn, signOut } = require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const { validateUserSignUp, userVlidation, validateUserSignIn } = require('../middlewares/validation/user');

router.post('/sign-up', validateUserSignUp, userVlidation, createUser);
router.post('/sign-in', validateUserSignIn, userVlidation, userSignIn);
router.post('/sign-out', isAuth, signOut);

module.exports = router;
