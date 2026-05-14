const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      default: 0,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    sizes: {
      type: [String],
      required: true,
      default: [],
    },

    colors: {
      type: [String],
      required: true,
      default: [],
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
          default: "",
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

    numReviews: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
      default: [],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    metaTitle: {
      type: String,
    },

    metaDescription: {
      type: String,
    },

    metaKeywords: {
      type: String,
    },

    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    weight: Number,
  },
  {
    timestamps: true,
  }
);

// ========================================
// DATABASE PERFORMANCE INDEXES
// ========================================

// Fast filtering by gender + category
productSchema.index({
  gender: 1,
  category: 1,
});

// Fast collection filtering
productSchema.index({
  collections: 1,
});

// Fast price sorting/filtering
productSchema.index({
  price: 1,
});

// Fast latest products query
productSchema.index({
  createdAt: -1,
});

// Fast best seller sorting
productSchema.index({
  rating: -1,
});

// Fast featured products query
productSchema.index({
  isFeatured: 1,
});

// Fast published products query
productSchema.index({
  isPublished: 1,
});

// Full text search optimization
productSchema.index({
  name: "text",
  brand: "text",
  category: "text",
});

module.exports = mongoose.model("Product", productSchema);
