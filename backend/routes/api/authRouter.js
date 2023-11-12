const express = require("express")
const router = express.Router()
const { registrationController, getAllUsers, loginController } = require("../../controllers/AuthController")
const authValudation = require('../../validator/auth/registrationValidator');

router.get('/all-users', getAllUsers )
router.post('/registration', authValudation, registrationController )
router.post('/login', loginController)


module.exports = router