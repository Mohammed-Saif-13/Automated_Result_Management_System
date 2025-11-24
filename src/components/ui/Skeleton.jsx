import { cn } from '@/utils/helpers';

const Skeleton = ({ className = '', variant = 'rectangular', width, height }) => {
    const variants = {
        rectangular: 'rounded',
        circular: 'rounded-full',
        text: 'rounded h-4',
    };

    return (
        <div
            className={cn(
                'animate-pulse bg-gray-200 dark:bg-gray-700',
                variants[variant],
                className
            )}
            style={{ width, height }}
        ></div>
    );
};

export default Skeleton;