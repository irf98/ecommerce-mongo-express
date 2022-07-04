import Order from "./orderModel.js"

class OrderService {
    static async createOrder(data) {
        try {
            const order = new Order(data)
            order.save()

            return await order
        } catch (err) {
            return {
                error: "Error creating order"
            }
        }
    }

    static async deleteById(id) {
        try {
            return await Order.findByIdAndDelete(id)
        } catch (err) {
            return {
                error: "Error deleting order by ID"
            }
        }
    }

    static async getById(id) {
        try {
            return await Order.find({ userId: id }).exec()
        } catch (err) {
            return {
                error: "Error getting order by ID"
            }
        }
    }
}

export default OrderService