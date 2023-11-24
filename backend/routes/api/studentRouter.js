const express = require('express')
const router = express.Router()
const { getStudentController, postStudentController, singleStudentController, updateStudentController, deleteStudentController, profileInfoUpdate, studentDetails, passwordUpdateController, profileImageUpdate } = require('../../controllers/studentController')
const authVerify = require('../../middlewares/authVerifyMiddleware') 
const upload = require('../../middlewares/uploadMiddleware')


router.get('/', authVerify, getStudentController)
router.post('/create-student', authVerify, postStudentController)
router.get('/single-student/:id', authVerify, singleStudentController)
router.post('/update-student/:id', authVerify, updateStudentController)
router.delete('/delete-student/:id', authVerify, deleteStudentController)


// profile
router.get("/students/", authVerify, studentDetails)
router.post("/update-profile", authVerify, profileInfoUpdate)
router.post("/password-update", authVerify, passwordUpdateController )
router.post('/update-profile-image', upload.single('file'),  authVerify, profileImageUpdate )



module.exports = router
