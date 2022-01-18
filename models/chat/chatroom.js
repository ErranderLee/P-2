const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Chatroom extends Model {
    static init(sequelize) {
        return super.init({
            chatroomid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
        }, {
            sequelize,
            modelName: 'Chatroom',
            tableName: 'chatroom',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Chatroom.belongsTo(db.User, { foreignKey: 'userid' });
        db.Chatroom.belongsTo(db.Post, { foreignKey: 'postid' });
        db.Chatroom.hasMany(db.Chatmessage, { foreignKey: 'chatroomid' });
    }
}