const Job = require('../models/Job');

const addJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(200).json({ message: 'Job created successfully', job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedOn: -1 });
        res.status(200).json({ message: 'Jobs fetched successfully', jobs });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if(!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job fetched successfully', job });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
        if(!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const deleted = await Job.findByIdAndDelete(jobId);
        if(!deleted) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addJob, getAllJobs, getJobById, updateJob, deleteJob, };
