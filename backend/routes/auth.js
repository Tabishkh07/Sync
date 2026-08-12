const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();

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

module.exports = router;