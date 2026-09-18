const mongoose = require("mongoose")
const sampleData = require("./init.js")
const Listing = require("../models/listing.js")
MONGO_URL='mongodb://127.0.0.1:27017/experiences'

async function main() {
    await mongoose.connect(MONGO_URL)
}

main().then((res)=>{
    console.log('Connected to DB Succesfully');
}).catch((err)=>{
    console.log(err);
    
})

const initDB = async() => {
    await Listing.deleteMany({})
    sampleData.data=sampleData.data.map((obj)=>({
        
            ...obj,author:"6aa5568cb7463d3f79fd7076"
        
    }))
    await Listing.insertMany(sampleData.data)
    console.log('Data was initialized');
    
}

initDB()