const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

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

    if (
      !name ||
      !description ||
      price === undefined ||
      countInStock === undefined ||
      !category ||
      !sku ||
      !Array.isArray(sizes) ||
      sizes.length === 0 ||
      !Array.isArray(colors) ||
      colors.length === 0 ||
      !collections
    ) {
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

    if (
      !name ||
      !description ||
      price === undefined ||
      countInStock === undefined ||
      !category ||
      !sku ||
      !Array.isArray(sizes) ||
      sizes.length === 0 ||
      !Array.isArray(colors) ||
      colors.length === 0 ||
      !collections
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: name, description, price, countInStock, category, sku, sizes, colors, collections",
      });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.discountPrice = discountPrice || product.discountPrice;
    product.countInStock = countInStock || product.countInStock;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.sizes = sizes || product.sizes;
    product.colors = colors || product.colors;
    product.collections = collections || product.collections;
    product.material = material || product.material;
    product.gender = gender || product.gender;
    product.images = images || product.images;
    product.isFeatured = isFeatured ?? product.isFeatured;
    product.isPublished = isPublished ?? product.isPublished;
    product.tags = tags || product.tags;
    product.dimensions = dimensions || product.dimensions;
    product.weight = weight || product.weight;
    product.sku = sku || product.sku;

    const updatedProduct = await product.save();
    return res.status(200).json(updatedProduct);

  } catch (error) {
    console.error("Error updating product:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    if (error.code === 11000) {
      return res.status(400).json({ message: "SKU must be unique" });
    }

    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
