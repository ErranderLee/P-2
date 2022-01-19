const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class User_Region extends Model {
    static init(sequelize) {
        return super.init({
        
        }, {
            sequelize,
            modelName: 'User_Region',
            tableName: 'user_region',
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        
    }
}