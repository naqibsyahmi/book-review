const { DataTypes } = require("sequelize");

const bookModel = (db) => {
    return db.define("Book", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        BookName: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING(12000),
            allowNull: false,
        },
        BookImage: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        BookAuthor: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    })
};

module.exports = { bookModel };