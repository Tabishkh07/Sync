const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.get("/", (req, res) => {
    res.send("SYNC API is running");
});

const port = 3000;

app.listen(port, () => {
    console.log("server started");
});