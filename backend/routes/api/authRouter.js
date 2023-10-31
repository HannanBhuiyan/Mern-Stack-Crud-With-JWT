const express = require("express")
const router = express.Router()
const { registrationController, getAllUsers, loginController } = require("../../controllers/AuthController")


router.get('/all-users', getAllUsers )
router.post('/registration', registrationController )
router.post('/login', loginController)


module.exports = router