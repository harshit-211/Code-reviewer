const jwt = require("jsonwebtoken");

const secret = "bankai";

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token)
        return res.status(401).json({ message : "Unauthorized" });
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        res.status(401).json({ message : "Invalid token" });
    }
};

module.exports = authMiddleware;