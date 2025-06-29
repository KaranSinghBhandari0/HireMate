import React from 'react';
import { Link } from 'react-router-dom';
import { formatToDDMMYY } from '../../utils/formatDate';

export default function JobCard({ job }) {
    return (
        <div className='bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-6 space-y-4'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <img
                        src={job.companyLogo}
                        alt={job.company}
                        className='w-8 h-8 object-contain p-1'
                    />
                    <div>
                        <h3 className='text-base font-bold text-gray-900'>{job.company}</h3>
                        <p className='text-xs text-gray-500'>Posted on : 
                            {job.postedOn ? formatToDDMMYY(new Date(job.postedOn)) : 'N/A'} 
                        </p>
                    </div>
                </div>
                <span className='text-xs font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded-md'>
                    {job.location}
                </span>
            </div>

            <div className='space-y-1'>
                <h4 className='text-lg font-semibold text-gray-800'>
                    {job.title}
                </h4>
                <span className='inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded'>
                    {job.role}
                </span>
            </div>

            <p className='text-sm text-gray-600 line-clamp-2'>{job.description}</p>

            <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
                <span className='text-sm text-gray-500'>Experience: {job.experience}</span>
                <Link to={`/job/${job._id}`} className='text-sm font-semibold text-green-500 hover:underline'>
                    Apply Now
                </Link>
            </div>
        </div>
    );
}
