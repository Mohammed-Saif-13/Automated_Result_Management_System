import { cn } from '@/utils/helpers';

const Select = ({
    label,
    error,
    options = [],
    placeholder = 'Select an option',
    className = '',
    containerClassName = '',
    ...props
}) => {
    return (
        <div className={cn('w-full', containerClassName)}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                    {props.required && <span className="text-danger-500 ml-1">*</span>}
                </label>
            )}

            <select
                className={cn(
                    'w-full px-4 py-2 border rounded-lg transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    'disabled:bg-gray-100 disabled:cursor-not-allowed',
                    error
                        ? 'border-danger-500 focus:ring-danger-500'
                        : 'border-gray-300 dark:border-gray-600',
                    'dark:bg-gray-800 dark:text-white',
                    className
                )}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <p className="mt-1 text-sm text-danger-500">{error}</p>
            )}
        </div>
    );
};

export default Select;