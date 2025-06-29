import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, Settings, X, } from 'lucide-react';
import UserDropdown from '../ui/UserDropdown';
import { AuthContext } from '../../context/AuthContext';
import { scrollToSection } from '../../utils/ScrollToSection';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const closeMenu = () => setIsOpen(false);
    const scrollToTop = () => scrollTo(0, 0);

    const navLinks = [
        { to: '/', label: 'Home', onClick: scrollToTop },
        { to: '/jobs', label: 'Jobs' },
        { label: 'Features', scrollId: 'features' },
        { label: 'How it works', scrollId: 'how-it-works' },
        { label: 'Pricing', scrollId: 'pricing' },
        { label: 'Testimonials', scrollId: 'testimonials' }
    ];

    return (
        <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Brand */}
                <Link to="/" className="flex items-center space-x-2" onClick={scrollToTop}>
                    <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 shadow-md">
                        <GraduationCap size={20} className='animate-pulse' />
                    </div>
                    <p className="text-2xl font-bold text-green-500">HireMate</p>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex space-x-8">
                    {navLinks.map((link, idx) =>
                        link.to ? (
                            <Link
                                key={idx}
                                to={link.to}
                                className="text-gray-600 hover:text-green-500 transition-colors"
                                onClick={link.onClick || undefined}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <button
                                key={idx}
                                onClick={() => scrollToSection(link.scrollId, navigate, location)}
                                className="text-gray-600 hover:text-green-500 transition-colors"
                            >
                                {link.label}
                            </button>
                        )
                    )}
                </div>

                {/* Auth Buttons Desktop */}
                {user ? (
                    <UserDropdown />
                ) : (
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link to="/login" className="text-gray-600 font-medium text-sm py-2 px-3 rounded-md hover:bg-gray-100 transition-colors">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-green-500 text-white font-medium text-sm py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                            Sign Up Free
                        </Link>
                    </div>
                )}

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-gray-600"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white py-4 px-6 space-y-4">
                    <div className="flex flex-col space-y-6">
                        {navLinks.map((link, idx) =>
                            link.to ? (
                                <Link
                                    key={idx}
                                    to={link.to}
                                    className="text-gray-600 hover:text-green-500"
                                    onClick={() => {
                                        closeMenu();
                                        link.onClick?.();
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        closeMenu();
                                        scrollToSection(link.scrollId, navigate, location);
                                    }}
                                    className="text-left text-gray-600 hover:text-green-500"
                                >
                                    {link.label}
                                </button>
                            )
                        )}
                        <Link
                            to="/interview-history"
                            className="text-gray-600 hover:text-green-500"
                            onClick={() => {
                                closeMenu();
                                scrollToTop();
                            }}
                        >
                            Interview History
                        </Link>
                        <Link
                            to="/admin-dashboard"
                            className="text-gray-600 hover:text-green-500 flex items-center gap-1"
                            onClick={() => {
                                closeMenu();
                                scrollToTop();
                            }}
                        >
                            <Settings size={16} /> Admin
                        </Link>
                    </div>

                    {/* Mobile Auth */}
                    <div className="flex flex-col space-y-3 pt-4">
                        {user ? (
                            <>
                                <Link to="/profile" className="text-center text-gray-600 hover:text-green-500" onClick={closeMenu}>
                                    Profile
                                </Link>
                                <button className="text-red-500 bg-red-100 font-medium py-2 px-4 rounded-md" onClick={()=> { logout, closeMenu }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-center font-medium text-sm text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors" onClick={closeMenu}>
                                    Login
                                </Link>
                                <Link to="/signup" className="text-center bg-green-500 font-medium text-sm text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors" onClick={closeMenu}>
                                    Sign Up Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
