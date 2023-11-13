const {Schema, model } = require("mongoose")

const profileSchema = new Schema({
    firstName: {
        type: String,
        match: /[a-z]/,
        require: true
    },
    lastName: {
        type: String,
        match: /[a-z]/,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true
    }
},{ timestamps: true })

const Profile = model('profile', profileSchema)
module.exports = Profile

