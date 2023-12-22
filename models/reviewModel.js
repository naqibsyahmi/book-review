const { DataTypes } = require("sequelize");

const reviewModel = (db) => {
    return db.define("Review", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        review: {
            type: DataTypes.STRING(12000),
            allowNull: false,
        },
    })
};

module.exports = { reviewModel };
