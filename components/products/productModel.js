import mongoose from "mongoose"

const Schema = mongoose.Schema

const productModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
})

export default mongoose.model("product", productModel)