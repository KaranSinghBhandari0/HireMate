import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [otpModal, setOtpModal] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [tempEmail, setTempEmail] = useState('');

    // Check authentication
    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get('/auth/checkAuth');
            setUser(res.data.user);
        } catch (error) {
            console.error('Authentication check failed', error);
        } finally {
            setCheckingAuth(false);
        }
    };

    // signup
    const signup = async (formData) => {
        try {
            const res = await axiosInstance.post('/auth/send-otp', formData);
            toast.success(res.data.message);
            setOtpModal(true);
            setTempEmail(formData.email);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    // login
    const login = async (formData) => {
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            setUser(res.data.user);
            toast.success(res.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    // logout
    const logout = async () => {
        try {
            const res = await axiosInstance.get('/auth/logout');
            toast.success(res.data.message);
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        } finally {
            setUser(null);
        }
    }

    // update profile
    const updateProfile = async (formData) => {
        try {
            const res = await axiosInstance.put('/auth/update-profile', formData);
            toast.success(res.data.message);
            setUser(res.data.user);
            navigate('/profile');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    const verifyOtp = async (otp) => {
        try {
            const res = await axiosInstance.post('/auth/verify-otp', { email: tempEmail, otp });
            toast.success(res.data.message);
            setOtpModal(false);
            setOtpVerified(true);
            if(res.data.user) {
                setUser(res.data.user);
                navigate('/profile');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    const reSendOtp = async () => {
        try {
            const res = await axiosInstance.post('/auth/resend-otp', { email: tempEmail});
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    }

    const resetPassword = async ({ email, newPassword }) => {
        try {
            const res = await axiosInstance.put('/auth/reset-password', { email, newPassword });
            toast.success(res.data.message);
            setOtpVerified(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Server Error");
        }
    };

    return (
        <AuthContext.Provider value={{
            user, setUser, checkingAuth,
            signup, login, logout, checkAuth, updateProfile,
            otpModal, setOtpModal, verifyOtp, reSendOtp,
            resetPassword, otpVerified, setOtpVerified
        }}>
            {children}
        </AuthContext.Provider>
    );
};