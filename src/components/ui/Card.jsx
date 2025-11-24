import { cn } from '@/utils/helpers';

const Card = ({
    children,
    className = '',
    padding = 'md',
    hover = false,
    onClick,
}) => {
    const paddingStyles = {
        none: '',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
    };

    return (
        <div
            className={cn(
                'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm',
                paddingStyles[padding],
                hover && 'transition-shadow duration-200 hover:shadow-md cursor-pointer',
                onClick && 'cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ children, className = '' }) => {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
};

const CardTitle = ({ children, className = '' }) => {
    return (
        <h3 className={cn('text-lg font-semibold text-gray-900 dark:text-white', className)}>
            {children}
        </h3>
    );
};

const CardContent = ({ children, className = '' }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

const CardFooter = ({ children, className = '' }) => {
    return (
        <div className={cn('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)}>
            {children}
        </div>
    );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;