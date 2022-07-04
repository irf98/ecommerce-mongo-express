import { Router } from "express"
import Product from "./productController.js"

const router = Router()

function routes(app) {
    app.use("/api/products", router)

    router.get("/", Product.getProducts)
    router.get("/:id", Product.getProductById)
    router.post("/", Product.createProduct)
    router.put("/:id", Product.updateProduct)
    router.delete("/:id", Product.deleteProduct)
}

export default routes