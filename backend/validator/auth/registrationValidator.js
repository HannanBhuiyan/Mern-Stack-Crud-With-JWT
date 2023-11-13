const { body } = require("express-validator") 
const Profile = require("../../models/profileModel")

module.exports = [

    body('firstName')
    .notEmpty()
    .withMessage("Student first name is required"),

    body("lastName")
    .notEmpty()
    .withMessage("Student LastName is required"),

    body("email")
    .notEmpty()
    .withMessage("Student email is required")
    .custom( async (email) => {  
        let existsUser = await Profile.findOne({email})
        if(existsUser){
            return Promise.reject(" Email already exists")
        }
    }),

    body("mobile")
    .notEmpty()
    .withMessage("Student phone number is required"),

    body("password")
    .notEmpty()
    .withMessage("Student password is required"),

    body("comfirm_password")
    .notEmpty()
    .withMessage("Confirm password field is required")
    .custom((comfirm_password, {req}) => {
        if(comfirm_password != req.body.password) {
            throw new Error("Confirm password does not match")
        }
        return true
    })

]