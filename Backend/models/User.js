const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        trim: true,
    },
    image: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
    },
    experience: {
        type: Number,
        min: [0, "Experience must be a positive number"],
        default: 0,
    },
    dob: {
        type: Date,
        default: null,
    },
    tokens: {
        type: Number,
        default: 1,
    },
    tokenUsedAt: {
        type: Date,
        default: null,
    },
    socials: {
        github: {
            type: String,
            default: "",
            trim: true,
        },
        linkedIn: {
            type: String,
            default: "",
            trim: true,
        },
        twitter: {
            type: String,
            default: "",
            trim: true,
        },
        leetcode: {
            type: String,
            default: "",
            trim: true,
        },
    },
    resume: {
        type: String,
        trim: true,
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
