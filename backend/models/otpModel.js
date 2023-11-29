const {Schema, model } = require('mongoose') 

const otpSchema = new Schema({
    email: {
        type: String,
    },
    otp:{
        type: String
    },
    status: {
        type: Number,
        default: 0
    }
},{ timestamps: true })

const OTP = model("otp", otpSchema)
module.exports = OTP