const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    job: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
        company: {
            type: String,
        },
        companyLogo: {
            type: String,
        },
        title: {
            type: String,
        },
        role: {
            type: String,
        },
        salary: {
            type: String,
        },
        location: {
            type: String,
        }
    },

    rating: {
        technicalSkills: {
            type: Number,
        },
        communication: {
            type: Number,
        },
        problemSolving: {
            type: Number,
        },
        experience: {
            type: Number,
        }
    },

    summary: {
        type: [String],
    },

    recommendation: {
        type: String,
    },

    recommendationMsg: {
        type: String,
    },

    createdAt: { 
        type: Date, 
        default: Date.now,
    },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
