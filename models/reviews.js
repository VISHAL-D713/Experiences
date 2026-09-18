const { required } = require("joi")
const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true,
    }
    ,rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Reviews = mongoose.model("Review",reviewSchema)
module.exports=Reviews