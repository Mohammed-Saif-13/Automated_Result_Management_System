import { TrendingUp, Award } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getGrade } from '@/utils/formatters';

const PerformanceCard = ({ subject, marks, totalMarks, rank }) => {
    const percentage = ((marks / totalMarks) * 100).toFixed(2);
    const grade = getGrade(percentage);

    return (
        <Card hover>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    {subject}
                </h3>

                <Badge
                    variant={grade.label === 'F' ? 'danger' : 'success'}
                    style={{ backgroundColor: grade.color + '20', color: grade.color }}
                >
                    {grade.label}
                </Badge>
            </div>

            <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                        {percentage}%
                    </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className="h-2 rounded-full transition-all"
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: grade.color,
                        }}
                    ></div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <TrendingUp size={16} />
                    <span>
                        {marks}/{totalMarks} Marks
                    </span>
                </div>

                {rank && (
                    <div className="flex items-center gap-1 text-primary-600">
                        <Award size={16} />
                        <span className="font-medium">Rank #{rank}</span>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default PerformanceCard;