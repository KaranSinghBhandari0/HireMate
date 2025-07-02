import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BadgeCheck, Briefcase, XCircle } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Loader from '../../components/common/Loader';
import { FeedbackContext } from '../../context/FeedbackContext';

export default function Feedback() {
    const { id } = useParams();
    const { getFeedbackById } = useContext(FeedbackContext);

    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch();
    }, [id]);

    const fetch = async () => {
        setLoading(true);
        const res = await getFeedbackById(id);
        setFeedback(res);
        setLoading(false);
    };

    const getColor = (score) => {
        if (score >= 7) return '#16a34a'; // green
        if (score >= 4) return '#f59e0b'; // amber
        return '#dc2626'; // red
    };

    if(loading || !feedback) {
        return (
            <Loader text="Fetching feedback..." />
        );
    }

    function RenderScoreCard() {
        return (
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Skill Scorecard</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {Object.entries(feedback.rating).map(([skill, score]) => (
                        <div key={skill} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg border shadow-sm">
                            <div className="w-20 h-20 mb-2">
                                <CircularProgressbar
                                    value={score}
                                    maxValue={10}
                                    text={`${score}`}
                                    styles={buildStyles({
                                        textSize: '24px',
                                        pathColor: getColor(score),
                                        textColor: '#374151',
                                        trailColor: '#e5e7eb',
                                    })}
                                />
                            </div>
                            <p className="text-sm text-gray-600 capitalize mt-2 font-medium">{skill}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function RenderRecommendation() {
        return (
            <div
                className={`p-6 rounded-xl shadow-md border transition-all ${feedback.recommendation === "Recommended"
                    ? "bg-gradient-to-r from-green-100 to-blue-100"
                    : "bg-gradient-to-r from-red-100 to-yellow-100"
                    }`}
            >
                <div className="flex items-center gap-3 mb-2">
                    {feedback.recommendation === "Recommended" ? (
                        <BadgeCheck className="text-green-600" />
                    ) : (
                        <XCircle className="text-red-500" />
                    )}
                    <h2 className="text-xl font-semibold text-gray-900">Recommendation</h2>
                </div>
                <p className={`text-base font-medium ${feedback.recommendation === "Recommended" ? "text-green-800" : "text-red-700"}`}>
                    {feedback.recommendation}
                </p>
                <p className="text-sm text-gray-600 mt-1">{feedback.recommendationMsg}</p>
            </div>
        );
    }

    function RenderSummary() {
        return (
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Summary</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {feedback.summary.map((point, idx) => (
                        <li key={idx}>{point}</li>
                    ))}
                </ul>
            </div>
        );
    }

    function RenderJobDetails() {
        return (
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Details</h2>
                <div className="flex items-start gap-4">
                    <Briefcase className="text-gray-400 mt-1" />
                    <div className="space-y-1 text-sm">
                        <p><span className="font-medium text-gray-700 mr-2">Role:</span> {feedback.job.title}</p>
                        <p><span className="font-medium text-gray-700 mr-2">Company:</span> {feedback.job.company}</p>
                        <p><span className="font-medium text-gray-700 mr-2">Location:</span> {feedback.job.location}</p>
                        <p><span className="font-medium text-gray-700 mr-2">Salary/Stipend:</span> {feedback.job.salary}</p>
                    </div>
                </div>
                <p className='text-center text-blue-500 hover:underline mt-2'>
                    <Link to={`/job/${feedback.job._id}`}>See more</Link>
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 text-gray-800">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Interview Feedback</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        <span className='mr-1 font-medium'> {feedback.job.title} </span>
                        at
                        <span className='mx-1 font-medium'> {feedback.job.company} </span>
                        • {new Date(feedback.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <img
                        src={feedback.job.companyLogo || '/no-logo.png'}
                        alt="Company Logo"
                        className="w-14 h-14 rounded-lg object-contain shadow"
                    />
                </div>
            </div>

            <RenderRecommendation />
            <RenderSummary />
            <RenderScoreCard />
            <RenderJobDetails />
        </div>
    );
}
