import { Routes, Route } from 'react-router-dom';

import Home from '../pages/misc/Home';
import Jobs from '../pages/jobs/Jobs';
import JobDetails from '../pages/jobs/JobDetails';
import Signup from '../pages/auth/Signup';
import Login from '../pages/auth/Login';
import Profile from '../pages/auth/Profile';
import ProfileEdit from '../pages/auth/ProfileEdit';
import InterviewHistory from '../pages/interview/InterviewHistory';
import Interview from '../pages/interview/Interview';
import Feedback from '../pages/interview/Feedback';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AddJob from '../pages/admin/AddJob';
import EditJob from '../pages/admin/EditJob';
import PageNotFound from '../pages/misc/PageNotFound';
import Subscription from '../pages/auth/Subscription';

export default function AllRoutes({ user }) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={user ? <Home /> : <Signup />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/profile" element={!user ? <Home /> : <Profile />} />
            <Route path="/profile/edit" element={!user ? <Home /> : <ProfileEdit />} />
            <Route path="/subscription" element={!user ? <Login /> : <Subscription />} />

            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:jobId" element={<JobDetails />} />

            <Route path="/interview-history" element={!user ? <Login /> : <InterviewHistory />} />
            <Route path="/interview/:jobId" element={!user ? <Login /> : <Interview />} />
            <Route path="/feedback/:id" element={!user ? <Login /> : <Feedback />} />

            <Route path="/admin-dashboard" element={!user ? <Login /> : <AdminDashboard />} />
            <Route path="/add-job" element={!user ? <Login /> : <AddJob />} />
            <Route path="/edit-job/:jobId" element={!user ? <Login /> : <EditJob />} />

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}
