const { Chatroom, Chatmessage } = require('../../models');
const setChat = {
    setChatmessage : async (req, res) => {
        const newChatmessage = await Chatmessage.create({
            message: req.body.message,
            ChatroomChatroomid: req.body.chatroomid
        });
        const exUser = req.user;
        await exUser.addChatmessage(newChatmessage);
    },
    deleteChatroom: async (req, res) => {
        await Chatroom.destroy({ where : { chatroomid: req.body.chatroomid }});
    }
}

module.exports = setChat;