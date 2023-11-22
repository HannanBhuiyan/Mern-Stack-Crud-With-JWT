const jwt = require('jsonwebtoken');


const authVerify = (req, res, next) => {

    const token = req.headers['token']

    jwt.verify(token, 'secretkey123456', (err, decoded) => {
        if(err) {
            res.status(500).json({ "status": "Unauthorized" })
        }
        else {
            let datas =decoded['data'];
            req.headers.email= datas.email
            next()
        }
    })

}

module.exports = authVerify