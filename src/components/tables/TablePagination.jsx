import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

const TablePagination = ({
    currentPage,
    totalPages,
    pageSize,
    totalItems,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 25, 50, 100],
}) => {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="hidden sm:inline">Showing</span>
                <span className="font-medium">
                    {startItem}-{endItem}
                </span>
                <span>of</span>
                <span className="font-medium">{totalItems}</span>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:inline">
                        Rows per page:
                    </span>
                    <Select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        options={pageSizeOptions.map((size) => ({
                            value: size,
                            label: size.toString(),
                        }))}
                        className="w-20"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={16} />
                    </Button>

                    <div className="hidden sm:flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <Button
                                    key={pageNum}
                                    size="sm"
                                    variant={currentPage === pageNum ? 'primary' : 'outline'}
                                    onClick={() => onPageChange(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            );
                        })}
                    </div>

                    <span className="sm:hidden text-sm text-gray-700 dark:text-gray-300 px-2">
                        {currentPage} / {totalPages}
                    </span>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;