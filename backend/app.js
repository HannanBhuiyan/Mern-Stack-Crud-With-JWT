const express = require("express")
const app = express()
require('./config/db')
const config = require('./config/config')
const port  = config.app.port
const studentRouter = require('./routes/api/studentRouter')
const authRouter = require('./routes/api/authRouter')


// Security middleware import
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const cors = require('cors')

// implement rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 500,
})


// Middleware use
app.use(helmet())
app.use(limiter)
app.use(mongoSanitize())
app.use(hpp())
app.use(cors({ origin: "*" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))



app.use('/api/v1', studentRouter)
app.use('/api/v1', authRouter)


app.use("*", (req, res) => {
    res.status(404).json({ message: "Failed ! Router not found" })
})


app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})

