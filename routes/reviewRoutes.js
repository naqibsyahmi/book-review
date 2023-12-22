const { addReviewForBookHandler,
    getReviewForBookHandler } = require("../controllers/reviewController");

const router = require("express").Router();

router
.route("/reviews/:id")
.post(addReviewForBookHandler)
.get(getReviewForBookHandler);

module.exports = router;