const express = require('express')
const router = express.Router()
const { getStudentController, postStudentController, singleStudentController, updateStudentController, deleteStudentController } = require('../../controllers/studentController')
const authVerify = require('../../middlewares/authVerifyMiddleware')


router.get('/',getStudentController)
router.post('/create-student', postStudentController)
router.get('/single-student/:id', singleStudentController)
router.post('/update-student/:id', updateStudentController)
router.delete('/delete-student/:id', deleteStudentController)


module.exports = router
