import { UserCircle, LogOut, Settings, User, History, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function UserDropdown() {
    const { logout } = useContext(AuthContext);

    return (
        <div className="relative text-left hidden lg:inline-block group">
            {/* Trigger */}
            <button
                className="flex items-center space-x-1 text-gray-700 group"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <UserCircle size={24} />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150">
                <div className="py-1 text-sm text-gray-700">
                    <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                        <User size={16} /> Profile
                    </Link>
                    <Link
                        to="/subscription"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                        <Zap size={16} /> Subscription
                    </Link>
                    <Link
                        to="/interview-history"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                    >
                        <History size={16} /> Interview History
                    </Link>

                    {/* Admin Only */}
                    <Link
                        to="/admin-dashboard"
                        className="flex items-center gap-2 px-4 py-2 border-t hover:bg-gray-100"
                    >
                        <Settings size={16} /> Admin
                    </Link>

                    {/* Logout */}
                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
}