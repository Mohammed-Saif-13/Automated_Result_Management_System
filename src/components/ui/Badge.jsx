import { cn } from '@/utils/helpers';

const Badge = ({
    children,
    variant = 'default',
    size = 'md',
    className = '',
}) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-full';

    const variants = {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
        success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300',
        danger: 'bg-danger-100 text-danger-800 dark:bg-danger-900 dark:text-danger-300',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };

    return (
        <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
            {children}
        </span>
    );
};

export default Badge;