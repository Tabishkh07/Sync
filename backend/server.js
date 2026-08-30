require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const connectDB = require("./config/db");
const auth = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/users");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

connectDB();
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(rateLimiter);
app.use("/api/auth", auth);
app.use("/api/users", userRoutes);


// protected route
app.get("/api/protected", authMiddleware, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        user: req.user
    });
});

// index route
app.get("/", (req, res) => {
    res.send("SYNC API is running");
});

app.use(errorHandler);

const port = 3000;
app.listen(port, () => {
    console.log("server started");
});