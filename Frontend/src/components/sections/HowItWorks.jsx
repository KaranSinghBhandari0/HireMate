import { useState } from "react";
import { Play } from 'lucide-react';

export default function HowItWorks() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="min-h-[calc(100vh-64px)] py-16 px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    How <span className='text-green-500'>HireMate</span> Works
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our AI-powered platform provides a comprehensive interview preparation experience
                    <span className="block">tailored to your specific needs and industry</span>
                </p>
            </div>

            {/* Video Playbar Section */}
            <div className="max-w-4xl mx-auto mb-20">
                <div className="bg-gray-200 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden">
                    {!isPlaying ? (
                        <>
                            {/* Video Placeholder Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center">
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors"
                                >
                                    <Play size={24} className="ml-1" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <video
                            className="absolute inset-0 w-full h-full object-cover rounded-xl"
                            controls
                            autoPlay
                        >
                            <source src="/demo.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
            </div>

            {/* Steps Section */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Step 1 */}
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">
                        1
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Select Your Job Role</h3>
                    <p className="text-gray-600">
                        Choose from hundreds of job positions and seniority levels to get tailored interview questions
                    </p>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">
                        2
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice with AI</h3>
                    <p className="text-gray-600">
                        Engage in realistic mock interviews with our AI interviewer that adapts to your responses
                    </p>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="bg-green-100 text-green-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6">
                        3
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Detailed Feedback</h3>
                    <p className="text-gray-600">
                        Receive personalized insights and improvement suggestions after each practice interview
                    </p>
                </div>
            </div>
        </div>
    );
};