const { Book } = require("../models")

const addNewBookReview = (body) => {
    return Book.create({ ...body });
}

const findBookReviewById = async (id) => {
    const bookReview = await Book.findByPk(id);
    return bookReview;
}

const findAllBookReviews = (orderBy = "BookName", orderDirection = "ASC") => {
    return Book.findAll({ order: [[orderBy, orderDirection]] });
}

const findBookReviewByIdAndDelete = async (id) => {
    const bookReview = await findBookReviewById(id);
    await bookReview.destroy();
    return bookReview;
}

module.exports = { addNewBookReview,
                   findBookReviewById,
                   findAllBookReviews,
                   findBookReviewByIdAndDelete };