
const User = require('../model/user')
const route = require('express').Router()
const passport = require('passport')
const { loggedInUser, isGuest } = require('../middlewere/isAuthenticated')
const {checkField,validateField}= require('../validator/registerValidation')
//home page
route.get('/', isGuest, (req, res) => {
  res.render('home', {
    title: 'Home page',
    path: '/'
  })

})

//login page
route.get('/login', isGuest, (req, res) => {
  res.render('pages/loginform', {
    title: 'Login',
    path: '/login'
  })
})

//register page
route.get('/register', isGuest, (req, res) => {
  res.render('pages/register', {
    title: 'Register page',
    path: '/register'
  })
})

//register user
route.post('/register', checkField(),validateField,async (req, res) => {
  console.log(req.body)
  if (req.body.password === req.body.repassword) {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.regemail,
      password: req.body.password
    })

    await newUser.save()
    res.redirect('/login')
  }
})

//login user
route.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
  (req, res) => {
    res.redirect('/user')
  });

//user profile
route.get('/user', loggedInUser, (req, res) => {

  res.render('pages/profile', {
    title: 'Your Account',
    path: '/user',
    user: {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    }
  });
})

route.post('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = route