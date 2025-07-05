import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from './Button';

export default function OtpModal() {
    const { otpModal, setOtpModal, verifyOtp, reSendOtp } = useContext(AuthContext);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [resendTimer, setResendTimer] = useState(30);
    const [resendLoading, setResendLoading] = useState(false);
    const inputRefs = useRef([]);

    // Focus first input and start countdown
    useEffect(() => {
        if (otpModal && inputRefs.current[0]) {
            inputRefs.current[0].focus();
            setResendTimer(30);
        }
    }, [otpModal]);

    useEffect(() => {
        if (resendTimer === 0) return;
        const timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleClose = () => {
        setOtpModal(false);
        setOtp(['', '', '', '']);
    };

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text/plain').trim();
        if (/^\d{4}$/.test(paste)) {
            setOtp(paste.split(''));
            inputRefs.current[3]?.focus();
        }
    };

    const handleSubmitOtp = async () => {
        const enteredOtp = otp.join('');
        await verifyOtp(enteredOtp);
        setOtp(['', '', '', '']); // clear input
    };

    const handleResendOtp = async () => {
        setResendLoading(true);
        await reSendOtp();
        setResendTimer(30); // restart timer
        setOtp(['', '', '', '']); // clear input
        inputRefs.current[0]?.focus();
        setResendLoading(false);
    };

    return (
        <>
            {otpModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
                        >
                            ✕
                        </button>

                        <h2 className="text-xl font-bold text-center mb-4">Verify OTP</h2>
                        <p className="text-gray-600 text-center mb-6">
                            Enter the 4-digit code sent to your email
                        </p>

                        <div className="flex justify-center gap-3 mb-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 border border-gray-300 rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            ))}
                        </div>

                        <Button
                            onClick={handleSubmitOtp}
                            type="button"
                            disabled={otp.join('').length !== 4}
                            className="mt-2"
                        >
                            Submit OTP
                        </Button>


                        <div className="mt-4 text-center text-sm text-gray-600">
                            {resendTimer > 0 ? (
                                <>Resend OTP in <span className="font-semibold">{resendTimer}s</span></>
                            ) : (
                                <button
                                    onClick={handleResendOtp}
                                    className="text-green-600 font-medium hover:underline disabled:opacity-50 flex items-center gap-1 mx-auto"
                                    disabled={resendLoading}
                                >
                                    {resendLoading && (
                                        <svg
                                            className="animate-spin h-4 w-4 text-green-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                                            ></path>
                                        </svg>
                                    )}
                                    Resend OTP
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
