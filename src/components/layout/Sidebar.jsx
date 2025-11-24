import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import {
    LayoutDashboard,
    Upload,
    Users,
    BarChart3,
    History,
    Settings,
    FileText,
    TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useUIStore } from '@/stores/useUIStore';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { cn } from '@/utils/helpers';

const Sidebar = () => {
    const { getRole } = useAuth();
    const { sidebarOpen, setSidebarOpen } = useUIStore();
    const role = getRole();

    const adminLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.ADMIN.DASHBOARD },
        { icon: Upload, label: 'Upload Results', path: ROUTES.ADMIN.UPLOAD_RESULTS },
        { icon: Users, label: 'Students', path: ROUTES.ADMIN.STUDENT_MANAGEMENT },
        { icon: BarChart3, label: 'Analytics', path: ROUTES.ADMIN.ANALYTICS },
        { icon: History, label: 'History', path: ROUTES.ADMIN.HISTORY },
        { icon: Settings, label: 'Settings', path: ROUTES.ADMIN.SETTINGS },
    ];

    const studentLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.STUDENT.DASHBOARD },
        { icon: FileText, label: 'My Results', path: ROUTES.STUDENT.MY_RESULTS },
        { icon: TrendingUp, label: 'Performance', path: ROUTES.STUDENT.PERFORMANCE },
    ];

    const parentLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.PARENT.DASHBOARD },
        { icon: FileText, label: 'Results', path: ROUTES.PARENT.CHILD_RESULTS },
        { icon: TrendingUp, label: 'Progress', path: ROUTES.PARENT.PROGRESS },
    ];

    const links =
        role === ROLES.ADMIN
            ? adminLinks
            : role === ROLES.STUDENT
                ? studentLinks
                : parentLinks;

    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity',
                    sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={() => setSidebarOpen(false)}
            ></div>

            <aside
                className={cn(
                    'fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 overflow-y-auto',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
                    'w-64'
                )}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                                    isActive
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                )
                            }
                            onClick={() => setSidebarOpen(false)}
                        >
                            <link.icon size={20} />
                            <span className="font-medium">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;