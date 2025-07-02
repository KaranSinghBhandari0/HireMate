import React from "react";
import { X } from "lucide-react";

export default function InterviewInstructions({
    setReadInstructions,
    jobTitle,
    company,
}) {
    const handleStart = () => {
        setReadInstructions(true);
        scrollTo({ top: 0, behavior: "smooth" });
    };

    const beforeYouStart = [
        "Test your microphone and camera functionality",
        "Find a quiet, well-lit space with stable internet connection",
        "Have your resume and job description readily available",
        "Prepare examples of your key achievements and experiences",
        "Research the company and role thoroughly",
    ];

    const duringTheInterview = [
        "Ensure your device microphone and camera are working properly for clear audio and video quality.",
        "Speak clearly and at a moderate pace, maintaining good eye contact with the camera.",
        "Position yourself in a well-lit, quiet environment with minimal background distractions.",
        "Listen carefully to each question and take a moment to think before responding.",
        "Structure your answers using the STAR method (Situation, Task, Action, Result) for behavioral questions.",
        "Emphasize skills and experiences directly relevant to the Frontend Developer role and Technology industry.",
        "Ask thoughtful questions about the company culture, team dynamics, and growth opportunities.",
        "Maintain professional body language and dress appropriately for the role.",
        "If you don't understand a question, politely ask for clarification rather than guessing.",
        "End each answer with confidence and be prepared to elaborate if asked follow-up questions.",
    ];

    return (
        <div className="min-h-screen bg-white flex justify-center items-center px-4 py-6 sm:px-6 overflow-y-auto">
            <div className="bg-white shadow-xl rounded-xl w-full max-w-3xl p-4 sm:p-8">
                {/* Header */}
                <div className="flex justify-between sm:items-center border-b mb-6 gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 pb-1 sm:pb-3">
                        Interview Instructions
                    </h2>
                    <X
                        className="cursor-pointer h-5 w-5 sm:h-6 sm:w-6 text-gray-500 hover:text-gray-800 transition"
                        onClick={() => setReadInstructions(true)}
                    />
                </div>

                {/* Interview Details */}
                <div className="bg-green-100 text-green-900 rounded-md p-4 mb-6 text-sm sm:text-base">
                    <p>
                        <span className="font-semibold">Position:</span>{" "}
                        <span className="font-bold">{jobTitle}</span> at{" "}
                        <span className="font-bold">{company}</span>
                    </p>
                    <p>
                        <span className="font-semibold">Industry:</span> Technology
                    </p>
                </div>

                {/* Before You Start */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                    <h2 className="text-base sm:text-lg font-semibold text-yellow-800 mb-2">
                        Before You Start:
                    </h2>
                    <ol className="list-decimal list-inside space-y-1 text-yellow-900 text-sm sm:text-base">
                        {beforeYouStart.map((item, index) => (
                            <li key={index} className="mb-1">
                                {item}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* During the Interview */}
                <div className="mb-6">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                        During the Interview:
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                        {duringTheInterview.map((item, index) => (
                            <li key={index} className="mb-1">
                                {item}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Reminder Box */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded text-sm sm:text-base">
                    <p className="text-blue-700">
                        <span className="font-semibold">Remember:</span> This is a practice
                        session. Use it to refine your responses and build confidence for
                        your actual interview.
                    </p>
                </div>

                {/* Footer */}
                <div className="text-center text-gray-700 font-medium mb-6 text-sm sm:text-base">
                    All the best for your Interview.{" "}
                    <span className="text-gray-500">by Team HireMate</span>
                </div>

                {/* Start Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleStart}
                        className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-200"
                    >
                        Got it, Let’s Start!
                    </button>
                </div>
            </div>
        </div>
    );
}
