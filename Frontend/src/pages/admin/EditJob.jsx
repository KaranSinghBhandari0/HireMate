import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JobContext } from "../../context/JobContext";
import Loader from "../../components/common/Loader";
import ItemNotFound from "../../components/ui/ItemNotFound";
import Input from "../../components/common/Input";
import MultiInput from "../../components/common/MultiInput";
import Button from "../../components/common/Button";

export default function EditJob() {
    const { updateJob, getJobById } = useContext(JobContext);
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [fetchingJob, setFetchingJob] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchJob(jobId);
    }, [jobId]);

    const fetchJob = async (id) => {
        setFetchingJob(true);
        const res = await getJobById(id);
        setJob(res);
        setFetchingJob(false);
    };

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleListChange = (e, index, field) => {
        const updatedList = [...job[field]];
        updatedList[index] = e.target.value;
        setJob({ ...job, [field]: updatedList });
    };

    const addToList = (field) => {
        setJob({ ...job, [field]: [...job[field], ""] });
    };

    const removeFromList = (field, index) => {
        const updatedList = [...job[field]];
        updatedList.splice(index, 1);
        setJob({ ...job, [field]: updatedList });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await updateJob(jobId, job);
        setLoading(false);
    };

    if(fetchingJob) {
        return <Loader text="Loading job details..." />;
    }

    if(!job) {
        return <ItemNotFound text="Job not found" />;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Job</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        label="Job Title"
                        name="title"
                        value={job.title}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Company"
                        name="company"
                        value={job.company}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Company Logo URL"
                        name="companyLogo"
                        value={job.companyLogo}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Location"
                        name="location"
                        value={job.location}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Experience (e.g. 0-2 years)"
                        name="experience"
                        value={job.experience}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Role (e.g. Full-Time)"
                        name="role"
                        value={job.role}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Salary"
                        name="salary"
                        value={job.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Description */}
                <Input
                    label="Job Description"
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    required
                    as="textarea"
                    rows={4}
                    inputClassName="w-full text-sm p-3 border border-gray-300 rounded-md"
                />

                {/* Requirements */}
                <MultiInput
                    label="Requirements"
                    name="requirements"
                    values={job.requirements}
                    onChange={(e, i) => handleListChange(e, i, "requirements")}
                    onAdd={() => addToList("requirements")}
                    onRemove={(i) => removeFromList("requirements", i)}
                    placeholder="Requirement"
                    required
                />

                {/* Responsibilities */}
                <MultiInput
                    label="Responsibilities"
                    name="responsibilities"
                    values={job.responsibilities}
                    onChange={(e, i) => handleListChange(e, i, "responsibilities")}
                    onAdd={() => addToList("responsibilities")}
                    onRemove={(i) => removeFromList("responsibilities", i)}
                    placeholder="Responsibility"
                    required
                />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <div className="w-fit">
                        <Button
                            type="submit"
                            loading={loading}
                            loaderText="Updating Job..."
                            className="px-4"
                        >
                            Update Job
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
