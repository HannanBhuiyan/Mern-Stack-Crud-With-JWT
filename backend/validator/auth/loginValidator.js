const { body } = require('express-validator')
const Profile = require('../../models/profileModel')
const bcrypt  = require('bcrypt')

module.exports = [
    body('email')
    .notEmpty()
    .withMessage("Email field is required")
    .custom(async (email) => {
        let existsEmail = await Profile.findOne({email})
        if(!existsEmail){
            return Promise.reject("Email does not exists")
        }
    }),
    body("password")
    .notEmpty()
    .withMessage("Password field is required")
    .custom(async (password, {req}) => {
        let user = await Profile.findOne({ email: req.body.email }) 
        
        if(user){
            let match = await bcrypt.compare(password, user.password)
            if(!match){
                return Promise.reject("Password does not match")
            }
        }
        else {
            return Promise.reject("User not found");
        }
        return true

    })
]