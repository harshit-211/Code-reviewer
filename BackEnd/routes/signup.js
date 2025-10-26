const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const secret = "bankai";

const { User } = require("../database/index");

router.post("/signup", async(req, res) => {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username, password });
    if(checkUser)
        return res.status(404).json({ message : "You already have an account created" });
    const findUser = await User.findOne({ username });
    if(findUser)
        return res.status(409).json({ message : "This username already exists" });
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ userId : newUser._id }, secret, { expiresIn : "7d" });
    res.status(200).json({ message : "User created successfully", Token : token });
});

module.exports = router;