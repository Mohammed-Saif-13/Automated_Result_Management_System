import { FileQuestion } from 'lucide-react';
import Button from '@/components/ui/Button';

const EmptyState = ({
    icon: Icon = FileQuestion,
    title = 'No data found',
    description = 'There is no data to display at the moment.',
    action,
    actionLabel,
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="text-gray-400 mb-4">
                <Icon size={64} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>

            <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-md">
                {description}
            </p>

            {action && actionLabel && (
                <Button onClick={action}>{actionLabel}</Button>
            )}
        </div>
    );
};

export default EmptyState;