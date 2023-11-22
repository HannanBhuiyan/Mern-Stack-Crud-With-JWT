const Profile = require("../models/profileModel");
const Student = require("../models/studentModel")

exports.getStudentController = async (req, res, next) => {
    try {
        let allStudents = await Student.find();
        res.status(201).json(allStudents)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.postStudentController = async (req, res) => {
    
    const { studentName, studentEmail } = req.body

    try {
        const newStudent = new Student({
            studentName,
            studentEmail
        })
        await newStudent.save()
        return res.status(201).json({ message: "Student create success" })

    } catch (error) {
        res.status(500).send(error.message)
    }
    
}

exports.updateStudentController = async (req, res) => {

    const { studentName, studentEmail } = req.body
    try {
        const student = await Student.findById(req.params.id)
        student.studentName = studentName
        student.studentEmail = studentEmail
        student.save()
        res.status(200).json({ "message": "Update Success" })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.singleStudentController = async (req, res) => {
   
    try {
        const singleStudent = await Student.findOne({ _id: req.params.id })
        res.status(200).json({ "status" : "success", data: singleStudent })

    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

exports.deleteStudentController = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id)
        res.status(200).json({ "status" : "Student delete success" })

    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.studentDetails = async (req, res) => {
    let email = req.headers['email']
    try {
        let students = await Profile.find({email})
        res.status(200).json(students)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.profileImageUpdate = (req, res) => {
    
}

exports.profileInfoUpdate = async (req, res) => {

    // const { firstName, lastName, mobile } = req.body
    let email = req.headers['email']
    // let existsUsers = await Profile.findOne({email})

    let updateData = await Profile.findOneAndUpdate({email}, req.body, {new: true})

    if(updateData){
        res.status(200).json({ "success": "Update success" })
    }
    else {
        res.status(500).json({ "message": "User not found" })
    }


    // if(existsUsers){
    //    try {
    //         const datas = await Profile.findById(id)
    //         console.log(datas)
    //         datas.firstName = firstName,
    //         datas.lastName = lastName,
    //         datas.mobile = mobile, 
    //         datas.save()
    //         res.status(200).json({ "success": "Update success" })
    //    } catch (error) {
    //     res.status(500).json({ "message": error.message })
    //    }
    // }
    // else {
    //     res.status(500).json({ "message": "User not found" })
    // }

}


exports.passwordUpdateController = (req, res) => {

}