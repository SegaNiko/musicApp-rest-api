const express = require('express');

const router = express.Router();
const {
  getBands,
} = require('../controllers/bands');

const { isAuth } = require('../middlewares/auth');

router.get('/bands',[], isAuth, getBands);

module.exports = router;