const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("connectDB");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/",(req , res) => {
    res.send("Welcome to Azurelle!");
}
);

app.listen(PORT, () => {
    console.log(`Server is runnning on http://localhost:${PORT}`);
});
