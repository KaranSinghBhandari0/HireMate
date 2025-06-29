import { Twitter, Linkedin, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-12 px-6 md:px-16 text-gray-700">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Logo and Social */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 shadow-md">
                            <GraduationCap size={20} />
                        </div>
                        <span className="text-xl font-bold text-green-500">HireMate</span>
                    </div>
                    <p className="text-sm mb-4">Helping job seekers land their dream roles through AI-powered interview preparation.</p>
                    <div className="flex space-x-4">
                        <Link to="/" aria-label="Twitter" className="hover:text-green-500">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link to="/" aria-label="LinkedIn" className="hover:text-green-500">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Product */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#features" className="hover:text-green-500">Features</a></li>
                        <li><a href="#pricing" className="hover:text-green-500">Pricing</a></li>
                        <li><a href="#testimonials" className="hover:text-green-500">Testimonials</a></li>
                        <li><Link to="/" className="hover:text-green-500">Enterprise</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-green-500">Help Center</Link></li>
                        <li><Link to="/" className="hover:text-green-500">Documentation</Link></li>
                        <li><Link to="/" className="hover:text-green-500">Contact Us</Link></li>
                        <li><Link to="/" className="hover:text-green-500">Status</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-green-500">About Us</Link></li>
                        <li><Link to="/" className="hover:text-green-500">Meet the Founders</Link></li>
                        <li><Link to="/" className="hover:text-green-500">Blog</Link></li>
                        <li><Link to="/" className="hover:text-green-500">Press</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-6">
                <p>© 2025 HireMate. All rights reserved.</p>
                <div className="space-x-4 mt-4 md:mt-0">
                    <Link to="/" className="hover:text-green-500">Privacy Policy</Link>
                    <Link to="/" className="hover:text-green-500">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}