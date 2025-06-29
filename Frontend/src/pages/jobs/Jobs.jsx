import React, { useContext } from 'react';
import { JobContext } from '../../context/JobContext';
import JobCard from '../../components/ui/JobCard'; // Adjust the path based on your file structure

export default function Jobs() {
    const { gettingJobs, jobs } = useContext(JobContext);

    return (
        <div className='min-h-screen w-full max-w-7xl mx-auto p-4 mb-8'>
            <div className='text-sm text-gray-600 bg-green-100 border-b border-green-300 p-2'>
                Note :- These are the dummy jobs created by Team HireMate for Your Practice.
            </div>

            <h2 className='text-3xl font-bold text-gray-800 mt-6 mb-2'>Available Jobs</h2>
            <p className='text-gray-600 mb-6 text-lg'>
                Explore job opportunities and prepare for your interviews
            </p>

            {gettingJobs ? (
                <p className='text-center text-gray-600'>Fetching Jobs...</p>
            ) : jobs.length === 0 ? (
                <p className='text-center text-gray-500 mt-10 text-lg'>No jobs available.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {jobs.map((job) => (
                        <JobCard key={job._id} job={job} />
                    ))}
                </div>
            )}
        </div>
    );
}
