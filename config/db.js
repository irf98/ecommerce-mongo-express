import mongoose from "mongoose"
import config from "./config.js"

const db = {
    uri: config.MONGO_URI,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
}

function initDB() {
    mongoose.connect(db.uri, db.options).then(() => {
        console.log("Successfully connected to MongoDB")
    }).catch(err => {
        console.error(err)
    })
}

export default initDB