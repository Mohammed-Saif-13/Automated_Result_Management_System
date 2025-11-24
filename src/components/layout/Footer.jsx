import { APP_CONFIG } from '@/constants/config';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} {APP_CONFIG.APP_NAME}. All rights reserved.
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Version {APP_CONFIG.VERSION}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;