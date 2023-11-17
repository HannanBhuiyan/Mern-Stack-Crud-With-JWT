const jwt = require('jsonwebtoken');


const authVerify = (req, res, next) => {

    const token = req.headers['token']

    jwt.verify(token, 'secretkey123456', (err, decode) => {
        if(err) {
            res.status(500).json({ "status": "Unauthorized" })
        }
        else {
            next()
        }
    })

}

module.exports = authVerify