const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class User_Region extends Model {
    static init(sequelize) {
        return super.init({
        
        }, {
            sequelize,
            modelName: 'User_Region',
            tableName: 'user_region',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User_Region.belongsTo(db.User, { foreignKey: 'userid' });
        db.User_Region.belongsTo(db.Region, { foreignKey: 'regionid' });
    }
}