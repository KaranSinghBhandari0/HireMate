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
        <div className='max-w-7xl min-h-[50vh] mx-auto p-6 mb-12'>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Interview History</h2>
                    <p className="text-sm text-gray-500">
                        {loading ? 'Loading...' : `${feedbacks.length} interviews completed`}
                    </p>
                </div>
                <Link
                    to='/jobs'
                    className="bg-green-500 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                    Practice New Interview
                </Link>
            </div>

            {loading ? (
                <div className="text-gray-600 text-center">Fetching interviews...</div>
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
