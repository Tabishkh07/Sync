const express = require("express");
const connectDB = require("./config/db");
const auth = require("./routes/auth");
const User = require('./models/User');
const authMiddleware = require("./middleware/auth");

require("dotenv").config();

const app = express();

connectDB();
app.use(express.json());
app.use("/api/auth", auth);

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

// post request
app.post("/api/users", async(req, res)=>{
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json(user);
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                error: "Invalid user data"
            });
        }
        res.status(500).json({error: err.message});
    }
}); 

// for all users
app.get("/api/users", async(req, res)=>{
    try{
        const user = await User.find().select("-password");
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// for getting 1 user
app.get("/api/users/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id).select("-password");
        if(user == null){
            return res.status(404).json({error: "Invalid User"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({error: "Invalid User Id"});
    }
});

// post request - updation
app.put("/api/users/:id", authMiddleware, async(req, res)=>{
    const id = req.params.id;
    if(req.user.userId !== id) {
        return res.status(403).json({
            error: "Not authorized"
        });
    }
    const data = {
        name: req.body.name,
        email: req.body.email
    };
    try{
        const user = await User.findByIdAndUpdate(id, data, {new: true});
        if(user == null){
            return res.status(404).json({error: "Invalid User"});
        }
        return res.status(200).json(user);
    }catch(err){
        res.status(400).json({error: "Invalid User Id"});
    };
});

// delete request
app.delete("/api/users/:id", authMiddleware, async(req, res)=>{
    const id = req.params.id;

    if (req.user.userId !== id) {
        return res.status(403).json({
            error: "Not authorized"
        });
    }
    
    try{
        const user = await User.findByIdAndDelete(id);
        if(user == null){
            return res.status(404).json({error: "Invalid User"});
        }
        return res.status(200).json(user);
    }catch(err){
        res.status(400).json({error: "Invalid User Id"});
    };
});

const port = 3000;
app.listen(port, () => {
    console.log("server started");
});