const express = require('express');
const router = express.Router();
const { getRegions, getPosts, createTestDB } = require('../service/getData');

router.get('/region', getRegions);

router.get('/post', getPosts);

router.get('/createTestDB', createTestDB);


module.exports = router;