if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

console.log(`Hello ${process.env.SECRET}`);

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js");
const cookie_parser = require("cookie-parser");
const session = require("express-session");

// Fixed: Import connect-mongo directly without .default
const MongoStore = require("connect-mongo");
const flash = require("express-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Routes
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;

// Fixed: Database connection with TLS and timeout configurations to resolve SSL alerts
async function main() {
    await mongoose.connect(dbUrl, {
        tls: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    });
}

main()
    .then(() => {
        console.log("Connected to DB Successfully");
    })
    .catch((err) => {
        console.error("DB Connection Error:", err);
    });

// Configured MongoStore for express-session
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET || "Vishal713",
    },
    touchAfter: 24 * 3600,
    mongoOptions: {
        tls: true,
        serverSelectionTimeoutMS: 5000,
    },
});

// Fixed: Added `err` parameter to prevent ReferenceError on session store errors
store.on("error", (err) => {
    console.log("ERROR Occured in session store :", err);
});

const sessionoptions = {
    store,
    secret: process.env.SECRET || "Vishal713",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// Express App Settings & Middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie_parser("secretcode"));
app.use(session(sessionoptions));
app.use(flash());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Local Variables Middleware (Must be AFTER passport.session())
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user || null;
    next();
});

// Demo User Route
app.get("/experiences/demoUser", wrapAsync(async (req, res) => {
    let fakeUser = new User({
        email: "abc123@gmail.com",
        username: "demo-student",
    });
    let registeredUser = await User.register(fakeUser, "pass@123");
    res.send(registeredUser);
}));

// Route Handlers
app.use("/experiences", listingsRouter);
app.use("/experiences/:id/reviews", reviewsRouter);
app.use("/users", userRouter);

// 404 Route Handler
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err);

    const status = err.status || err.statusCode || 500;
    const message = err.message || "Something went wrong";

    res.status(status).render("listings/error.ejs", {
        status,
        message,
    });
});

app.listen(port, () => {
    console.log(`Port is listening on port ${port}`);
});