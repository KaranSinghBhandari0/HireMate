const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
    },
    otp: {
        type: String,
        required: [true, "OTP is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP expires in 5 minutes (300 seconds)
    },
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;