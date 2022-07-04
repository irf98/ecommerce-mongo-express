import Cart from "./cartService.js"
import Product from "../products/productService.js"

class CartController {
    static async createCart(req, res, next) {
        try {
            const user = req.user
            if (!user) {
                return res.status(400).json("Cannot create cart, there is no current user")
            }

            const data = req.body
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const cart = await Cart.getByUserId(user.id)
            if (cart) {
                return res.status(400).json("The requested user already have a Cart")
            }

            const newCart = await Cart.createCart({ userId: user.id, data })
            if (newCart.error) {
                return res.status(400).json("Error creating cart")
            }

            res.status(201).json("Successfully created Cart")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async getCartById(req, res, next) {
        try {
            const id = req.body.id
            if (!id) {
                return res.status(400).json("Invalid ID")
            }

            const cart = await Cart.getByUserId(id)
            if (!cart) {
                return res.status(400).json("Cart does not exist")
            }

            res.status(200).json(cart)
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async clearCartProducts(req, res, next) {
        try {
            const id = req.body.id
            if (!id) {
                return res.status(400).json("Invalid ID")
            }

            const cart = await Cart.getByUserId(id)
            if (!cart) {
                return res.status(400).json("Cart does not exist")
            }

            const clearProducts = await Cart.clearByUserId(id)
            if (clearProducts.error) {
                return res.status(400).json("Error removing products from Cart")
            }

            res.status(200).json("Successfully deleted all products")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async getCartProducts(req, res, next) {
        try {
            const id = req.body.id
            if (!id) {
                return res.status(400).json("Invalid ID")
            }

            const products = await Cart.getProducts(id)
            if (products.error) {
                return res.status(400).json("Error getting Cart products")
            }

            const total = await Cart.getCartTotal(id)
            if (total.error) {
                return res.status(400).json("Error getting Cart total")
            }

            res.status(200).json({ products, total })
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async addProductToCart(req, res, next) {
        try {
            const data = req.body
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const product = await Product.getById(data.productId)
            if (!product) {
                return res.status(400).json("Product does not exist")
            }

            const addToCart = await Cart.addToCart(data.cartId, product)
            if (addToCart.error) {
                return res.status(400).json("Error adding product")
            }

            res.status(200).json("Product added successfully")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async removeProductFromCart(req, res, next) {
        try {
            const data = req.body
            if (!data) {
                return res.status(400).json("Invalid data")
            }

            const cart = await Cart.getByUserId(data.cartId)
            if (!cart) {
                return res.status(400).json("Cart does not exist")
            }

            const product = await Product.getById(data.productId)
            if (!product) {
                return res.status(400).json("Product does not exist")
            }

            const remove = await Cart.deleteFromCart(data.cartId, product)
            if (remove.error) {
                return res.status(400).json("Error removing product")
            }

            res.status(200).json("Product removed successfully")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }
}

export default CartController