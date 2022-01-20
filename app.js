const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
const querystring = require('querystring');
const { sequelize, User, User_Region, Store, Region, Post, Likes, Image, Chatroom, Chatmessage } = require('./models');
const authApi = require('./api/auth/auth');
const getDataApi = require('./api/page/getData');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./api/auth/passport/passport');

sequelize.sync({ force: false })
    .then(() => console.log('database connected'))
    .catch((err) => console.error(err));
passportConfig();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));  // 한글 공백 포함되면 제대로 인식되지 않는 문제 해결.
app.use(express.json());
app.use(session({ secret: '비밀코드', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', getDataApi);
app.use('/auth', authApi);
app.get("/*", (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
})

app.listen(3000, () => {
    console.log("Server ON");
})