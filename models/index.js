const { Sequelize } = require("sequelize");
const { DB_HOST,
        DB_PORT,
        DB_PASS,
        DB_USER,
        DB_NAME } = require("../config/envConfig");
const { bookModel } = require("./bookModel");
const { ratingModel } = require("./ratingModel");
const { reviewModel } = require("./reviewModel");

const db = new Sequelize({
    host: DB_HOST,
    port: DB_PORT,
    password: DB_PASS,
    username: DB_USER,
    database: DB_NAME,
    dialect: "mysql"
});

const Book = bookModel(db);
const Rating = ratingModel(db);
const Review = reviewModel(db);

Book.hasMany(Rating, { foreignKey: "bookId" });
Rating.belongsTo(Book, { foreignKey: "bookId" });

Book.hasMany(Review, { foreignKey: "bookId" });
Review.belongsTo(Book, { foreignKey: "bookId" });


module.exports = { db, Book, Rating, Review };