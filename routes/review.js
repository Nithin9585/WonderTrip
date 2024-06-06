const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema.js"); // Import reviewSchema
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const {isLoggedIn,isAuthor,validateReview} = require("../middlewares.js")
const {New,Destroy}= require("../controllers/review.js")


//new review 
router.post("/",
 validateReview,isLoggedIn,
 wrapAsync(New));

//delete review

router.delete("/:reviewId",isLoggedIn,isAuthor, wrapAsync(Destroy));


module.exports = router;