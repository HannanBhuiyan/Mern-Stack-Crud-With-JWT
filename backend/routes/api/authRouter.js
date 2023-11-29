const express = require("express")
const router = express.Router()
const {
    registrationController, 
    getAllUsers, 
    loginController,
    sendOtpController,
    verifyOtpController,
    createNewPassword, 
} = require("../../controllers/authController")

const registrationValidator = require("../../validator/auth/registrationValidator");
const loginValidator = require("../../validator/auth/loginValidator");

router.get('/all-users', getAllUsers )
router.post('/registration', registrationValidator , registrationController )
router.post('/login', loginValidator, loginController)

// Forget password 

router.post('/send-otp', sendOtpController)
router.post('/verify-otp', verifyOtpController)
router.post('/create-password', createNewPassword)


module.exports = router