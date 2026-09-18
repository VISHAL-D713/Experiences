const User = require("../models/user.js")


module.exports.renderSignupForm=(req, res) => {
   
    res.render("users/signup.ejs")
}

module.exports.signupwork=async(req,res)=>{
    try{

        let{username,email,password}=req.body
        const newUser=new User({email,username})
        const registeredUser= await User.register(newUser,password)
        console.log(registeredUser)
        req.login(registeredUser,(err)=>{
            if(err){
               return next(err)
            }

            req.flash("success","Welcome to experiences !")
            res.redirect("/experiences")
        })
    }
    catch(err){
    console.log(err)
    req.flash("error",err.message)
    res.redirect("/users/signup")
    }
}


module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.loginwork = (req,res)=>{
    console.log(req.user)
    console.log('Done ohk login');
    
   req.flash("success","Welcome to Experiences")
   let redirectUrl=res.locals.redirectUrl || "/experiences"
   res.redirect(redirectUrl)
}


module.exports.logout=async (req,res,next)=>{
   req.logout((err)=>{
    if(err){
      return next(err)
    }
console.log('User has logged out !');
    
req.flash("success","You have logged out successfully!")
res.redirect("/users/login")
   })
}