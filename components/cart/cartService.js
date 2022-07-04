import Cart from "./cartModel.js"

class CartService {
    static async createCart(data) {
        try {
            const cart = new Cart(data)
            cart.save()

            return await cart
        } catch (err) {
            return {
                error: "Error creating cart"
            }
        }
    }

    static async getByUserId(id) {
        try {
            return await Cart.findOne({ userId: id }).exec()
        } catch (err) {
            return {
                error: "Error getting cart by user ID"
            }
        }
    }

    static async clearByUserId(id) {
        try {
            const cart = await Cart.findOne({ userId: id }).exec()
            cart.products = []

            return await cart.save()
        } catch (err) {
            return {
                error: "Error removing cart products by user ID"
            }
        }
    }

    static async getProducts(id) {
        try {
            const cart = await Cart.findOne({ userId: id }).exec()

            return await cart.products
        } catch (err) {
            return {
                error: "Error getting cart products by user ID"
            }
        }
    }

    static async getCartTotal(id) {
        try {
            const cart = await Cart.findOne({ userId: id }).exec()

            cart.total = cart.products.reduce((total, item) => {
                return total + (item.quantity * item.price)
            }, 0)

            await cart.save()
            return await cart.total
        } catch (err) {
            return {
                error: "Error getting cart total"
            }
        }
    }

    static async addToCart(id, product) {
        try {
            const cart = await Cart.findOne({ userId: id }).exec()
            const item = cart.products.find(
                e => e.id === product.id
            )

            if (!item) {
                cart.products.push(product)
            } else {
                item.quantity += 1
            }

            return await cart.save()
        } catch (err) {
            return {
                error: "Error adding product to cart"
            }
        }
    }

    static async deleteFromCart(id, product) {
        try {
            const cart = await Cart.findOne({ userId: id }).exec()
            const item = cart.products.find(
                e => e.id === product.id
            )

            if (item.quantity === 1) {
                cart.products = cart.products.filter((e) =>
                    e.id !== product.id
                )
            } else {
                item.quantity = item.quantity - 1
            }

            return await cart.save()
        } catch (err) {
            return {
                error: "Error removing product from cart"
            }
        }
    }
}

export default CartService