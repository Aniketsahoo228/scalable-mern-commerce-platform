
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders (Admin only)
// @access Private/Admin
router.get(
  "/",
  protect,
  admin,
  async (req, res) => {
    try {
      const orders = await Order.find({})
        .populate("user", "name email");

      return res.json(orders);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put(
  "/:id",
  protect,
  admin,
  async (req, res) => {
    try {

      // Validate ObjectId
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      const order = await Order.findById(
        req.params.id
      );

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      const normalizedStatus = req.body.status
        ? req.body.status.charAt(0).toUpperCase() +
          req.body.status.slice(1).toLowerCase()
        : order.status;

      order.status = normalizedStatus;

      // FIX: allow reverting delivery status
      order.isDelivered =
        normalizedStatus === "Delivered";

      order.deliveredAt =
        normalizedStatus === "Delivered"
          ? Date.now()
          : null;

      const updatedOrder =
        await order.save();

      return res.json(updatedOrder);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/Admin
router.delete(
  "/:id",
  protect,
  admin,
  async (req, res) => {
    try {

      // Validate ObjectId
      if (
        !mongoose.Types.ObjectId.isValid(
          req.params.id
        )
      ) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      const order = await Order.findById(
        req.params.id
      );

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      await order.deleteOne();

      return res.json({
        message: "Order removed",
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

module.exports = router;


