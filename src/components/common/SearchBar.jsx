import { useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/helpers';
import { useDebounce } from '@/hooks/useDebounce';

const SearchBar = ({
    placeholder = 'Search...',
    onSearch,
    className = '',
    debounceDelay = 500,
}) => {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, debounceDelay);

    const handleClear = () => {
        setValue('');
        onSearch('');
    };

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    return (
        <div className={cn('relative', className)}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <Search size={20} />
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
            />

            {value && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <X size={20} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;