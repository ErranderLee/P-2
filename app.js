const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const url = require('url');
const querystring = require('querystring');
const { sequelize, User, User_Region, Store, Region, Post, Likes, Image, Chatroom, Chatmessage } = require('./models');
const authApi = require('./api/auth/auth');
const getDataApi = require('./api/page/getData');

sequelize.sync({ force: true })
    .then(() => console.log('database connected'))
    .catch((err) => console.error(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));  // 한글 공백 포함되면 제대로 인식되지 않는 문제 해결.
app.use(express.json());

app.use('/', getDataApi);
app.use('/', authApi);
app.get("/*", (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
})

app.listen(3000, () => {
    console.log("Server ON");
})