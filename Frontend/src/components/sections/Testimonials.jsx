import { Star } from "lucide-react";
import { testimonials } from "../../utils/SampleTestimonials";

export default function Testimonials() {
    return (
        <div className="bg-green-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <header className="text-center mb-12 max-w-2xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Our Users <span className='text-green-500'>Love the Results</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Thousands of job seekers have successfully prepared for their interviews with our platform
                    </p>
                </header>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((t, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between border border-gray-100 hover:border-green-400 transition-all"
                        >
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-sm mb-6">“{t.message}”</p>
                            <div className="flex items-center space-x-4 mt-auto">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
