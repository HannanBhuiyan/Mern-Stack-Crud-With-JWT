const mongoose = require("mongoose")
const config = require('./config')

const db_url = config.db.url

mongoose.connect(db_url)
    .then(() => {
        console.log("Database connection success")
    })
    .catch(error => {
        console.log(error)
        process.exit(1)
    })