const express = require('express');
const router = express.Router();
const { Chatroom } = require('../../models');

router.get('/getChatroom', async (req, res) => {
    const exChatroom = await Chatroom.findOne({
         where: {
            UserUserid : req.user.userid,
            PostPostid : parseInt(req.query.postid)
        }
    });
    if(exChatroom === null) {
        const newChatroom = await Chatroom.create({
            UserUserid : req.user.userid,
            PostPostid : parseInt(req.query.postid)
        });
        res.json({ chatroom : newChatroom });
    } else {
        res.json({ chatroom : exChatroom });
    }
});

module.exports = router;