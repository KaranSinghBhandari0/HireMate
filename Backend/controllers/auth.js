const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const cloudinary = require("../lib/cloudConfig");
const transporter = require('../lib/transporter');

// ------- Helper Functions -------

// cookies option
const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Token renewal logic
const autoRenewalToken = async (user) => {
    const MILLISECONDS_IN_28_DAYS = 28 * 24 * 60 * 60 * 1000;

    if (user.tokens === 0 && user.tokenUsedAt) {
        const timePassed = Date.now() - new Date(user.tokenUsedAt).getTime();
        if (timePassed >= MILLISECONDS_IN_28_DAYS) {
            user.tokens = 1;
            user.tokenUsedAt = null;
            await user.save();
        }
    }
}

// Clean helper
const clean = (val) => {
    if (val === undefined || val === null) return null;
    if (typeof val === "string") {
        const trimmed = val.trim();
        return trimmed === "" || trimmed === "null" || trimmed === "undefined"
            ? null
            : trimmed;
    }
    return val;
};

// Validation helper
const checkValidations = ({ firstName, phoneNumber, dob, experience }) => {
    if (!firstName) {
        return "First name cannot be empty";
    }
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
        return "Invalid phone number";
    }
    if (dob && new Date(dob) > new Date()) {
        return "Date of birth cannot be in the future";
    }
    if (experience !== null && (isNaN(experience) || Number(experience) < 0)) {
        return "Experience must be a non-negative number";
    }
    return null;
};


// ------- Controller Functions -------
const signup = async (req, res) => {
    try {
        let { firstName, lastName, email, password, confirmPassword } = req.body;
        // Trim input values
        firstName = firstName.trim();
        lastName = lastName.trim();
        email = email.trim();
        password = password.trim();
        confirmPassword = confirmPassword.trim();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Check if passwords match
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must contains atleast 6 characters" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({ message: "Password & confirm password must match" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Store token in cookie
        res.cookie("token", token, cookieOptions);

        res.status(200).json({ message: "Signup successful", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP

        // Remove existing OTPs for this email
        await OTP.deleteMany({ email });

        // Save to DB
        await OTP.create({ email, otp });

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
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // OTP is valid
        await OTP.deleteMany({ email }); // remove used OTPs

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Failed to verify OTP" });
    }
};

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
        const error = checkValidations({ firstName, phoneNumber, dob, experience });
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

module.exports = { signup, login, logout, checkAuth, updateProfile, sendOtp, verifyOtp };
