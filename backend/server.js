const express = require("express");
const connectDB = require("./config/db");
const User = require('./models/User');
require("dotenv").config();

const app = express();

connectDB();
app.use(express.json());

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
        const user = await User.find();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

// for getting 1 user
app.get("/api/users/:id", async(req, res)=>{
    const id = req.params.id;
    try{
        const user = await User.findById(id);
        if(user == null){
            return res.status(404).json({error: "Invalid User"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(400).json({error: "Invalid User Id"});
    }
});

// post request - updation
app.put("/api/users/:id", async(req, res)=>{
    const id = req.params.id;
    const data = req.body;
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
app.delete("/api/users/:id", async(req, res)=>{
    const id = req.params.id;
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