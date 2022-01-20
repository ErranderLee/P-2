const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = class Image extends Model {
    static init(sequelize) {
        return super.init({
            imageid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            path: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Image',
            tableName: 'image',
            timestamps: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Image.belongsTo(db.Post);
    }
}