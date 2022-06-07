const {check,validationResult} = require('express-validator')
const User = require('../model/user')

const checkField = ()=>{
    return [
        check('firstName')
        .notEmpty()
        .withMessage('First Name is Required!')
        .isLength({min:3,max:20})
        .withMessage('Please put a valid name'),
        check('lastName')
        .notEmpty()
        .withMessage('last Name is Required!')
        .isLength({min:3,max:20})
        .withMessage('Please put a valid name'),
        check('regemail')
        .notEmpty()
        .withMessage('Please put a email address')
        .isEmail()
        .withMessage('Please provide valid Email!')
        .trim()
        .normalizeEmail(),
        check('regemail')
        .custom(async(email)=>{
            const user = await User.findOne({email})
            if(user){
                throw new Error('User already exist!')
            }else{
                return true
            }
        }),
        check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min:6,max:30})
        .withMessage('Password need min 6 charecter'),
       
        check('repassword')
        .notEmpty()
        .withMessage('Re-Password is required')
        .custom((conpass,{req})=>{
            if(conpass=== req.body.password){
                return true
            }else{
                throw new Error('Re-password must be same to password!')
            }
        })
    ]
}


const validateField =(req,res,next)=>{
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        //console.log(errors.errors[0].msg)
        res.render('pages/register',{
            title:'Register page',
            errMsg:errors.errors[0].msg,
            data:{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.regemail
            }
        })
    } else{
        next()
    }
}

module.exports ={
    checkField,
    validateField
}