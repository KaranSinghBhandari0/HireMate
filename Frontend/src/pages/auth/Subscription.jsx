import React, { useContext } from 'react';
import { BadgeCheck, Clock, XCircle } from 'lucide-react';
import Pricing from '../../components/sections/Pricing';
import { AuthContext } from '../../context/AuthContext';
import { formatToDDMMYY } from '../../utils/formatDate';

export default function Subscription() {
    let user = useContext(AuthContext);
    const pastPlans = [];

    user = user?.user || {};

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Subscription</h1>

            {/* Current Plan */}
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 mb-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <BadgeCheck className="text-green-600" size={20} />
                    Current Subscription
                </h2>

                <div className="space-y-2">
                    <p className="text-gray-700">
                        <span className="font-medium">Plan:</span> Free Tier
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Status:</span> Active
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Renew Date:</span>{' '}
                        {user?.tokenUsedAt
                            ? formatToDDMMYY(
                                new Date(user.tokenUsedAt).getTime() + 28 * 24 * 60 * 60 * 1000
                            )
                            : 'Token not used yet'}
                    </p>
                </div>
            </div>

            {/* Pricing Section */}
            <Pricing />

            {/* Past Subscriptions */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <Clock className="text-yellow-600" size={20} />
                    Past Subscriptions
                </h2>

                {pastPlans?.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                        {pastPlans.map((sub, index) => (
                            <li key={index} className="py-3 flex justify-between text-sm text-gray-600">
                                <span>
                                    <strong>{sub.name}</strong> — {sub.status}
                                </span>
                                <span className="text-gray-500">
                                    {new Date(sub.startDate).toLocaleDateString()} →{' '}
                                    {new Date(sub.endDate).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 flex items-center gap-2">
                        <XCircle className="text-red-400" size={18} />
                        No past subscriptions found.
                    </p>
                )}
            </div>
        </div>
    );
}
