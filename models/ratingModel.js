const { DataTypes } = require("sequelize")

const ratingModel = (db) => {
    return db.define("Rating", {
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
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
};

module.exports = { ratingModel };
        
  