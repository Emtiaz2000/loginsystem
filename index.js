const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')
const route = require('./routes/route')
const connectMongo = require('./db/db')
const passport = require('passport')
const localStrategy = require('./db/passport')
const session = require('express-session')
const MongoStore = require('connect-mongo');



//passing passport to strategy
localStrategy(passport)


//connecting db
connectMongo()

app.use(express.urlencoded({ extended: false }))

//config handlebars
app.engine('.hbs', hbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')

//add css
app.use(express.static(path.join(__dirname, 'public')))




//config session
app.use(session({
    secret:'ilovenodejsandpurejs',
    resave: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://loginsystem:loginsystem@loginsystem.0uzkc.mongodb.net/?retryWrites=true&w=majority',
      }),
    saveUninitialized: false,
    cookie: {  maxAge: 24 * 60 * 100 * 1000, httpOnly: true, sameSite: 'lax' }
}))

//passport initilizing and session
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
   
    next()
})

//routes
app.use(route)




app.listen(5000, () => {
    console.log('server is running at 5000')
})