import { Download, Calendar } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import { formatDate } from '@/utils/helpers';
import { getGrade, calculatePercentage } from '@/utils/formatters';

const ResultCard = ({ result, onDownload }) => {
    const percentage = calculatePercentage(result.obtainedMarks, result.totalMarks);
    const grade = getGrade(percentage);

    return (
        <Card hover>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {result.examName}
                        </h3>
                        <Badge
                            variant={grade.label === 'F' ? 'danger' : 'success'}
                            style={{ backgroundColor: grade.color + '20', color: grade.color }}
                        >
                            Grade {grade.label}
                        </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{formatDate(result.date)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-medium">Marks:</span>
                            <span>
                                {result.obtainedMarks}/{result.totalMarks}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="font-medium">Percentage:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                {percentage}%
                            </span>
                        </div>
                    </div>
                </div>

                <Tooltip content="Download Result PDF">
                    <Button size="sm" onClick={() => onDownload?.(result)}>
                        <Download size={16} className="sm:mr-1" />
                        <span className="hidden sm:inline">Download</span>
                    </Button>
                </Tooltip>
            </div>
        </Card>
    );
};

export default ResultCard;