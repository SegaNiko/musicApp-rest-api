const express = require('express');

const router = express.Router();

const { getMusicians } = require('../controllers/musicians');

const { isAuth } = require('../middlewares/auth');

router.get('/musicians', [], isAuth, getMusicians);

module.exports = router;
