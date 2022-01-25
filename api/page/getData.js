const express = require('express');
const router = express.Router();
const { getRegions, getPosts, createTestDB, isliked } = require('../service/getData');

router.get('/region', getRegions);

router.get('/post', getPosts);

router.get('/isliked', isliked);

router.get('/createTestDB', createTestDB);

module.exports = router;