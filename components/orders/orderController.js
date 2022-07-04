import Order from "./orderService.js"
import Cart from "../cart/cartService.js"

class OrderController {
    static async generateOrder(req, res, next) {
        try {
            const user = req.user
            if (!user) {
                return res.status(400).json("Cannot generate order, there is no current user")
            }

            const data = req.body
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const order = await Order.createOrder({
                userId: user.id,
                buyer: user,
                products: data.products,
                total: data.total,
            }, data)
            if (order.error) {
                return res.status(400).json("Error generating order")
            }

            const cart = await Cart.clearByUserId(user.id)
            if (cart.error) {
                console.log("Error removing products from cart")
            }

            res.status(201).json("Successfully generated order")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async cancelOrder(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json("No ID specified")
            }

            const order = await Order.deleteById(id)
            if (order.error) {
                return res.status(400).json("Error removing order")
            }

            res.status(200).json("Successfully canceled order")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async getOrderById(req, res, next) {
        try {
            const id = req.body.id
            if (!id) {
                return res.status(400).json("Invalid ID")
            }

            const order = await Order.getById(id)
            if (!order) {
                return res.status(400).json("Order does not exist")
            }

            res.status(200).json(order)
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }
}

export default OrderController