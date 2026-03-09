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
    },
    sku : {
        type: String,
        unique: true,
        required : true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    sizes: {
        type: [String],
        required: true,
    },
    colors: {
        type: [String],
        required: true,
    },
    collections: {
        type: String,
        required: true,
    },
    material: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Men", "Women", "Unisex"],
    },

    images: [
    {
        url: {
        type: String,
        required: true,
        },
        altText: {
        type: String,
        },
    },
    ],
    isFeatured: {
        type: Boolean,
        default: false,
    },

    isPublished: {
        type: Boolean,
        default: false,
    },

    rating: {
        type: Number,
        default: 0,
    },
  }
);