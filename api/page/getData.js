const express = require('express');
const router = express.Router();
const { getRegions, getPosts, createTestDB, isliked, getLikePosts } = require('../service/getData');

router.get('/region', getRegions);

router.get('/post', getPosts);

router.get('/isliked', isliked);

router.get('/getLikePosts', getLikePosts);

router.get('/createTestDB', createTestDB);

module.exports = router;