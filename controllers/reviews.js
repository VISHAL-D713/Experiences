const Review = require("../models/reviews.js")
const Listing = require("../models/listing.js")


module.exports.reviewOperation=async (req,res)=>{
    let id = req.params.id
    let listing = await Listing.findById(id)
    let newReview = new Review(req.body)
    newReview.author=req.user._id
    console.log(req.body)
    console.log("Review is :",newReview)
    

    listing.reviews.push(newReview);
    await newReview.save()
    await listing.save();

console.log('review is saved');
req.flash("success","Review added successfully !")
  res.redirect(`/experiences/${id}`)



}

module.exports.deleteReview=async (req, res) => {

        let { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(
            id,
            { $pull: { reviews: reviewId } }
        );

        await Review.findByIdAndDelete(reviewId);
req.flash("success","Review deleted successfully !")
        res.redirect(`/experiences/${id}`);
    }
