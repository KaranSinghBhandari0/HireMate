import React, { useContext, useState } from 'react';
import { UploadCloud, Save, CodeXml, Loader2, Twitter, GithubIcon, LucideLinkedin } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function ProfileEdit() {
    const { user, updateProfile } = useContext(AuthContext);

    const [imagePreview, setImagePreview] = useState(user.image || '/no-user.png');
    const [loading, setLoading] = useState(false);

    const [profile, setProfile] = useState({
        image: null,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        address: user.address,
        dob: user.dob,
        experience: user.experience || 0,
        role: user.role,
        resume: user.resume,
        github: user.socials.github,
        linkedIn: user.socials.linkedIn,
        twitter: user.socials.twitter,
        leetcode: user.socials.leetcode,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files && files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
            setProfile((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setProfile((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        const fields = ['firstName', 'lastName', 'phoneNumber', 'dob', 'role', 'experience', 'address', 'resume', 'github', 'linkedIn', 'twitter', 'leetcode'];
        fields.forEach((key) => {
            formData.append(key, profile[key]);
        });

        if (profile.image) {
            formData.append('image', profile.image);
        }

        setLoading(true);
        await updateProfile(formData);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className='min-h-screen w-full max-w-4xl mx-auto px-4 py-6 mb-12'>
            <h2 className='text-xl text-gray-900 font-semibold'>Basic Information</h2>

            <div className='mt-8 flex flex-col items-center'>
                <img src={imagePreview} alt="user" className='w-32 h-32 rounded-full object-cover mb-4' />
                <label htmlFor="imageUpload" className="cursor-pointer flex items-center gap-2 text-sm border p-1 rounded-lg bg-green-100">
                    <UploadCloud className="w-5 h-5" /> Upload Image
                </label>
                <input id="imageUpload" type="file" name="image" onChange={handleChange} className="hidden" />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
                <Input label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} required />
                <Input label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} />
                <Input label="Phone Number" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} />
                <Input label="Address" name="address" value={profile.address} onChange={handleChange} />
                <Input label="Date of Birth" name="dob" type="date" value={profile.dob} onChange={handleChange} />
                <Input label="Experience" name="experience" type="number" value={profile.experience} onChange={handleChange} />
                <Input label="Role" name="role" value={profile.role} onChange={handleChange} />
            </div>

            <h2 className='text-xl text-gray-900 font-semibold mt-12'>Social Media Links</h2>
            <p className='text-sm text-gray-600 mt-2'>Add your social profiles to help others connect with you</p>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                <Input label={<><GithubIcon size={16} className='inline' /> Github</>} name="github" value={profile.github} onChange={handleChange} />
                <Input label={<><LucideLinkedin size={16} className='inline' /> LinkedIn</>} name="linkedIn" value={profile.linkedIn} onChange={handleChange} />
                <Input label={<><Twitter size={16} className='inline' /> Twitter</>} name="twitter" value={profile.twitter} onChange={handleChange} />
                <Input label={<><CodeXml size={16} className='inline' /> Leetcode</>} name="leetcode" value={profile.leetcode} onChange={handleChange} />
            </div>

            <h2 className='text-xl text-gray-900 font-semibold mt-12'>Resume</h2>
            <div className="border-2 border-dashed border-green-400 bg-green-50 rounded-lg p-6 mt-4 text-center">
                <UploadCloud className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p className="font-medium text-gray-800">Upload your resume</p>
                <p className="text-sm text-gray-600 mb-4">Drag and drop your PDF google drive link, or click to browse</p>
                <Input name="resume" value={profile.resume} onChange={handleChange} placeholder="Google Drive Link" inputClassName="w-[80%] mx-auto" />
                <p className="mt-2 text-xs text-gray-500">Make sure to give access to everyone</p>
            </div>

            <div className="flex justify-end">
                <div className="w-fit">
                    <Button
                        type="submit"
                        loading={loading}
                        loaderText="Updating Profile..."
                        icon={<Save className="" size={18} />}
                        className="mt-8 px-4"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </form>
    );
}
