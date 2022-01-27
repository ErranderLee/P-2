
module.exports = (socket) => {
    console.log('WS connected');
    socket.on('join', (params) => {
        console.log(params.chatroomid);
        socket.join(params.chatroomid);
    });
    socket.on('leave', (params) => {
        console.log('leave');
        socket.leave(params.chatroomid);
    })
    socket.on('chat message', (msg) => {
        io.to(msg.chatroomid).emit('chat message', msg);
        console.log('message: ' + msg.chatroomid, msg.msg);
    });
    socket.on('disconnect', () => {
        console.log('WS disconnect');
    });
}