const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

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

router.put("/:id", protect, admin, async (req, res) =>{
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

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

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
