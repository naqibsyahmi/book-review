const { Rating } = require("../models")

const addRatingForBook = async (bookId, ratingValue) => {
    return await Rating.create({ bookId: bookId, rating: ratingValue });
}

const findAllRatingsForBook = async (bookId) => {
    return await Rating.findAll({ where: { bookId: bookId } });
}

const calculateAverageRatingForBook = async (bookId) => {
    const ratings = await findAllRatingsForBook(bookId);
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return (ratings.length > 0) ? total / ratings.length : 0;
}

module.exports = { addRatingForBook, 
                   findAllRatingsForBook,
                   calculateAverageRatingForBook };