const router = require("express").Router();
const { getAllBookReviewsHandler, 
        getAscendingBookReviewsHandler,
        getDescendingBookReviewsHandler,
        addBookReviewRoute,
        submitBookReviewHandler,
        getBookReviewByIdHandler, 
        deleteBookReviewHandler } = require("../controllers/bookReviewController");

router
.route("/")
.get(getAllBookReviewsHandler);

router
.route("/asc")
.get(getAscendingBookReviewsHandler);

router
.route("/desc")
.get(getDescendingBookReviewsHandler);

router
.route("/addBookReview")
.get(addBookReviewRoute);

router
.route("/submitBookReview")
.post(submitBookReviewHandler);

router
.route("/descriptionBookReview/:id")
.get(getBookReviewByIdHandler);

router
.route("/deleted/:id")
.delete(deleteBookReviewHandler);

module.exports = router;