const mongoose = require('mongoose')

const connectMongo= async ()=>{
    try {
        await mongoose.connect('mongodb+srv://loginsystem:loginsystem@loginsystem.0uzkc.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser: true,
        useUnifiedTopology: true,})
        console.log('database is connected!')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=connectMongo