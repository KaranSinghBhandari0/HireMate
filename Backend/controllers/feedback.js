const Feedback = require('../models/Feedback');

const saveFeedback = async (req, res) => {
    try {
        const { job, feedback } = req.body;
        const user = req.user;

        if(!job || !feedback) {
            return res.status(400).json({ message: "Job and feedback are required." });
        }

        // updating user token
        user.tokens = user.tokens - 1;
        user.tokenUsedAt = new Date();
        await user.save();

        const jobData = {
            _id: job._id,
            company: job.company,
            companyLogo: job.companyLogo,
            title: job.title,
            role: job.role,
            salary: job.salary,
            location: job.location,
        };

        const newFeedback = new Feedback({
            userId: req.user._id,
            job: jobData,
            rating: feedback.rating,
            summary: feedback.summary,
            recommendation: feedback.recommendation,
            recommendationMsg: feedback.recommendationMsg,
        });
        await newFeedback.save();

        return res.status(200).json({ message: "Feedback saved successfully", feedback: newFeedback, user });
    } catch (error) {
        console.error("Error saving feedback:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getUserFeedbacks = async (req, res) => {
    try {
        const userId = req.user._id;

        const feedbacks = await Feedback.find({ userId }).sort({ createdAt: -1 })

        return res.status(200).json({ message: "feedback fetched successfully", feedbacks});
    } catch (error) {
        console.error("❌ Error fetching user feedbacks:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if(!feedback) {
            return res.status(404).json({ message: 'feedback not found' });
        }
        res.status(200).json({ message: 'feedback fetched successfully', feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { saveFeedback, getUserFeedbacks, getFeedbackById };