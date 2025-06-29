import { Mic, BarChart2, Briefcase, Calendar, AlertCircle, Clock, } from "lucide-react";

export default function Features() {
    const features = [
        {
            title: "Realistic AI Interviews",
            description: "Practice with our lifelike AI interviewer that asks relevant questions.",
            icon: <Mic className="w-5 h-5 text-blue-600" />,
            bg: "bg-blue-100",
        },
        {
            title: "Behavioral Analysis",
            description: "Get insights on your communication skills and confidence level.",
            icon: <BarChart2 className="w-5 h-5 text-green-600" />,
            bg: "bg-green-100",
        },
        {
            title: "Industry-Specific Questions",
            description: "Thousands of questions for different industries and roles.",
            icon: <Briefcase className="w-5 h-5 text-purple-600" />,
            bg: "bg-purple-100",
        },
        {
            title: "Interview Scheduling",
            description: "Set up practice sessions and track your progress.",
            icon: <Calendar className="w-5 h-5 text-yellow-600" />,
            bg: "bg-yellow-100",
        },
        {
            title: "Instant AI Feedback",
            description: "Personalized feedback on your responses and delivery.",
            icon: <AlertCircle className="w-5 h-5 text-red-600" />,
            bg: "bg-red-100",
        },
        {
            title: "Time Management",
            description: "Learn to deliver concise responses within time limits.",
            icon: <Clock className="w-5 h-5 text-indigo-600" />,
            bg: "bg-indigo-100",
        },
    ];

    // Step 2: Return JSX
    return (
        <div className="min-h-[calc(100vh-64px)] bg-green-50 py-12 px-4 flex flex-col items-center justify-center">
            <div className="max-w-4xl mx-auto w-full">
                {/* Header */}
                <header className="text-center mb-12 max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Packed With <span className="text-green-500">Powerful Features</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        HireMate combines cutting-edge AI technology with expert interview knowledge
                        to give you the edge in your job search
                    </p>
                </header>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center mb-3">
                                <div className={`${feature.bg} p-2 rounded-lg mr-4`}>
                                    {feature.icon}
                                </div>
                                <h2 className="text-lg font-semibold text-gray-800">{feature.title}</h2>
                            </div>
                            <p className="text-gray-600 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
