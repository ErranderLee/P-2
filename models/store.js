const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Store extends Model {
    static init(sequelize) {
        return super.init({
            storeid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            hp: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Store',
            tableName: 'store',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Store.hasMany(db.Post, { foreignKey: 'storeid' });
    }
}