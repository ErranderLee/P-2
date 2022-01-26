const express = require('express');
const router = express.Router();
const { setChatmessage, deleteChatroom } = require('../service/setChat');

router.post('/setChatmessage', setChatmessage);

router.delete('/deleteChatroom', deleteChatroom);

module.exports = router;