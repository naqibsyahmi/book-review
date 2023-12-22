const asyncHandler = require("express-async-handler");
const CustomError = require("../middleware/customError");
const { addNewBookReview,
        findAllBookReviews,
        findBookReviewById, 
        findBookReviewByIdAndDelete } = require("../services/bookReviewService");

const addBookReviewRoute = (req, res) => {
    res.render("addBookReview");
}

const submitBookReviewHandler = asyncHandler(async (req, res) => {
    const { BookName, Description, BookImage, BookAuthor } = req.body;
    if (!(BookName && Description && BookImage && BookAuthor)) 
        throw new CustomError("Book name, Description, Book Cover, and Book Author are required", 400);
    
    await addNewBookReview({ BookName, Description, BookImage, BookAuthor });

    res.status(201).redirect("/");
});

const getAllBookReviewsHandler = asyncHandler(async (req, res) => {
    const bookReviews = await findAllBookReviews();
    res.render("bookReview", { ReviewList: bookReviews, currentFilter: "noFilter" });
});

const getAscendingBookReviewsHandler = asyncHandler(async (req, res) => {
    const bookReviews = await findAllBookReviews("BookName", "ASC");
    res.render("bookReview", { ReviewList: bookReviews, currentFilter: "ascOrder" });
});

const getDescendingBookReviewsHandler = asyncHandler(async (req, res) => {
    const bookReviews = await findAllBookReviews("BookName", "DESC");
    res.render("bookReview", { ReviewList: bookReviews, currentFilter: "descOrder" });
});

const getBookReviewByIdHandler = asyncHandler(async (req, res) => {
    const bookReview = await findBookReviewById(req.params.id);
    
    if (!bookReview) {
        throw new CustomError("Book review description not found", 404);
    }
    res.render("descriptionBookReview", { review: bookReview });
});

const deleteBookReviewHandler = asyncHandler(async (req, res) => {
    const bookReview = await findBookReviewByIdAndDelete(req.params.id);
    if (!bookReview) {
        throw new CustomError("Book Review not found", 404);
    }
    res.status(200).json(bookReview);
}); 

module.exports = { addBookReviewRoute,
                   submitBookReviewHandler,
                   getAllBookReviewsHandler,
                   getAscendingBookReviewsHandler,
                   getDescendingBookReviewsHandler,
                   getBookReviewByIdHandler,
                   deleteBookReviewHandler };