
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        maxlength:[20,'First name can not too long'],
        minlength:[3,'First name can not too short'],
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:[20,'Last name can not too long'],
        minlength:[3,'Last name can not too short'],
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator(v){
                
                return v.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
            },
            message:"Please provide valid Email"
        }
    },
    password:{
        type:String,
        minlength:[6,'Password must have 6 character!'],
        maxlength:[50,'Password must not too long'],
        validate:{
            validator(v){
                const common=['god123','123456','abcdef']
                const isMatch = common.some(commonpass=> v.includes(commonpass))
                if(isMatch){
                    return false
                }
            }
        }
    }

})

const User = mongoose.model('User',userSchema)

module.exports = User