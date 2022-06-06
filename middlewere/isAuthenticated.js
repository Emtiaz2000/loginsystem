const loggedInUser = (req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }else{
        res.redirect('/login')
    }
}

const isGuest = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.redirect('/user')
    }else{
        next()
    }
}

module.exports={loggedInUser,isGuest}