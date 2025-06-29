import React, { useContext, useState } from "react";
import { JobContext } from "../../context/JobContext";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import MultiInput from "../../components/common/MultiInput";
import Button from "../../components/common/Button";

export default function AddJob() {
    const { addJob } = useContext(JobContext);

    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState({
        title: "",
        company: "",
        companyLogo: "",
        location: "",
        description: "",
        experience: "",
        role: "",
        postedOn: new Date().toDateString(),
        salary: "",
        requirements: [""],
        responsibilities: [""],
    });

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
        await addJob(job);
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Job</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Input Fields */}
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

                {/* Job Description */}
                <TextArea
                    label="Job Description"
                    name="description"
                    value={job.description}
                    onChange={handleChange}
                    required
                    rows={4}
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
                            loaderText="Adding Job..."
                            className="px-4"
                        >
                            Add Job
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
