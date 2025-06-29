const express = require('express');
const router = express.Router();

const { getAllJobs, addJob, updateJob, deleteJob, getJobById } = require('../controllers/admin');
const { isAuthorized } = require('../Middlewares/auth');

router.get("/all-jobs", getAllJobs);
router.get("/:id", getJobById);
router.post("/add-job", isAuthorized, addJob);
router.put("/:jobId", isAuthorized, updateJob);
router.delete("/:jobId", isAuthorized, deleteJob);

module.exports = router;