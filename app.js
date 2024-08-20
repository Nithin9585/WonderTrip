if(process.env.NODE_ENV !== "productiion"){
  require('dotenv').config();

}

const dburl = process.env.ATLASDB_URL;


const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const UserRouter = require("./routes/user.js");

const ejsmate = require("ejs-mate");//styling npm templete
const path = require("path");
const session = require("express-session");
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const user = require("./models/user.js");

const store = mongoStore.create({
  mongoUrl : dburl,
  crypto:{
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized :true,
  cookie:{
    expires: Date.now()+7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly:true, //cross scripting attack
  },
}





app.use(session(sessionOptions));
app.use(flash());
//login pass
app.use(passport.initialize());
app.use(passport.session());//to know whichsession aprt
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));//css file
//ejs mate for styling
app.engine('ejs', ejsmate);
mongoose.connect(dburl)
  .then(() => console.log('Connected!'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({ extended: true }));
app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "nithtin@gmdail.com",
//     username: "delta-student"
//   });
//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",UserRouter);


app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err: err }); // Pass err variable
});


app.listen(3000, () =>{ });
 