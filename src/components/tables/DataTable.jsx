import { useState } from 'react';
import Card from '@/components/ui/Card';
import Loader from '@/components/common/Loader';
import EmptyState from '@/components/common/EmptyState';
import TablePagination from './TablePagination';
import { cn } from '@/utils/helpers';

const DataTable = ({
    columns,
    data,
    loading = false,
    emptyMessage = 'No data available',
    pagination = true,
    initialPageSize = 10,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <Card>
                <div className="py-12">
                    <Loader />
                </div>
            </Card>
        );
    }

    if (data.length === 0) {
        return (
            <Card>
                <EmptyState title={emptyMessage} />
            </Card>
        );
    }

    return (
        <Card padding="none">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={cn(
                                        'px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                                        column.className
                                    )}
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {currentData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={cn(
                                            'px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white',
                                            column.cellClassName
                                        )}
                                    >
                                        {column.render
                                            ? column.render(row, rowIndex)
                                            : row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    totalItems={data.length}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                />
            )}
        </Card>
    );
};

export default DataTable;