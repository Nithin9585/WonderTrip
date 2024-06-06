const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn,isOwner} = require("../middlewares.js");
const { index,New,Show,CreateNew,Edit,Update,Delete } = require("../controllers/listings.js");
const multer  = require('multer')
const {storage,cloudinary} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
 .get(wrapAsync(index))
 .post(isLoggedIn,upload.single("listing[image]"),wrapAsync(CreateNew));

//index Route

router.get("/new",isLoggedIn,New);

//new Route

router.route("/:id")
 .get( wrapAsync(Show))
 .put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(Update))
 .delete(isLoggedIn,isOwner,wrapAsync(Delete))
 
  
//show Route

  
//create Route

  
// Edit Route

router.get("/:id/edit",isLoggedIn,isOwner,Edit );

//update Route


//delete Route

  

module.exports = router;