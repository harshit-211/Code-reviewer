const express = require("express");
const router = express.Router();

const { Conversation } = require("../database/index");
const authMiddleware = require("../middleware/authorization");

router.get("/all/conversations/:userId", authMiddleware, async(req, res) => {
    try {
        const { userId } = req.params;
        const allConversations = await Conversation.find({ userId }).sort({ createdAt : -1 });
        res.status(200).json({ allConversations });
    } catch(error) {
        res.status(500).json({ message : "Failed to fetch conversations", details : error.message });
    }
}); 

module.exports = router;