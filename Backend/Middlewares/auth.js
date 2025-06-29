const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }

        // not selecting the user password in user
        const user = await User.findById(decoded.id).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in isAuthenticated middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const isAuthorized = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if(!token) {
            return res.status(401).json({ message: "login to continue" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.id !== process.env.ADMIN_ID) {
            return res.status(401).json({ message: "Access Denied !" });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        console.log("Error in Authorization middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {isAuthenticated, isAuthorized}