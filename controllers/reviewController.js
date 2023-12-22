const asyncHandler = require("express-async-handler");
const CustomError = require("../middleware/customError");
const { addReviewForBook, findAllReviewsForBook } = require("../services/reviewService");

const addReviewForBookHandler = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const { review } = req.body;
    
    // Add a new review for the book
    const addedReview = await addReviewForBook(bookId, review);

    if (!review) {
        throw new CustomError("Review content is required", 400);
    }

    res.status(200).json(addedReview);
});

const getReviewForBookHandler = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const reviews = await findAllReviewsForBook(bookId);

    if (!reviews) {
        throw new CustomError("No reviews found for the book", 404);
    }

    res.status(200).json(reviews);
});
    
module.exports = { addReviewForBookHandler,
                   getReviewForBookHandler }; 
    