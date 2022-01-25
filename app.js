const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { sequelize } = require('./models');
const authApi = require('./api/auth/auth');
const getDataApi = require('./api/page/getData');
const setDataApi = require('./api/page/setData');
const getChatApi = require('./api/chat/getChat');
const setChatApi = require('./api/chat/setChat');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./api/auth/passport/passport');
const { Server } = require('socket.io');
const io = new Server(server);

sequelize.sync({ force: true })
    .then(() => console.log('database connected'))
    .catch((err) => console.error(err));
passportConfig();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));  // 한글 공백 포함되면 제대로 인식되지 않는 문제 해결.
app.use(express.json());
app.use(session({ secret: '비밀코드', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/data', getDataApi);
app.use('/auth', authApi);
app.use('/set', setDataApi);
app.use('/chat', getChatApi);
app.use('/chat', setChatApi);
app.get("/*", (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('WS connected');
    socket.on('join', (params) => {
        console.log(params.chatroomid);
        socket.join(params.chatroomid);
    })
    socket.on('chat message', (msg) => {
        io.to(msg.chatroomid).emit('chat message', msg);
        console.log('message: ' + msg.chatroomid, msg.msg);
    });
    socket.on('disconnect', () => {
        console.log('WS disconnect');
    });
});

server.listen(3000, () => {
    console.log("Server ON");
})
