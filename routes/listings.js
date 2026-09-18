const express = require("express")
const router = express.Router()

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const { listingSchema } = require("../schema.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const { populate } = require("../models/reviews.js");
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage })



router.get("/",wrapAsync(listingController.index))


//New Route
router.get("/new",isLoggedIn,(listingController.new))

 router.post("/new", 
    isLoggedIn,
 upload.single("image"),
    validateListing,
   wrapAsync(listingController.newForm));



   router.get("/genre/:category",async(req,res)=>{
   let {category}=req.params
   let listings=await Listing.find({category:{$eq:`${category}`}})
   console.log(listings)
   res.render("listings/specific.ejs",{listings})
   
   })
   router.get("/:id",
    wrapAsync(listingController.show)) 



router.get("/:id/edit",isLoggedIn,isOwner,
    wrapAsync(listingController.editForm))

router.put("/:id/",
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.editOperations))

router.delete("/:id/delete",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroy)
);

module.exports=router