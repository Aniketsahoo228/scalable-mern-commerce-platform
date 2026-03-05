const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config(); // ✅ moved to top — must be first!

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); // ✅ now MONGO_URI is available

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome to Azurelle!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});