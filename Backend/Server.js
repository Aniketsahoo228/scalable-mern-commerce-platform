const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRouter");

dotenv.config(); // ✅ moved to top — must be first!

const app = express();
app.use(express.json());
app.use(cors());
// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

connectDB(); // ✅ now MONGO_URI is available

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
    res.send("Welcome to Azurelle!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
