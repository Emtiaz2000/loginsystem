const express = require('express')
const app = express()
const path = require('path')
const hbs = require('express-handlebars')
const route = require('./routes/route')
const connectMongo = require('./db/db')

//connecting db
connectMongo()

app.use(express.urlencoded({extended:false}))

//config handlebars
app.engine('.hbs',hbs.engine({extname:'.hbs'}))
app.set('view engine','.hbs')

//add css
app.use(express.static(path.join(__dirname,'public')))


//routes
app.use(route)


app.listen(5000,()=>{
    console.log('server is running at 5000')
})