const { addRatingForBookHandler,
    getAverageRatingForBookHandler } = require("../controllers/ratingController");

const router = require("express").Router();

router
.route("/addRating/:id")
.post(addRatingForBookHandler);

router
.route("/averageRating/:id")
.get(getAverageRatingForBookHandler);

module.exports = router;