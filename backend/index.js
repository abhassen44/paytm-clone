// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index"); // ✅ Fixed path

const app = express();
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;



// ✅ All API routes under /api/v1
app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Paytm Backend");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



