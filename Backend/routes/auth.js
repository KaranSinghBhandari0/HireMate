const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Middlewares/auth');
const multer = require('multer');
const path = require("path");

// Multer config
const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".webp") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    },
});

const { signup, login, logout, checkAuth, updateProfile, sendOtp, verifyOtp } = require('../controllers/auth');

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkAuth", isAuthenticated, checkAuth);
router.put("/update-profile", isAuthenticated, upload.single('image'), updateProfile);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;