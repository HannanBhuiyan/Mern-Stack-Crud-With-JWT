const nodemailer = require("nodemailer")

const sendMailUtility = async (mailTo, mailText, mailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        } 
    })

    let mailOptions = {
        from: "TESK MANAGEMENT <info@teamrabbil.com>",
        to: mailTo,
        subject: mailSubject,
        text: mailText
    }
    return  await transporter.sendMail(mailOptions)
}

module.exports = sendMailUtility