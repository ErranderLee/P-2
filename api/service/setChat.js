const { Chatroom, Chatmessage } = require('../../models');
const setChat = {
    setChatmessage : async (req, res) => {
        const { message, chatroomid } = req.body;
        const newChatmessage = await Chatmessage.create({
            message: message,
            ChatroomChatroomid: chatroomid
        });
        const exUser = req.user;
        await exUser.addChatmessage(newChatmessage);
        res.json();
    },
    deleteChatroom: async (req, res) => {
        const { chatroomid } = req.body;
        await Chatroom.destroy({ where : { chatroomid: chatroomid }});
        res.json();
    }
}

module.exports = setChat;