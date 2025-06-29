import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const navigate = useNavigate();

    const [jobs, setJobs] = useState([]);
    const [gettingJobs, setGettingJobs] = useState(false);

    // Auto-fetch jobs
    useEffect(() => {
        getAllJobs();
    }, []);

    // GET ALL JOBS
    const getAllJobs = async () => {
        try {
            setGettingJobs(true);
            const res = await axiosInstance.get('/job/all-jobs');
            setJobs(res.data.jobs);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to fetch jobs");
        } finally {
            setGettingJobs(false);
        }
    };

    // GET ALL JOBS
    const getJobById = async (id) => {
        try {
            const res = await axiosInstance.get(`/job/${id}`);
            return res.data.job;
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to fetch job data");
        }
    };

    // ADD JOB
    const addJob = async (jobData) => {
        try {
            const res = await axiosInstance.post('/job/add-job', jobData);
            toast.success(res.data.message || "Job added successfully");
            await getAllJobs();
            navigate(`/job/${res.data.job._id}`);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to add job");
        }
    };

    // UPDATE JOB
    const updateJob = async (id, jobData) => {
        try {
            const res = await axiosInstance.put(`/job/${id}`, jobData);
            toast.success(res.data.message || "Job updated");
            await getAllJobs();
            navigate(`/job/${id}`);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    };

    // DELETE JOB
    const deleteJob = async (id) => {
        try {
            const res = await axiosInstance.delete(`/job/${id}`);
            toast.success(res.data.message || "Job deleted");
            await getAllJobs();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    return (
        <JobContext.Provider
            value={{
                getAllJobs, jobs, gettingJobs,
                getJobById,
                addJob,
                updateJob,
                deleteJob,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};