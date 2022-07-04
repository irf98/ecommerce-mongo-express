import { Router } from "express"
import passport from "passport"
import User from "./userController.js"

const router = Router()

function routes(app) {
    app.use("/api/users", router)

    router.post("/signup", passport.authenticate("signup"), User.signUp)
    router.post("/signin", passport.authenticate("signin"), User.signIn)
    router.post("/signout", User.signOut)
}

export default routes