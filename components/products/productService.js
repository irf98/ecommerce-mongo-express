import Product from "./productModel.js"

class ProductService {
    static async createProduct(product) {
        try {
           return await Product.create(product)
        } catch(err) {
            return {
                error: "Error creating product"
            }
        }
    }

    static async getById(id) {
        try {
            return await Product.findById(id).exec()
        } catch(err) {
            return {
                error: "Error finding product by ID"
            }
        }
    }

    static async updateById(id, product) {
        try {
            const update = {
                $set: { ...product }
            }

            return await Product.findByIdAndUpdate(id, update)
        } catch(err) {
            return {
                error: "Error updating product by ID"
            }
        }
    }

    static async getAll() {
        try {
            return await Product.find({})
        } catch(err) {
            return {
                error: "Error getting products"
            }
        }
    }

    static async deleteById(id) {
        try {
            return await Product.findByIdAndDelete(id)
        } catch (err) {
            return {
                error: "Error removing product by ID"
            }
        }
    }
}

export default ProductService