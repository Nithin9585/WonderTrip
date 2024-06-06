const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN; 
const geocodingClient = mbxGeocoding({accessToken: mapToken});


module.exports.index = async (req, res, next) => {
    try {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    } catch (err) {
        next(err); // Pass the error to the next middleware for handling
    }
}

module.exports.New = (req,res)=>{
   
    res.render("listings/new.ejs");
}

module.exports.Show = (async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("owner").populate({path: "reviews",
    populate:{
        path:"author",
    },
});
    if (!listing) {
        req.flash("error", "The listing you requested does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
})

module.exports.CreateNew = (async (req, res,next) => {
    let response = await geocodingClient.forwardGeocode({
         query: req.body.listing.location,
          limit: 1
        })
          .send();

          console.log(response.body.features[0].geometry);
  
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};//store obj for new
    newListing.geometry = response.body.features[0].geometry;
    let savedlisting = await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
}) 

module.exports.Edit =  async (req, res) => {
    let { id } = req.params;
     
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The listing you requested does not exist!");
       return res.redirect("/listings");
    }
  let originalImage = listing.image.url;
  originalImage =  originalImage.replace("/upload","/upload/c_fill,,w_300");
    res.render("listings/edit.ejs", { listing, originalImage });
    
}

module.exports.Update =   async (req, res) => {
    let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
   if(typeof req.file !== "undefined"){
   let url = req.file.path;
   let filename = req.file.filename;
   listing.image = {url,filename};
   await listing.save();
    req.flash("succcess","Listing updated!");
   }else{
    res.redirect(`/listings/${id}`);
    req.flash("error","Listing Can't be updated!");


   }
}

module.exports.Delete = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    
    res.redirect("/listings");
}