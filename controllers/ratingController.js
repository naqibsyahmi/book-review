const asyncHandler = require("express-async-handler");
const CustomError = require("../middleware/customError");
const { addRatingForBook,
        calculateAverageRatingForBook } = require("../services/ratingService");

const addRatingForBookHandler = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const { rating } = req.body;

    // Add the new rating for the book
    await addRatingForBook(bookId, rating);

    // Calculate the average rating after adding a new rating
    const averageRating = await calculateAverageRatingForBook(bookId);

    res.status(200).json({ averageRating: averageRating });
});

const getAverageRatingForBookHandler = asyncHandler(async (req, res) => {
    const bookId = req.params.id;
    const averageRating = await calculateAverageRatingForBook(bookId);
    res.status(200).json({ averageRating: averageRating });
});


module.exports = { addRatingForBookHandler,
                   getAverageRatingForBookHandler };