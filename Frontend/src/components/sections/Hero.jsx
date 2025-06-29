import { ArrowRight, ChevronRight, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-green-100 to-white flex flex-col items-center justify-center">
            <div className='text-sm bg-green-500 text-white rounded-2xl px-3 py-1 mt-6 flex items-center gap-2 shadow-lg animate-fade-in'>
                <Flame size={16} />
                Practice. Improve. Crack It.
            </div>

            <div className="text-center px-4 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl font-bold mt-8 leading-tight">
                    Ace Your Next Interview with
                </h1>
                <h2 className="text-4xl sm:text-5xl font-bold text-green-600 mt-2 leading-tight">
                    AI-Powered Practice
                </h2>

                <p className="text-md sm:text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
                    Prepare for any job interview with personalized AI feedback, realistic mock interviews,
                    and expert-curated questions tailored to your industry.
                </p>
            </div>

            <div className='flex items-center gap-4 mt-8'>
                <Link to='/jobs' className='bg-green-500 text-white px-6 py-2 rounded-md flex items-center gap-2'>
                    Get Started <ArrowRight size={16} />
                </Link>
                <a href='#how-it-works' className='border border-green-500 text-green-500 px-4 py-2 rounded-md hover:bg-green-100'>
                    Watch Demo
                </a>
            </div>

            {/* TrustBadge */}
            <div className="pt-8 mt-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center gap-6">
                            {/* User avatars */}
                            <div className="flex items-center space-x-4">
                                <div className="flex -space-x-2">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">JF</div>
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium">SK</div>
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">KF</div>
                                    <div className="w-10 h-10 rounded-full bg-orange-300 flex items-center justify-center text-purple-600 font-medium">KF</div>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm">Trusted by <b>100+</b> job seekers</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
