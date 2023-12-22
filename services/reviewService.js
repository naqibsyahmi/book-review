const { Review } = require("../models")

const addReviewForBook = async (bookId, reviewText) => {
    return await Review.create({ bookId: bookId, review: reviewText });
}

const findAllReviewsForBook = async (bookId) => {
    return await Review.findAll({ where: { bookId: bookId } });
}

module.exports = { addReviewForBook, 
                   findAllReviewsForBook };