const User = require("../models/user.js");
const passport = require("passport");


module.exports.Signup = async (req, res) => {
    try {
        let { username, email, password } = req.body; // Corrected to 'password'
        const newUser = new User({ email, username }); 
        const registeredUser = await User.register(newUser, password); // Corrected to 'password'
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', `Hello ${username}, Welcome to WonderTrip`);
            res.redirect("/listings");
  
        });
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
  }


module.exports.Login =   async (req, res) => {
    req.flash('success', `Hello ${req.body.username}, welcome back!`);
    res.redirect("/listings");
    // Corrected to res.locals.redirectUrl
  }

  
module.exports.LogOut =  (req,res,next)=>{
    req.logout((err)=>{
     if(err){
       next(err);
     }
     req.flash("success","you are logged out!");
     res.redirect("/listings");
    })
   }

