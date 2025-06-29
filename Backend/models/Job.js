const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    companyLogo: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    experience: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    postedOn: {
        type: Date,
        default: Date.now,
    },
    salary: {
        type: String,
        required: true,
        trim: true,
    },
    requirements: {
        type: [String],
        default: [],
    },
    responsibilities: {
        type: [String],
        default: [],
    }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;