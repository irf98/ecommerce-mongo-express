import express from "express"
import session from "express-session"
import cors from "cors"
import config from "./config/config.js"
import initDB from "./config/db.js"
import router from "./router/index.js"
import auth from "./components/users/userAuth.js"

const app = express()
const port = config.PORT

app.use(cors(config.CORS))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session(config.SESSION))

initDB()
auth(app)
router(app)

app.listen(port, () => {
    console.log("Server listening on PORT ", port)
})