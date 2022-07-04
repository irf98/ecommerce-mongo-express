import dotenv from "dotenv"
dotenv.config()

const config = {
    PORT: process.env.PORT,
    CORS: {
        origin: `${process.env.CORS}`,
        credentials: true,
    },
    DEV: process.env.NODE_ENV !== "production",
    MONGO_URI: process.env.MONGO_URI,
    SESSION: {
        secret: process.env.SECRET,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: Number(process.env.EXPIRATION)
        },
        rolling: true,
        resave: false,
        saveUninitialized: false,
    },
}

export default config