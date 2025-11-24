import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const DashboardLayout = ({ children }) => {
    const { theme } = useUIStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />

            <div className="flex flex-1 pt-16">
                <Sidebar />

                <main className="flex-1 lg:ml-64 flex flex-col">
                    <div className="flex-1 p-4 sm:p-6 lg:p-8">
                        {children}
                    </div>

                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;