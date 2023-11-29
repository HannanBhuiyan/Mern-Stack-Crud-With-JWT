const { validationResult } = require("express-validator");
const Profile = require("../models/profileModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const OTP = require("../models/otpModel");
const sendMailUtility = require("../utils/sendMailUtility");

exports.getAllUsers = async (req, res) => {
    try {
        const allUser = await Profile.find()
        res.status(200).json(allUser)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.registrationController = async (req, res) => {
    const { firstName, lastName, email, mobile, password } = req.body

    const errors = validationResult(req).formatWith(error => error.msg)
 
    if(!errors.isEmpty()) {
        res.status(500).send({ "error": errors.mapped()})
    }
    else {
        let hashPassword = await bcrypt.hash(password, saltRounds);
        try {
            const newUsers = new Profile({
                firstName,
                lastName,
                email,
                mobile,
                password: hashPassword
            }) 
            await newUsers.save()
            res.status(200).json({ "status": "Registration success" })
        } catch (error) {
            res.status(500).send(error.message)
        }
    } 
    
}

exports.loginController = async  (req, res) => {
    const { email } = req.body

    const errors = validationResult(req).formatWith(err => err.msg)

    if(!errors.isEmpty()){
        return res.status(500).json({ "error": errors.mapped()})
    }
 
    try {
        const existsUsers = await Profile.findOne({email})
        if(existsUsers) {
            let payload = {
                exp: Math.floor(Date.now() / 1000) + (15*60*60),
                data: existsUsers
            }
            var token = jwt.sign(payload, 'secretkey123456');
            res.status(200).json({ "status" : "Login success", "token": token, "user": existsUsers })
        }
        else {
            res.status(401).json({ "status": "Unauthorized" })
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.sendOtpController = async (req, res) => {

    let email = req.body.email
    let otpCode = Math.floor(100000 + Math.random() * 900000)
    try {
        let existsUsers = await Profile.aggregate([ {$match: {email: email}}, {$count: "total"} ])
        if(existsUsers.length > 0) {
            await OTP.create({email: email, otp: otpCode})
            await sendMailUtility(email, "Your otp code = " + otpCode + " Task Manager PIN Vericicaton")
            res.status(200).json({ "message": "OTP send success"})
        }
        else {
            res.status(500).json({ "message": "Email not exists"})
        }
    } catch (error) {
        res.status(500).json({"message": "Failed"})
    }
}

exports.verifyOtpController = async (req, res) => {
    let otp = req.body.otp
    let email = req.body.email
    try {
        let existsEmail = await OTP.findOne({email}).where({status: 0})
        if(existsEmail){
            if(existsEmail.otp === otp) {
                let updateOtp = await OTP.findOneAndUpdate({email}, {status: 1}, {new: true}) 
                if(updateOtp){
                    res.status(200).json({ "message": "OTP Update Success" })
                }
                else {
                    res.status(500).json({ "message": "OTP  Not Update" })
                }
            }
            else {
                res.status(500).json({ "message": "OTP Not Match" })
            }
        }
        else {
            res.status(500).json({ "message": "Email not exists"})
        }

    } catch (error) {
        res.status(500).json({ "message" : error })
    }

}

exports.createNewPassword = async (req, res) => {
    
    let email = req.body.email
    let password = req.body.password
    let hashPassword =  await bcrypt.hash(password, saltRounds) 

    try {
        let updateSuccess = await Profile.findOneAndUpdate({email}, {password: hashPassword}, {new: true})
        if(updateSuccess){
            res.status(200).json({ "message": "Create new password success" })
        }
        else {
            res.status(500).json({ "message": "Can not find user" })
        }
        
    } catch (error) {
        res.status(500).json({ "message": "Create new password failed" })
    }

}