const { Chatroom, Chatmessage } = require('../../models');
const getChat = {
    getChatroom : async (req, res) => {
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
    },
    getChatmessages : async (req, res) => {
        const chatmessages = await Chatmessage.findAll({
            where: {
                ChatroomChatroomid: parseInt(req.query.chatroomid)
            }
        });
        if(chatmessages === null) {
            res.json(null);
        } else {
            res.json(chatmessages);
        }
    }
}

module.exports = getChat;