const Profile = require("../models/profileModel");
const Student = require("../models/studentModel")
const bcrypt = require("bcrypt")
const saltRounds = 10;


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
    let email = req.headers['email'] 
    let updateData = await Profile.findOneAndUpdate({email}, req.body, {new: true})
    if(updateData){
        res.status(200).json({ "success": "Update success" })
    }
    else {
        res.status(500).json({ "message": "User not found" })
    }
}


exports.passwordUpdateController = async (req, res) => {
    let email = req.headers['email']
    let existsData = await Profile.find({email})
    const { password, newPassword } = req.body
    if(existsData){
        let old_password = existsData[0].password
        let match = await bcrypt.compare(password, old_password)
        if(match) {
            try {
                let hashPassword = await bcrypt.hash(newPassword, saltRounds)
                let postBody = {
                    password: hashPassword
                }
                let updatepass = await Profile.findOneAndUpdate({email}, postBody, {new: true})
                if(updatepass){
                    res.status(200).json({ "success": "Password Update success" })
                }
                else {
                    res.status(500).json({ "message": "Password not updated" })
                }

            } catch (error) {
                console.log(error)
            }
        }
        else {
            res.status(500).json({ "message": "old password and new password does not match" })
        }
    }
    else {
        res.status(500).json({ "message": "User dose not exists" })
    }
}