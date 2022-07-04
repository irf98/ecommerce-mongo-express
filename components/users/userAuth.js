import passport from "passport"
import LocalStrategy from "passport-local"
import bcrypt from "bcrypt"
import User from "./userModel.js"

function isValidPassword(user, password) {
    return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
    return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10),
        null
    )
}

function auth(app) {
    app.use(passport.initialize())
    app.use(passport.session())

    passport.use("signin", new LocalStrategy(
        (username, password, done) => {
            User.findOne({username}, (err, user) => {
                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    return done(null, false)
                }

                return done(null, user)
            })
        }
    ))

    passport.use("signup", new LocalStrategy({
        passReqToCallback: true,
    },
        (req, username, password, done) => {
        User.findOne({username}, (err, user) => {
            if (err) {
                return done(err)
            }

            if (user) {
                return done (null, false)
            }

            const data = {
                name: req.body.name,
                lastname: req.body.lastname,
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                avatar: req.body.avatar,
                username: username,
                password: createHash(password)
            }

            User.create(data, (err, user) => {
                if (err) {
                    return done(err)
                }

                return done(null, user)
            })
        })
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, done)
    })
}

export default auth