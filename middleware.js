const Listing = require("./models/listing.js")
const ExpressError = require("./utils/ExpressError.js")
const Review = require("./models/reviews.js")
const { listingSchema , reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    
    console.log("🔥 isLoggedIn middleware RUNNING");
    console.log(req);
    console.log("PATH:", req.path);
    console.log("ORIGINAL URL:", req.originalUrl);
    console.log("AUTHENTICATED:", req.isAuthenticated());

    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You should be logged in first!");
        return res.redirect("/users/login");
    }

    console.log("✅ User is authenticated");

    next();
};



module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl
    }
    next()
}


module.exports.isOwner= async (req,res,next)=>{
    let {id}=req.params
    let listing = await Listing.findById(id)
if(res.locals.currUser && !listing.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not authorized for actions on this listing")
    return res.redirect("/experiences")
}
next()
}
module.exports.isReviewAuthor= async (req,res,next)=>{
    let {id,reviewId}=req.params
    let review = await Review.findById(reviewId)
if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not authorized for actions on this listing")
    return res.redirect(`/experiences/${id}`)
}
next()
}


module.exports.validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=> el.message).join(",")
        throw new ExpressError(400,errMsg)
    }
    else{
        next()
    }
}


module.exports.validateReview = (req, res, next) => {
    console.log(req.headers["content-type"]);
console.log(req.body);
console.log("BODY RECEIVED:", req.body);
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg = error.details
            .map((el) => el.message)
            .join(",");

        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};