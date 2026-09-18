if(process.env.NODE_ENV!="production"){

    require('dotenv').config()
}


console.log(`Hello ${process.env.SECRET}`)
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 8080
const path = require("path")
const methodOverride=require("method-override")
const ejsMate= require('ejs-mate')
// MONGO_URL='mongodb://127.0.0.1:27017/experiences'
const Listing = require("./models/listing.js")
const { render } = require("ejs")
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema , reviewSchema } = require("./schema.js");
const Review = require("./models/reviews.js")
const listingsRouter = require("./routes/listings.js")
const reviewsRouter = require("./routes/reviews.js")
const userRouter=require("./routes/user.js")
const cookie_parser= require("cookie-parser")
const session = require("express-session")
// ✅ OPTION B (Using .default export)
const MongoStore = require("connect-mongo").default;

const flash = require("express-flash")
// const passport = require("passport")
// const Localstrategy = require("passport-local")
// const User = require("./models/user.js")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const dbUrl = process.env.ATLASDB_URL


const store=MongoStore.create({
mongoUrl:dbUrl,
crypto:{
    secret:"Vishal713"
},
touchAfter:24*3600
})
let sessionoptions = {
    store,
    secret:"Vishal713",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true
    }
}

store.on("error",()=>{
    console.log("ERROR Occured in session store :",err)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.engine("ejs",ejsMate)
app.use(express.static(path.join(__dirname, "public")))
app.use(cookie_parser("secretcode"))
app.use(session(sessionoptions))
app.use(flash())


app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

async function main() {
    await mongoose.connect(dbUrl)
}

main().then((res)=>{
    console.log('Connected to DB Succesfully');
}).catch((err)=>{
    console.log(err);
    
})

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))









app.get("/experiences/demoUser",async (req,res) => {
let fakeUser = new User({
    email:"abc123@gmail.com",
    username:"demo-student"
})
let registeredUser=await User.register(fakeUser,"pass@123")
res.send(registeredUser)
})



app.use((req, res, next) => {
   

    res.locals.success =  req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user

    next();
});

app.use("/experiences", listingsRouter);
app.use("/experiences/:id/reviews", reviewsRouter);
app.use("/users", userRouter);





// app.get("/test",async(req,res)=>{
//     let sampleListing= new Listing({
//         title:"Ronaldo",
//         description:"He is the greatest football Player",
//         image:"https://imgs.search.brave.com/ImpdPnFXbVSqdfOIlodLgpeLZYi_m1Eq-LxFNnXyRZM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIx/MzkzNjc0OC9waG90/by9yaXlhZGgtc2F1/ZGktYXJhYmlhLWNy/aXN0aWFuby1yb25h/bGRvLW9mLWFsLW5h/c3NyLWxvb2tzLW9u/LWZyb20taW5zaWRl/LXRoZS1wbGF5ZXJz/LXR1bm5lbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aHdP/ckNzNkFPTGN5eHZh/bXlVYkJOR0FvRUhx/WXFnOWQ2UXNVeUgy/VHFDMD0",
//         category:"sports"
//     })
//     await sampleListing.save().then((res)=>{
//         console.log('Saved');
        
//     }).catch((err)=>{
//         console.log('Err');
        
//     })
//     res.send("Working okay")
// })











app.all(('/*splat'),(req,res,next)=>{
 new ExpressError(404,"Page not found")
})

app.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(status).render("listings/error.ejs", {
        status,
        message
    });
});


app.listen(port,()=>{
    console.log('Port is listening');
    
})