import { Router } from "express"
import Cart from "cartController.js"

const router = Router()

function routes(app) {
    app.use("/api/cart", router)

    router.post("/", Cart.createCart)
    router.post("/id", Cart.getCartById)
    router.post("/products", Cart.getCartProducts)
    router.post("/products/add", Cart.addProductToCart)
    router.delete("/products/clear", Cart.clearCartProducts)
    router.delete("/products/remove", Cart.removeProductFromCart)
}

export default routes