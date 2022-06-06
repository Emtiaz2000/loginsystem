const LocalStrategy  = require('passport-local').Strategy
const User = require('../model/user')
const bcrypt = require('bcrypt')

let localStrategy = (passport)=>{
    passport.use(new LocalStrategy({ usernameField: "email"},async (email,password,next)=>{
        
        //searching user
        const user = await User.findOne({email})
       //no user found
        if(!user){
            return next(null,false, {message:"No user with that Email!"} )
        }

        //compair hash password
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            return  next(null,user)
            
        }else{
            return next(null,false ,{message:"Invalid Login!"} )
        }

       

    }))

    passport.serializeUser((user,next)=>{
      next(null,user)
        
    })

    passport.deserializeUser(async(id,next)=>{
        const user = await User.findById(id)
            next(null,user)
    })
}


module.exports=localStrategy