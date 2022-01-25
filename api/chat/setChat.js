const express = require('express');
const router = express.Router();
const { setChatmessage } = require('../service/setChat');

router.post('/setChatmessage', setChatmessage);

module.exports = router;