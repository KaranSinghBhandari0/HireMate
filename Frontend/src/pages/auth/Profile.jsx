import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CodeXml, Download, GithubIcon, Link2Icon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import ReadOnlyField from '../../components/common/ReadOnlyField';
import { formatToDDMMYY } from '../../utils/formatDate';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const {firstName, lastName, email, phoneNumber, address, dob, role, experience} = user;

    return (
        <div className='min-h-screen w-full max-w-7xl mx-auto px-4 py-6 mb-12'>
            <div className='flex justify-center gap-8 flex-wrap'>
                <div className='w-72 bg-white shadow-md rounded-xl p-6 flex flex-col items-center'>
                    <img
                        src={user.image || "/no-user.png"}
                        alt="user"
                        className='w-32 h-32 rounded-full object-cover mb-4'
                    />
                    <h1 className='text-xl text-gray-800 font-semibold'>{firstName} {lastName}</h1>
                    <p className='text-gray-500 text-sm'>{role}</p>

                    <div className='w-full space-y-4 mt-6'>
                        <div className='flex justify-between'>
                            <p className='flex text-sm items-center gap-2'><GithubIcon size={16} /> Github</p>
                            <a href={user.socials.github}> <Link2Icon size={16} className='text-blue-500' /> </a>
                        </div>
                        <div className='flex justify-between'>
                            <p className='flex text-sm items-center gap-2'><LinkedinIcon size={16} /> LinkedIn</p>
                            <a href={user.socials.linkedIn}> <Link2Icon size={16} className='text-blue-500' /> </a>
                        </div>
                        <div className='flex justify-between'>
                            <p className='flex text-sm items-center gap-2'><TwitterIcon size={16} /> Twitter</p>
                            <a href={user.socials.twitter}> <Link2Icon size={16} className='text-blue-500' /> </a>
                        </div>
                        <div className='flex justify-between'>
                            <p className='flex text-sm items-center gap-2'><CodeXml size={16} /> Leetcode</p>
                            <a href={user.socials.leetcode}> <Link2Icon size={16} className='text-blue-500' /> </a>
                        </div>
                    </div>

                </div>

                <div className='flex-1 max-w-2xl bg-white shadow-md rounded-xl p-6'>

                    <div className='flex items-start justify-between mb-6'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-4'>Profile Information</h2>
                        <Link to='/profile/edit' className='border text-green-700 border-green-400 bg-green-200 rounded-lg px-2 py-1' > Edit </Link>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <ReadOnlyField label="First Name" value={firstName} />
                        <ReadOnlyField label="Last Name" value={lastName || "-"} />
                        <ReadOnlyField label="Email" value={email} />
                        <ReadOnlyField label="Phone Number" value={phoneNumber || "-"} />
                        <ReadOnlyField label="Address" value={address || "-"} />
                        <ReadOnlyField label="Date of Birth" value={dob ? formatToDDMMYY(new Date(dob)) : "-"} />
                        <ReadOnlyField label="Role" value={role || "-"} />
                        <ReadOnlyField label="Experience" value={ experience || "-"} />
                    </div>
                </div>
            </div>

            <div className='mt-12 max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6'>
                <h2 className='text-xl font-semibold text-gray-800 mb-4'>📄 Resume</h2>

                <div className='border border-gray-300 rounded-md p-4 bg-gray-50 flex justify-between gap-3'>
                    📄 Resume
                    <a href={user.resume} className='text-sm text-gray-600 flex items-center gap-2 border bg-green-100 border-green-600 rounded-md px-2 py-1'>
                        <Download className='inline-block mr-1 w-4 h-4' />
                        Download
                    </a>
                </div>
            </div>
        </div>
    );
}
