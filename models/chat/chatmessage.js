const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Chatmessage extends Model {
    static init(sequelize) {
        return super.init({
            chatmessageid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            message: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Chatmessage',
            tableName: 'chatmessage',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Chatmessage.belongsTo(db.User);
        db.Chatmessage.belongsTo(db.Chatroom, {
            onDelete: 'CASCADE'
        });
    }
}