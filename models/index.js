'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const User = require('./user');
const User_Region = require('./user_region');
const Store = require('./store');
const Region = require('./region');
const Post = require('./post');
const Likes = require('./likes');
const Image = require('./image');
const Chatroom = require('./chat/chatroom');
const Chatmessage = require('./chat/chatmessage');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.User_Region = User_Region;
db.Store = Store;
db.Region = Region;
db.Post = Post;
db.Likes = Likes;
db.Image = Image;
db.Chatroom = Chatroom;
db.Chatmessage = Chatmessage;

User.init(sequelize);
User_Region.init(sequelize);
Region.init(sequelize);
Store.init(sequelize);
Post.init(sequelize);
Likes.init(sequelize);
Image.init(sequelize);
Chatroom.init(sequelize);
// Chatmessage.init(sequelize);

User.associate(db);
User_Region.associate(db);
Region.associate(db);
Store.associate(db);
Post.associate(db);
Likes.associate(db);
Image.associate(db);
Chatroom.associate(db);
// Chatmessage.associate(db);

module.exports = db;
