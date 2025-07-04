import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import OtpModal from '../../components/common/OtpModal';

export default function ResetPasswordPage() {
    const { setOtpModal, submitOtp } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // 1. Request OTP when email is entered
    const handleSendOtp = () => {
        if (!email.includes('@')) {
            toast.error('Please enter a valid email');
            return;
        }

        // Simulate sending OTP
        setOtpModal(true);
    };

    // 2. Called from context when OTP is submitted
    const handleOtpSubmit = (otp) => {
        // Here you'd normally verify OTP from backend
        console.log('OTP Verified:', otp);
        setOtpVerified(true); // Show password fields
    };

    // 3. Save new password
    const handleResetPassword = () => {
        if (!password || password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        // Simulate password reset
        toast.success('Password reset successful!');
        setTimeout(() => {
            window.location.href = '/login';
        }, 2000);
    };

    // Inject custom handler into context (optional)
    // submitOtp.current = handleOtpSubmit;

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

                {!otpVerified ? (
                    <>
                        <label className="block text-gray-700 mb-2">Enter your email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                        >
                            Send OTP
                        </button>
                    </>
                ) : (
                    <>
                        <label className="block text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                        >
                            Reset Password
                        </button>
                    </>
                )}
            </div>

            <OtpModal />
        </div>
    );
}
