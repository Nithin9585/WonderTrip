const Listing = require("./models/listing");
const {listeningSchema,reviewSchema } = require("./schema.js")
const ExpressError = require("./utils/ExpressError");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path, "..", req.originalUrl);
    // console.log(req.session);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");
    }
    next();
};



module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;

    }
 next();
}

module.exports.isOwner = async (req, res, next) => {
    try {
        let { id } = req.params;
        let listing = await Listing.findById(id);
        if (!listing) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listings');
        }
        if (!listing.owner.equals(res.locals.currUser._id)) {
            req.flash('error', 'You do not have permission to do that');
            return res.redirect(`/listings/${id}`);
        }
        next();
    } catch (error) {
        console.error('Error in isOwner middleware:', error);
        req.flash('error', 'Something went wrong');
        return res.redirect('/listings');
    }
};

module.exports.validateListing = (req, res, next) => {
    const { error } = listeningSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(".");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

module.exports.isAuthor = async (req, res, next) => {
    let { reviewId } = req.params;
  
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
      req.flash("error", "you are not the author of this review");
      return res.redirect(`/listings/${Listing._id}`); // Potential issue here
    }
  
    req.flash("success", "review deleted!"); // (Assuming this is present)
    next();
  };
  

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body); // Validate using reviewSchema
    if (error) {
        let errMsg = error.details.map((ele)=>el.message).join(",");
throw new ExpressError(400, errMsg);
  } else {
        next();
    }
};