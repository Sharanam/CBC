const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/auth');

router.get('/signup', signup);
router.post('/signin', signin);
module.exports = router;