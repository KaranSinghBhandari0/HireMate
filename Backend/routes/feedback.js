const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../Middlewares/auth');

const { saveFeedback, getUserFeedbacks, getFeedbackById } = require('../controllers/feedback');

router.post("/save", isAuthenticated, saveFeedback );
router.get("/user-feedbacks", isAuthenticated, getUserFeedbacks );
router.get("/:id", isAuthenticated, getFeedbackById );

module.exports = router;