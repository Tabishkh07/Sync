const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/register", async(req, res)=>{
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({message: "User Created Successfully"});
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

router.post("/login", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    try{
        const user = await User.findOne({ email: email });
        if(user == null){
            return res.status(404).json({error: "User Not Found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({error: "Invalid credentials"});
        }
        const token = jwt.sign({
            userId: user._id},
            process.env.JWT_SECRET
        );
        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    }catch{
        res.status(400).json({error: "Invalid User Mail"});
    }
});

module.exports = router;