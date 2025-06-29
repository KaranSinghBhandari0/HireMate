import React, { useContext, useState } from 'react';
import { ChevronRight, Plus, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../context/JobContext';
import AlertBox from '../../components/common/AlertBox';

export default function AdminDashboard() {
    const { jobs, deleteJob } = useContext(JobContext);

    const [showAlertBox, setShowAlertBox] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteClick = (jobId) => {
        setSelectedJobId(jobId);
        setShowAlertBox(true);
    };

    const handleConfirmDelete = async () => {
        setLoading(true);
        await deleteJob(selectedJobId);
        setLoading(false);
        setShowAlertBox(false);
        setSelectedJobId(null);
    };

    const handleCancelDelete = () => {
        setShowAlertBox(false);
        setSelectedJobId(null);
    };

    return (
        <div className='min-h-screen w-full max-w-7xl mx-auto p-4'>
            <AlertBox
                visible={showAlertBox}
                title="Delete Job"
                text="Are you sure you want to delete this job? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Revert"
                confirmColor="red"
                loading={loading}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>
                    All Jobs
                </h1>
                <Link
                    to='/add-job'
                    className='flex items-center gap-2 border border-green-600 bg-green-100 text-green-700 rounded-lg px-3 py-2 text-sm font-medium hover:bg-green-200 transition'
                >
                    <Plus size={16} />
                    Add New Job
                </Link>
            </div>

            <div className='space-y-4 my-8'>
                {jobs.map((job, index) => (
                    <div
                        key={index}
                        className='w-full flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition duration-200'
                    >
                        <Link to={`/job/${job._id}`} className='flex items-center space-x-4'>
                            <img
                                src={job.companyLogo || 'https://via.placeholder.com/50'}
                                alt={job.company}
                                className='w-10 h-10 object-contain rounded'
                            />
                            <div>
                                <h2 className='text-lg font-semibold text-gray-900'>{job.title}</h2>
                                <p className='text-sm text-gray-600'>{job.company}</p>
                                <p className='text-sm text-gray-500'>
                                    <span className='font-medium'>Job ID:</span> {job._id}
                                </p>
                            </div>
                        </Link>

                        <div className='flex items-center gap-3'>
                            <Link
                                to={`/edit-job/${job._id}`}
                                className='flex items-center gap-1 border px-3 py-1.5 rounded-md text-sm text-gray-700 hover:text-green-600 hover:border-green-500 transition'
                            >
                                Edit <ChevronRight size={16} />
                            </Link>
                            <button
                                className='p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition'
                                title='Delete Job'
                                onClick={() => handleDeleteClick(job._id)}
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}