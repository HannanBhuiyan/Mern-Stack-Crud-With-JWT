const { body } = require("express-validator")


module.exports = [

    body('firstName')
    .notEmpty()
    .withMessage("Student first name is required"),

    body("lastName")
    .notEmpty()
    .withMessage("Student LastName is required")

]