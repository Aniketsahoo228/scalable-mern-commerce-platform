const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRouter");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRouter");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoutes = require("./routes/subscriberRoutes");

const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

dotenv.config();

const app = express();

/* =========================
   Database Connection
========================= */

connectDB();

/* =========================
   Middleware
========================= */

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  })
);

/* =========================
   API Routes
========================= */

// User Routes
app.use("/api/users", userRoutes);

// Product Routes
app.use("/api/products", productRoutes);

// Cart Routes
app.use("/api/cart", cartRoutes);

// Checkout Routes
app.use("/api/checkout", checkoutRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Upload Routes
app.use("/api/upload", uploadRoutes);

// Newsletter Routes
app.use("/api", subscribeRoutes);

/* =========================
   Admin Routes
========================= */

app.use(
  "/api/admin/users",
  adminRoutes
);

app.use(
  "/api/admin/products",
  productAdminRoutes
);

app.use(
  "/api/admin/orders",
  adminOrderRoutes
);

/* =========================
   Health Route
========================= */

app.get("/", (req, res) => {
  res.send("Welcome to Azurelle!");
});

/* =========================
   Production Frontend Serve
========================= */

if (process.env.NODE_ENV === "production") {

  // Serve frontend build files
  app.use(
    express.static(
      path.join(__dirname, "../Frontend/dist")
    )
  );

  // SPA fallback — fixed wildcard syntax
  app.get("/{*splat}", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../Frontend/dist/index.html")
    );
  });
}

/* =========================
   Start Server
========================= */

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});