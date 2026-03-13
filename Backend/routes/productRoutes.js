const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

const validateProductPayload = (body) => {
  const {
    name,
    description,
    price,
    countInStock,
    category,
    sku,
    sizes,
    colors,
    collections,
  } = body;

  return Boolean(
    name &&
      description &&
      price !== undefined &&
      countInStock !== undefined &&
      category &&
      sku &&
      Array.isArray(sizes) &&
      sizes.length > 0 &&
      Array.isArray(colors) &&
      colors.length > 0 &&
      collections
  );
};

const assignProductFields = (product, payload) => {
  const fields = [
    "name",
    "description",
    "price",
    "discountPrice",
    "countInStock",
    "category",
    "brand",
    "sizes",
    "colors",
    "collections",
    "material",
    "gender",
    "images",
    "tags",
    "dimensions",
    "weight",
    "sku",
  ];

  fields.forEach((field) => {
    if (payload[field] !== undefined) {
      product[field] = payload[field];
    }
  });

  if (payload.isFeatured !== undefined) {
    product.isFeatured = payload.isFeatured;
  }

  if (payload.isPublished !== undefined) {
    product.isPublished = payload.isPublished;
  }
};

// @route GET /api/products
// @desc Get all products
// @access Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route GET /api/products/:id
// @desc Get a product by id
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(500).json({ message: "Server Error" });
  }
});

// @route POST /api/products
// @desc Create a product
// @access Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    if (!validateProductPayload(req.body)) {
      return res.status(400).json({
        message:
          "Missing required fields: name, description, price, countInStock, category, sku, sizes, colors, collections",
      });
    }

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: "SKU must be unique" });
    }

    return res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/products/:id
// @desc Update a product
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    if (!validateProductPayload(req.body)) {
      return res.status(400).json({
        message:
          "Missing required fields: name, description, price, countInStock, category, sku, sizes, colors, collections",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    assignProductFields(product, req.body);

    const updatedProduct = await product.save();
    return res.status(200).json(updatedProduct);

  } catch (error) {
    console.error("Error updating product:", error);

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product not found" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: "SKU must be unique" });
    }

    return res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/products/:id
// @desc Delete a product
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    return res.status(200).json({ message: "Product removed" });
  } catch (error) {
    console.error("Error deleting product:", error);

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
