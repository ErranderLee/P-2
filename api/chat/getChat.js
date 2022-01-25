const express = require('express');
const router = express.Router();
const { getChatroom, getChatmessages } = require('../service/getChat');

router.get('/getChatroom', getChatroom);

router.get('/getChatmessages', getChatmessages);

module.exports = router;