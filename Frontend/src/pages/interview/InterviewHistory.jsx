import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FeedbackContext } from '../../context/FeedbackContext';
import FeedbackCard from '../../components/ui/FeedbackCard';

export default function InterviewHistory() {
    const { feedbacks, getFeedbacks } = useContext(FeedbackContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        setLoading(true);
        await getFeedbacks();
        setLoading(false);
    };

    return (
        <div className="max-w-7xl min-h-[50vh] mx-auto px-4 sm:px-6 py-6 mb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Interview History
                    </h2>
                    <p className="text-sm text-gray-500">
                        {loading ? 'Loading...' : `${feedbacks.length} interviews completed`}
                    </p>
                </div>
                <Link
                    to="/jobs"
                    className="w-full sm:w-auto bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-center"
                >
                    Practice New Interview
                </Link>
            </div>

            {/* Content */}
            {loading ? (
                <div className="text-gray-600 text-center">Fetching interviews...</div>
            ) : feedbacks.length === 0 ? (
                <div className="text-gray-500 text-center mt-12">
                    No interviews found. <br />
                    <Link to="/jobs" className="text-green-600 underline hover:text-green-800">
                        Start a new one now!
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {feedbacks.map((feedback) => (
                        <FeedbackCard key={feedback._id} feedback={feedback} />
                    ))}
                </div>
            )}
        </div>
    );
}
