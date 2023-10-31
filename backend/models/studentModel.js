const mongoose = require("mongoose")


const studentSchema = mongoose.Schema({
    studentName: {
        type: String,
        unique: true,
        require: true,
    },
    studentEmail: {
        type: String,
        unique: true,
        require: true,
    }
},{ timestamps: true })

const Student = mongoose.model("Student", studentSchema)
module.exports = Student