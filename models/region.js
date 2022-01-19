const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Region extends Model {
    static init(sequelize) {
        return super.init({
            regionid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Region',
            tableName: 'region',
            timestamps: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Region.belongsToMany(db.User, { through: db.User_Region });
    }
}