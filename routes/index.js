const router = require("express").Router();
const bookReviewRouter = require("./bookRoutes");
const ratingRouter = require("./ratingRoutes");
const reviewRouter = require("./reviewRoutes");

router.use("/", bookReviewRouter);
router.use("/", ratingRouter);
router.use("/", reviewRouter);


module.exports = { router };