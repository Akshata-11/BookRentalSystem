const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require('path');
const methodOverride = require("method-override");

const ejsMate = require("ejs-mate");
app.engine('ejs', ejsMate);
const MONGO_URL="mongodb://127.0.0.1:27017/BookRental"



main().then(()=>{
    console.log("Connected to db");

}).catch((err)=>{
    console.log(err);

})


async function main() {
    await mongoose.connect(MONGO_URL)
    
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // to parse req.params
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));  //to include style sheet from public folder
app.get("/",(req,res)=>{
    res.send("Hi I am root");
})

//list route
app.get("/listings",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}
)


//new  route
app.get("/listings/new",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/new.ejs",{listing});
 }
 )


//show route
app.get("/listings/:id",async (req,res)=>{
   let {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listings/show.ejs",{listing});
}
)

//create route
app.post("/listings",async (req,res)=>{
   // let {title,description,price,image}=req.body;
    const newListing= new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings")
 }
 )


 //edit route
 app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listings/edit.ejs",{listing});
 })


 //update route
 app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings")
 }
)



 //delete route
 app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteListing=await Listing.findByIdAndDelete(id,{...req.body.listing});
    console.log(deleteListing)
    res.redirect("/listings")
 }
)
/*
app.get("/testListing",async (req,res)=>{
    let SampleListing=new Listing({
        title:"Normal People",
        description:"Normal People is a 2018 novel by the Irish author Sally Rooney. Normal People is Rooney's second novel",
        author:"Saally Rooney",
        image:"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1571423190i/41057294.jpg",
        price:"350",
        review:"Masterpiece"


    });
    await SampleListing.save();
        console.log("Sample was saved");
})
*/
//app.use(expressLayouts);
app.set('layout', 'layouts/boilerplate'); 

app.listen(8090, () => {
    console.log("server is listening to port 8090");
  });
  