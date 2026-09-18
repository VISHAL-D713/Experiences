const mongoose = require("mongoose")
const { title } = require("node:process")
const Review = require("./reviews.js")
// const Schema = Mongoose.Schema

const listingSchema=new mongoose.Schema({
    title:{
         type:String,
        required:true
        },
   
    description:{
         type:String,
        required:true
        },
    image:{
    url:{
        type:String
    }   ,
    filename:{
        type:String
    }  
    
    },
    likes:{
         type:Number,
        default:5
        },
    shares:{
         type:Number,
       default:3
        },
    category:{
         type:String,
       default:"Trending"
        },
    reviews:[
        {

            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})


listingSchema.post("findOneAndDelete",async (listing) => {
if(listing){
    await Review.deleteMany({ _id: {$in:listing.reviews} })
}
})

const Listing = mongoose.model("Listings",listingSchema)
module.exports=Listing