import { Router } from "express"
import Order from "./orderController.js"

const router = Router()

function routes(app) {
    app.use("/api/order", router)

    router.post("/", Order.generateOrder)
    router.post("/id", Order.getOrderById)
    router.delete("/cancel", Order.cancelOrder)
}

export default routes