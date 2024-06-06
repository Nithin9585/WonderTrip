//intialisation logic
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");



mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
  .then(() => console.log('Connected!'));


  const initDB = async () => {
    await Listing.deleteMany({});
    const listings = initData.data.map((obj) => ({
        ...obj,
        owner: '662f6d437c3c16a9226344b5',
    }));
    await Listing.insertMany(listings);
    console.log("data was initialised");
}


initDB();