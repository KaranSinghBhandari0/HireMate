import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="px-4 py-12 flex flex-col items-center justify-center">
            <img
                src="/page-not-found.png"
                alt="Page Not Found"
                className="w-64 h-64 mb-6"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Oops! Page not found
            </h1>
            <p className="text-gray-600 text-center max-w-md mb-6">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                to="/"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}
