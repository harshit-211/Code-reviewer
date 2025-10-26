const express = require("express");
const router = express.Router();

const { Conversation } = require("../database/index");
const authMiddleware = require("../middleware/authorization");

router.post("/conversation/save", authMiddleware, async(req, res) => {
    try {
        const { code, aiResponse } = req.body;
        const userId = req.userId;
        const newConversation = new Conversation({ userId, code, aiResponse });
        await newConversation.save();
        res.status(200).json({ message : "Conversation addes successfully" });
    } catch(error) {
        console.error("Error saving conversation", error);
        res.status(500).json({ message : "Server error" });
    }
});

module.exports = router;