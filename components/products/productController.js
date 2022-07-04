import Product from "./productService.js"

class ProductController {
    static async getProducts(req, res, next) {
        try {
            const products = await Product.getAll()
            if (products.error) {
                return res.status(400).json("Error getting products")
            }

            if (!products) {
                return res.status(404).json("There are no products")
            }

            res.status(200).json(products)
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async getProductById(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json("No ID specified")
            }

            const product = await Product.getById(parseInt(id))
            if (product.error) {
                return res.status(400).json("Error getting product")
            }

            if (!product) {
                return res.status(400).json("Product does not exist")
            }

            res.status(200).json(product)
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async createProduct(req, res, next) {
        try {
            const data  = req.body
            if (!data) {
                return res.status(400).json("No product data")
            }

            const product = await Product.createProduct(data)
            if (product.error) {
                return res.status(400).json("Error creating product")
            }

            res.status(201).json("Successfully created product")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async updateProduct(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json("No ID specified")
            }

            const data = req.body
            if (!data) {
                return res.status(400).json("No product data")
            }

            const product = await Product.updateById(parseInt(id), data)
            if (product.error) {
                return res.status(400).json("Error updating product")
            }

            res.status(200).json("Successfully updated product")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json("No ID specified")
            }

            const product = await Product.deleteById(id)
            if (product.error) {
                return res.status(400).json("Error removing product")
            }

            res.status(200).json("Successfully removed product")
        } catch (err) {
            res.status(500).json("Error")
            next(err)
        }
    }
}

export default ProductController