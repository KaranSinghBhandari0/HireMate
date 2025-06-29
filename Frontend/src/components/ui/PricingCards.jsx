import React from 'react';
import { Check, Zap, Rocket, Briefcase, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function PricingCards() {
    const tiers = [
        {
            icon: <Zap className="w-6 h-6 text-green-500 mr-2" />,
            title: "Free",
            description: "Perfect for getting started",
            price: "$0",
            note: "forever",
            features: [
                "1 AI mock interviews per month",
                "Basic job roles library",
                "Standard AI feedback",
                "Limited question bank"
            ],
            buttonText: "Start Free",
            buttonStyle: "bg-green-500 hover:bg-green-600 text-white",
        },
        {
            icon: <Briefcase className="w-6 h-6 text-green-500 mr-2" />,
            title: "Student",
            description: "For serious job seekers",
            price: "$7",
            note: "per month",
            features: [
                "Apply to actual Jobs",
                "5 AI mock interviews per month",
                "Full job roles library",
                "Advanced AI feedback",
                "Complete question bank",
                "Progress tracking"
            ],
            buttonText: "Get Student",
            buttonStyle: "bg-green-500 hover:bg-green-600 text-white",
            tag: "POPULAR"
        },
        {
            icon: <Rocket className="w-6 h-6 text-green-500 mr-2" />,
            title: "Pro",
            description: "For serious job seekers",
            price: "$13",
            note: "per month",
            features: [
                "Apply to actual Jobs",
                "10 AI mock interviews per month",
                "Full job roles library",
                "Advanced AI feedback",
                "Complete question bank",
                "Progress tracking"
            ],
            buttonText: "Get Pro",
            buttonStyle: "bg-green-500 hover:bg-green-600 text-white",
        },
        {
            icon: <Users className="w-6 h-6 text-green-500 mr-2" />,
            title: "Enterprise",
            description: "For large organizations",
            price: "$99",
            note: "per month",
            features: [
                "50 Candidate interviews",
                "Advanced analytics & insights",
                "Custom integrations",
                "White-label solution",
                "Priority support",
                "Training & onboarding",
                "SLA guarantees"
            ],
            buttonText: "Contact Sales",
            buttonStyle: "bg-gray-800 hover:bg-gray-700 text-white",
            comingSoon: true
        },
    ];

    return (
        <div className="pt-6 px-4 sm:px-6 lg:px-8 text-sm">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {tiers.map((tier) => (
                        <div
                            key={tier.title}
                            className={`flex flex-col justify-between bg-white rounded-xl shadow-lg overflow-hidden border ${
                                tier.title === "Student"
                                    ? "border-gray-200 hover:border-green-400"
                                    : "border-gray-200 hover:border-green-300"
                            } relative transition-all`}
                        >
                            {tier.comingSoon && (
                                <div className="absolute top-4 right-4 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">
                                    COMING SOON
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    {tier.icon}
                                    <h3 className="text-xl font-bold text-gray-800">{tier.title}</h3>
                                    {tier.tag && (
                                        <span className="ml-auto bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                            {tier.tag}
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 mb-6">{tier.description}</p>

                                <div className="mb-6">
                                    <span className="text-3xl font-bold text-gray-900">{tier.price}</span>
                                    <span className="text-gray-500"> {tier.note}</span>
                                </div>

                                <ul className="space-y-3">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="px-6 pb-6 mt-4">
                                <button
                                    className={`w-full ${tier.buttonStyle} font-medium py-2 px-4 rounded-lg transition-colors`}
                                    onClick={() => toast.error('feature coming soon')}
                                >
                                    {tier.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
