const express = require("express")
const router = express.Router({mergeParams:true})


const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js")
const { listingSchema , reviewSchema } = require("../schema.js");
const Review = require("../models/reviews.js")
const Listing = require("../models/listing.js")
const {validateReview,isLoggedIn,isOwner,isReviewAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js")





router.post("/",validateReview,wrapAsync(reviewController.reviewOperation))


router.delete(
    "/:reviewId",
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
);



module.exports=router