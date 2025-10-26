const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const secret = "bankai";

const { User } = require("../database/index");

router.post("/signin", async(req, res) => {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username, password });
    if(!findUser)
        return res.status(404).json({ message : "This user doesn't exist" });
    const token = jwt.sign({ userId : findUser._id }, secret, { expiresIn : "7d" });
    res.status(200).json({ message : "User found", Token : token });
});

module.exports = router;