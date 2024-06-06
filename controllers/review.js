const Review = require("../models/review.js");
const Listing = require("../models/listing");



module.exports.New = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    
    
    
    let newReview = new Review(req.body.reviews);
    listing.reviews.push(newReview);
    newReview.author = req.user._id;
    console.log(newReview);
    await newReview.save();
    await listing.save();
    
    res.redirect(`/listings/${listing._id}`);
}

module.exports.Destroy = async (req,res)=>{
    let {id, reviewId} = req.params;
   await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
   res.redirect(`/listings/${id}`);
}