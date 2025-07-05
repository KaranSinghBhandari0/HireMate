import React, { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { AuthContext } from '../../context/AuthContext';
import OtpModal from '../../components/common/OtpModal';

export default function ResetPasswordPage() {
    const { signup, resetPassword, otpVerified, setOtpVerified } = useContext(AuthContext);

    useEffect(() => {
        setOtpVerified(false);
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        await signup({email})
        setLoading(false);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        await resetPassword({ email, newPassword: password });
        setLoading(false);
        setPassword('');
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-green-100 to-white px-4 py-16">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-8">
                <h1 className="text-xl md:text-3xl font-bold text-center text-gray-800">
                    🔐 Reset Your Password
                </h1>

                {/* Step 1: Enter Email */}
                {!otpVerified && (
                    <form onSubmit={handleRequestOtp} className="space-y-4">
                        <div>
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                icon={<Mail className="w-4 h-4 text-gray-400" />}
                            />
                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                            loaderText="Sending OTP..."
                            className="w-full"
                        >
                            Send OTP
                        </Button>
                    </form>
                )}

                {/* Step 2: New Password (after OTP verified) */}
                {otpVerified && (
                    <form onSubmit={handlePasswordReset} className="space-y-4 pt-4 border-t border-gray-200">
                        <div className="relative">
                            <Input
                                label="New Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                required
                                icon={<Lock className="w-4 h-4 text-gray-400" />}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[34px] text-gray-500"
                                tabIndex={-1}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>

                        <Button
                            type="submit"
                            loading={loading}
                            loaderText="Resetting..."
                            className="w-full"
                        >
                            Reset Password
                        </Button>
                    </form>
                )}

                {/* OTP Modal */}
                <OtpModal />
            </div>
        </div>
    );
}
