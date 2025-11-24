import { Menu, Bell, User, LogOut, Settings, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/stores/useUIStore';
import { APP_CONFIG } from '@/constants/config';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/helpers';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { toggleSidebar, theme, toggleTheme } = useUIStore();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        logout();
        navigate(ROUTES.LOGIN);
    };

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    {APP_CONFIG.APP_SHORT_NAME}
                                </span>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                                {APP_CONFIG.APP_NAME}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <button className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                    <User size={18} className="text-primary-600" />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                        {user?.role || 'Guest'}
                                    </p>
                                </div>
                            </button>

                            {showDropdown && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowDropdown(false)}
                                    ></div>

                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-20">
                                        <button
                                            onClick={() => {
                                                navigate(ROUTES.ADMIN.SETTINGS);
                                                setShowDropdown(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                                        >
                                            <Settings size={16} />
                                            Settings
                                        </button>

                                        <hr className="my-2 border-gray-200 dark:border-gray-700" />

                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 flex items-center gap-2"
                                        >
                                            <LogOut size={16} />
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;