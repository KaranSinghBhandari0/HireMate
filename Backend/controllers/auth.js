const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OTP = require("../models/OTP");
const User = require("../models/User");
const cloudinary = require("../lib/cloudConfig");
const transporter = require('../lib/transporter');
const { cookieOptions, autoRenewalToken, clean, profileValidations, signupValidations } = require('../lib/helper');

const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        // Store token in cookie
        res.cookie("token", token, cookieOptions);

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    res.status(200).json({ message: "logout successfull" });
};

const checkAuth = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        // Token renewal logic
        autoRenewalToken(user);

        const { password, ...userWithoutPassword } = user._doc;
        res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        let { firstName, lastName, phoneNumber, dob, experience, role, address, resume, github, linkedIn, twitter, leetcode, } = req.body;

        // Clean all fields
        firstName = clean(firstName);
        lastName = clean(lastName);
        phoneNumber = clean(phoneNumber);
        dob = clean(dob);
        role = clean(role);
        address = clean(address);
        resume = clean(resume);
        github = clean(github);
        linkedIn = clean(linkedIn);
        twitter = clean(twitter);
        leetcode = clean(leetcode);
        experience = clean(experience);

        if (experience !== null) experience = Number(experience);

        // Validations
        const error = profileValidations({ firstName, phoneNumber, dob, experience });
        if (error) {
            return res.status(400).json({ message: error });
        }

        // Image upload if file is present
        let image = user.image;
        let cloudinary_id = user.cloudinary_id;

        if (req.file) {
            if (cloudinary_id) {
                await cloudinary.uploader.destroy(cloudinary_id);
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            image = result.secure_url;
            cloudinary_id = result.public_id;
        }

        // Update fields
        const updateFields = {
            firstName, lastName, phoneNumber, dob, experience, role, address, resume,
            socials: {
                github,
                linkedIn,
                twitter,
                leetcode,
            },
            ...(req.file && { image, cloudinary_id }),
        };

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const sendOtp = async (req,res) => {
    try {
        let { email, firstName, lastName, password } = req.body;

        if(!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const error = await signupValidations(req.body);    // Cheking signup Validations
        if(error) {
            return res.status(400).json({ message: error });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

        await OTP.deleteMany({ email });    // Remove existing OTPs for this email

        const hashedPassword = await bcrypt.hash(password, 10); 

        await OTP.create({ 
            email, 
            otp,
            signupData : {
                firstName,
                lastName,
                password: hashedPassword
            }
        });

        // Send email
        await transporter.sendMail({
            from: `"HireMentis" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
        });

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return res.status(500).json({ message: "Failed to send OTP" });
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if(!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const otpRecord = await OTP.findOne({ email, otp });
        if(!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const { firstName, lastName, password } = otpRecord.signupData;

        // Create actual user
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
        });

        // Generate JWT token & store in cookies
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, cookieOptions);

        await OTP.deleteMany({ email }); // Clean used OTP

        return res.status(200).json({ message: "Signup successful", user: newUser });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Failed to verify OTP" });
    }
};

const reSendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Check if OTP record exists
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({ message: "Session timed out. Please sign up again." });
        }

        // Generate a new OTP
        const newOtp = Math.floor(1000 + Math.random() * 9000).toString();

        // Update OTP record
        otpRecord.otp = newOtp;
        await otpRecord.save();

        // Send new OTP email
        await transporter.sendMail({
            from: `"HireMentis" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Your New OTP Code",
            text: `Your new OTP code is ${newOtp}. It will expire in 5 minutes.`,
        });

        return res.status(200).json({ message: "New OTP sent successfully" });
    } catch (error) {
        console.error("Error resending OTP:", error);
        return res.status(500).json({ message: "Failed to resend OTP" });
    }
};

module.exports = { login, logout, checkAuth, updateProfile, sendOtp, verifyOtp, reSendOtp };
