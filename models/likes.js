const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Likes extends Model {
    static init(sequelize) {
        return super.init({

        }, {
            sequelize,
            modelName: 'Likes',
            tableName: 'likes',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        
    }
}