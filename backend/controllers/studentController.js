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