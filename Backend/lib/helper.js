const User = require('../models/User')

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

// Profile Validation helper
const profileValidations = ({ firstName, phoneNumber, dob, experience }) => {
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

// Signup Validations helper
const signupValidations = async (data) => {
    let { firstName, lastName, email, password, confirmPassword } = data;

    // Trim input values
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return "Email already exists!";
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return "Password & confirm password must match"
    }

    // Check if passwords match
    if (password.length < 6) {
        return "Password must contains atleast 6 characters";
    }

    return null;
}

module.exports = { cookieOptions, autoRenewalToken, clean, profileValidations, signupValidations }