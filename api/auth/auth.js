const express = require('express');
const router = express.Router();
const { signup, login, getAuthenticatedUser, logout } = require('../service/auth');

router.post('/signup', signup);

router.post('/login', login);

router.get('/getAuthenticatedUser', getAuthenticatedUser);

router.get('/logout', logout);

module.exports = router;