const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl} = require("../middlewares.js");
const {Signup,Login,LogOut} = require("../controllers/user.js");

router.route("/signup")

 .get((req,res)=>{
  res.render("users/signup.ejs");
})
 .post( wrapAsync(Signup));



router.route("/login")
 .get((req,res)=>{
  res.render("users/login.ejs");
})
 .post( saveRedirectUrl, passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
}),Login );





router.get("/logout",LogOut);



module.exports = router;