import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/utils/helpers';

const StatCard = ({
    title,
    value,
    icon: Icon,
    trend,
    trendValue,
    color = 'primary',
}) => {
    const colors = {
        primary: 'bg-primary-100 dark:bg-primary-900/20 text-primary-600',
        success: 'bg-success-100 dark:bg-success-900/20 text-success-600',
        warning: 'bg-warning-100 dark:bg-warning-900/20 text-warning-600',
        danger: 'bg-danger-100 dark:bg-danger-900/20 text-danger-600',
    };

    return (
        <Card hover className="h-full">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {title}
                    </p>

                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {value}
                    </p>

                    {trend && (
                        <div className="flex items-center gap-1">
                            {trend === 'up' ? (
                                <TrendingUp size={16} className="text-success-600" />
                            ) : (
                                <TrendingDown size={16} className="text-danger-600" />
                            )}
                            <span
                                className={cn(
                                    'text-sm font-medium',
                                    trend === 'up' ? 'text-success-600' : 'text-danger-600'
                                )}
                            >
                                {trendValue}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">vs last month</span>
                        </div>
                    )}
                </div>

                {Icon && (
                    <div className={cn('p-3 rounded-lg', colors[color])}>
                        <Icon size={24} />
                    </div>
                )}
            </div>
        </Card>
    );
};

export default StatCard;