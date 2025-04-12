const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    
  },
  description: String,
  image: {
    type:String
  },
  author:String,
  price: Number,
  
  review: String,

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;