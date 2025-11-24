import { APP_CONFIG } from '@/constants/config';

const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-600 rounded-2xl mb-3">
                        <span className="text-white font-bold text-xl">
                            {APP_CONFIG.APP_SHORT_NAME}
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {APP_CONFIG.APP_NAME}
                    </h1>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Secure result management
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    {children}
                </div>

                <p className="text-center text-xs text-gray-600 dark:text-gray-400 mt-4">
                    © {new Date().getFullYear()} {APP_CONFIG.APP_NAME}
                </p>
            </div>
        </div>
    );
};

export default AuthLayout;