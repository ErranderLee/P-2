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
                allowNull: true
            },
            monthly: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            manage_fee: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            num_chat: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING(30),
                allowNull: true
            },
            options: {
                type: DataTypes.TEXT,
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
        db.Post.belongsTo(db.Region);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Store);
        db.Post.belongsToMany(db.User, { through : db.Likes });
    }
}