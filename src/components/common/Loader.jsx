import { cn } from '@/utils/helpers';

const Loader = ({ size = 'md', fullScreen = false, text = '' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
    };

    const content = (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={cn(
                    'animate-spin rounded-full border-4 border-gray-200 border-t-primary-600',
                    sizes[size]
                )}
            ></div>
            {text && <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
                {content}
            </div>
        );
    }

    return content;
};

export default Loader;