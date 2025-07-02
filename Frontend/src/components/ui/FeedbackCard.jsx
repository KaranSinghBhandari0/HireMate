import { CalendarDays, Briefcase, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeedbackCard({ feedback }) {
    const { _id, createdAt, rating, job } = feedback;

    const averageScore = (
        (rating.technicalSkills +
            rating.communication +
            rating.problemSolving +
            rating.experience) / 4
    ).toFixed(1);

    return (
        <Link
            to={`/feedback/${_id}`}
            className="bg-gray-50 p-4 rounded-lg border hover:shadow-sm flex items-center justify-between transition"
        >
            <div className="flex items-start gap-4">
                <Briefcase size={20} className="text-gray-500 mt-1" />
                <div className='w-full'>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm sm:text-base text-gray-800">
                            {job?.title || "Untitled Role"}
                        </p>
                        <span className="bg-orange-400 text-xs px-2 py-0.5 rounded-full text-gray-800">
                            {job?.company || "Unknown Company"}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-2 gap-2">
                        <CalendarDays size={16} />
                        {new Date(createdAt).toLocaleDateString()}
                        <span className="ml-3 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            Score: {averageScore} / 10
                        </span>
                    </div>
                </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
        </Link>
    );
}