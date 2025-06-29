import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <div className="text-center py-16 px-4 bg-white">
            <header className="max-w-2xl mx-auto mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Ready to Ace <span className="text-green-500">Your Next Interview?</span>
                </h1>
                <p className="text-lg text-gray-600">
                    Join thousands of successful candidates who have transformed their interview skills with <span className="font-medium text-gray-800">HireMate</span>.
                </p>
            </header>

            <Link
                to="/jobs"
                className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors font-medium text-sm md:text-base"
            >
                Start Practicing
            </Link>

            <p className="text-gray-600 mt-4 text-sm">No credit card required</p>
        </div>
    );
};

export default CTASection;