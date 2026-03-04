const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 9000;

app.get("/",(req , res) => {
    res.send("Welcome to Azurelle!");
}
);

app.listen(PORT, () => {
    console.log(`Server is runnning on http://localhost:${PORT}`);
});
