const express = require("express")
const router = express.Router()
const { registrationController, getAllUsers, loginController } = require("../../controllers/AuthController")
const registrationValidator = require("../../validator/auth/registrationValidator");
const loginValidator = require("../../validator/auth/loginValidator");

router.get('/all-users', getAllUsers )
router.post('/registration', registrationValidator , registrationController )
router.post('/login', loginValidator, loginController)


module.exports = router