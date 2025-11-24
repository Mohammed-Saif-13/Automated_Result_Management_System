import { Download } from 'lucide-react';
import DataTable from './DataTable';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import { formatDate } from '@/utils/helpers';
import { getGrade, calculatePercentage } from '@/utils/formatters';

const ResultTable = ({ results, loading, onDownload }) => {
    const columns = [
        {
            header: 'Exam Name',
            accessor: 'examName',
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{row.examName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(row.date)}
                    </p>
                </div>
            ),
        },
        {
            header: 'Subject',
            accessor: 'subject',
            className: 'hidden sm:table-cell',
            cellClassName: 'hidden sm:table-cell',
        },
        {
            header: 'Marks',
            accessor: 'marks',
            render: (row) => (
                <span className="font-medium">
                    {row.obtainedMarks}/{row.totalMarks}
                </span>
            ),
        },
        {
            header: 'Percentage',
            accessor: 'percentage',
            render: (row) => {
                const percentage = calculatePercentage(row.obtainedMarks, row.totalMarks);
                return <span className="font-semibold">{percentage}%</span>;
            },
        },
        {
            header: 'Grade',
            accessor: 'grade',
            render: (row) => {
                const percentage = calculatePercentage(row.obtainedMarks, row.totalMarks);
                const grade = getGrade(percentage);
                return (
                    <Badge
                        variant={grade.label === 'F' ? 'danger' : 'success'}
                        style={{ backgroundColor: grade.color + '20', color: grade.color }}
                    >
                        {grade.label}
                    </Badge>
                );
            },
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
                <Tooltip content="Download PDF">
                    <Button size="sm" variant="ghost" onClick={() => onDownload?.(row)}>
                        <Download size={16} />
                    </Button>
                </Tooltip>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={results}
            loading={loading}
            emptyMessage="No results found"
        />
    );
};

export default ResultTable;