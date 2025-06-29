import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

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
            const res = await axiosInstance.post('/auth/signup', formData);
            setUser(res.data.user);
            toast.success(res.data.message);
            navigate('/profile');
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

    return (
        <AuthContext.Provider value={{
            user, setUser, checkingAuth,
            signup, login, logout, checkAuth, updateProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
};