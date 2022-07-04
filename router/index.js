import notFound from "../utils/notFoundHandler.js"
import cart from "../components/cart/cartRouter.js"
import order from "../components/orders/orderRouter.js"
import product from "../components/products/productRouter.js"
import user from "../components/users/userRouter.js"

function router(app) {
    cart(app)
    order(app)
    product(app)
    user(app)

    notFound(app)
}

export default router