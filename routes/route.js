
const User = require('../model/user')
const route = require('express').Router()

//home page
route.get('/',async(req,res)=>{
    res.render('home',{
        title:'Home page',
        path:'/'
    })
    const user = await User.find()
    console.log(user)
   })

   //login page
   route.get('/login',(req,res)=>{
    res.render('pages/loginform',{
        title:'Login',
        path:'/login'
    })
   })

   //register page
   route.get('/register',(req,res)=>{
       res.render('pages/register',{
           title:'Register page',
           path:'/register'
       })
   })

   //register user
   route.post('/register',async (req,res)=>{
       console.log(req.body)
       if(req.body.password === req.body.repassword){
       const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.regemail,
        password:req.body.password
       })

       await newUser.save()
       
    }
   })


module.exports = route