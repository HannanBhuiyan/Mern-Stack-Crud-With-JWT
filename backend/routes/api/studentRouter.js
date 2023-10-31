const express = require('express')
const router = express.Router()
const { getStudentController, postStudentController, singleStudentController, updateStudentController, deleteStudentController } = require('../../controllers/studentController')



router.get('/', getStudentController)
router.post('/create-student', postStudentController)
router.get('/single-student/:id', singleStudentController)
router.put('/update-student/:id', updateStudentController)
router.delete('/delete-student/:id', deleteStudentController)



module.exports = router