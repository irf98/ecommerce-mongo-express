import Cart from "../cart/cartService.js"

class UserController {
    static async signUp(req, res, next) {
        try {
            if (!req.user) {
                return res.status(400).json({ error: "Error signing up" })
            }

            res.status(201).send(req.user)
        } catch (err) {
            res.status(500).json(err)
            next(err)
        }
    }

    static async signIn(req, res, next) {
        try {
            if (!req.isAuthenticated()) {
                return res.status(404).json({ error: "Error signin in" })
            }

            const user = req.user
            const cart = await Cart.getByUserId(user.id)
            const data = {
                user,
                cart,
            }

            res.status(200).send(data)
        } catch (err) {
            res.status(500).json(err)
            next(err)
        }
    }

    static async signOut(req, res, next) {
        try {
            if (!req.user) {
                return res.status(404).json({ error: "No current user" })
            }

            await req.logout()
            res.status(200).json({ message: "Success" })
        } catch (err) {
            res.status(500).json(err)
            next(err)
        }
    }
}

export default UserController