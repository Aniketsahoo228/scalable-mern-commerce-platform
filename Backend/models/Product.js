const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        tyoe: String,
        required: true,
        trim: true,
    },
    description: {
        tyoe: String,
        required: true,
    },
    price : {
        type: Number,
    },
    couterInStock : {
        type : Number,
        required: true,
        default: 0,
    }
})