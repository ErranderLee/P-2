const express = require('express');
const router = express.Router();
const { postLike, deleteLike } = require('../service/setData');

router.post('/like', postLike);

router.delete('/like', deleteLike);

module.exports = router;