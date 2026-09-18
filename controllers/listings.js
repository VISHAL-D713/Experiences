const Listing = require("../models/listing.js")
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
module.exports.index=(async (req,res)=>{
 let allListings =  await Listing.find({})
   res.render("listings/experiences.ejs",{allListings})
})

module.exports.new=(req,res)=>{
    console.log(req.user);
    res.render("listings/new.ejs")
}

module.exports.newForm = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.filename;

    let { title, description, category } = req.body;

    let newListing = await Listing.create({
        title,
        description,
        image: {
            url: url,
            filename: filename
        },
        category,
        author: req.user._id
    });

    req.flash("success", "Experience added successfully!");
    res.redirect("/experiences");
}
module.exports.test=async (req, res, next) => {

   
    let { title, description, image, category } = req.body;

    let newListing = await Listing.create({
        title,
        description,
        image,
        category,
        author:req.user._id
    });
 
 res.send(req.body)
}


module.exports.show=async(req,res)=>{
    let {id}= req.params
let listing =  await Listing.findById(id).
populate
({


    path:"reviews",
    populate:{
        path:"author",
    },
}).populate("author")
console.log(listing);
 if(!listing){
        req.flash("error","Listing requested does not exist")
     return   res.redirect("/experiences")
    }
res.render("listings/individual.ejs",{listing})

}

module.exports.editForm=async(req,res)=>{
    let {id}= req.params;
    let listing = await Listing.findById(id)
   let originalImageUrl=listing.image.url
   originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_550")
    res.render("listings/edit.ejs",{listing,originalImageUrl})
}

module.exports.editOperations=async(req,res)=>{
    let {id}=req.params
    let {title,description,image,category}=req.body
    let listing = await Listing.findById(id)
    let editedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file!=="undefined"){

        let url = req.file.path;
       let filename = req.file.filename;
       editedListing.image={url,filename}
       console.log(editedListing);
       await editedListing.save()
    }
    req.flash("success", "Experience updated successfully!");
    res.redirect("/experiences")
    

}

module.exports.destroy=async (req, res) => {
        const { id } = req.params;

        await Listing.findByIdAndDelete(id);

        req.flash("success", "Experience deleted successfully!");

        res.redirect("/experiences");
    }