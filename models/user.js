const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            userid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.User.belongsToMany(db.Region, { through: db.User_Region });
    }
}