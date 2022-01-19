const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Post extends Model {
    static init(sequelize) {
        return super.init({
            postid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            sec_deposit: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            monthly: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            manage_fee: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            num_chat: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Post',
            tableName: 'post',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        
    }
}