const User = require("../models/user");

module.exports.renderSignUpForm = (req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signUp = async(req,res)=>{
    try{
        let{username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to wanderlust");
        res.redirect("/listings");
       })
       
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
   
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{

    req.flash("success","Welcome to Wanderlust");
    let savedUrl = res.locals.requiredUrl || "/listings" ;
    res.redirect(savedUrl);
}

module.exports.logout = (req,res)=>{
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "logged you out");
        res.redirect("/listings");
    })
}