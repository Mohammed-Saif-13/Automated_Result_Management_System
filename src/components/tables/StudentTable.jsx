import { Edit, Trash2, Eye } from 'lucide-react';
import DataTable from './DataTable';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';

const StudentTable = ({ students, loading, onEdit, onDelete, onView }) => {
    const columns = [
        {
            header: 'Roll No',
            accessor: 'rollNumber',
            render: (row) => (
                <span className="font-medium">{row.rollNumber}</span>
            ),
        },
        {
            header: 'Name',
            accessor: 'name',
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900 dark:text-white">{row.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{row.email}</p>
                </div>
            ),
        },
        {
            header: 'Class',
            accessor: 'class',
            render: (row) => (
                <Badge variant="primary">
                    {row.class}-{row.section}
                </Badge>
            ),
        },
        {
            header: 'Phone',
            accessor: 'phone',
            className: 'hidden md:table-cell',
            cellClassName: 'hidden md:table-cell',
        },
        {
            header: 'Actions',
            accessor: 'actions',
            render: (row) => (
                <div className="flex items-center gap-1 sm:gap-2">
                    <Tooltip content="View Details">
                        <Button size="sm" variant="ghost" onClick={() => onView?.(row)}>
                            <Eye size={16} />
                        </Button>
                    </Tooltip>

                    <Tooltip content="Edit Student">
                        <Button size="sm" variant="ghost" onClick={() => onEdit?.(row)}>
                            <Edit size={16} />
                        </Button>
                    </Tooltip>

                    <Tooltip content="Delete Student">
                        <Button size="sm" variant="ghost" onClick={() => onDelete?.(row)}>
                            <Trash2 size={16} className="text-danger-600" />
                        </Button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={students}
            loading={loading}
            emptyMessage="No students found"
        />
    );
};

export default StudentTable;