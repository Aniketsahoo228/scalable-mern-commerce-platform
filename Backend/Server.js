const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRouter");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRouter");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes); // ✅ fixed /api/order → /api/orders
app.use("/api/upload", uploadRoutes);
connectDB();

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
    res.send("Welcome to Azurelle!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
