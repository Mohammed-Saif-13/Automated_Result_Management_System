import { useState } from 'react';
import { Calendar, Filter, Download, CheckCircle, XCircle, Upload, UserPlus, Edit } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import { formatDateTime } from '@/utils/helpers';

const mockHistory = [
    {
        id: 1,
        action: 'Result Upload',
        description: 'Uploaded Mid Term Exam 2024 results for Class 10-A',
        user: 'Admin User',
        timestamp: '2024-01-15T10:30:00',
        status: 'success',
        recordsAffected: 45,
        icon: Upload,
    },
    {
        id: 2,
        action: 'Student Added',
        description: 'Added new student Rahul Sharma (STD001) to Class 10-A',
        user: 'Admin User',
        timestamp: '2024-01-14T14:20:00',
        status: 'success',
        recordsAffected: 1,
        icon: UserPlus,
    },
    {
        id: 3,
        action: 'Result Upload',
        description: 'Uploaded Final Term Exam 2023 results for Class 9-B',
        user: 'Admin User',
        timestamp: '2023-12-10T09:15:00',
        status: 'success',
        recordsAffected: 38,
        icon: Upload,
    },
    {
        id: 4,
        action: 'Bulk Import',
        description: 'Imported 25 students from Excel file',
        user: 'Admin User',
        timestamp: '2023-12-05T11:45:00',
        status: 'success',
        recordsAffected: 25,
        icon: Upload,
    },
    {
        id: 5,
        action: 'Result Upload',
        description: 'Failed to upload - Invalid data format in row 15',
        user: 'Admin User',
        timestamp: '2023-12-03T16:30:00',
        status: 'failed',
        recordsAffected: 0,
        icon: Upload,
    },
    {
        id: 6,
        action: 'Student Updated',
        description: 'Updated contact information for Priya Patel (STD002)',
        user: 'Admin User',
        timestamp: '2023-12-01T10:15:00',
        status: 'success',
        recordsAffected: 1,
        icon: Edit,
    },
    {
        id: 7,
        action: 'Result Upload',
        description: 'Uploaded Quarterly Exam results for Class 8-A',
        user: 'Admin User',
        timestamp: '2023-11-28T13:45:00',
        status: 'success',
        recordsAffected: 32,
        icon: Upload,
    },
    {
        id: 8,
        action: 'Student Added',
        description: 'Added new student Kavya Iyer (STD008) to Class 9-A',
        user: 'Admin User',
        timestamp: '2023-11-25T09:30:00',
        status: 'success',
        recordsAffected: 1,
        icon: UserPlus,
    },
];

const History = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterAction, setFilterAction] = useState('all');

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'success', label: 'Success' },
        { value: 'failed', label: 'Failed' },
    ];

    const actionOptions = [
        { value: 'all', label: 'All Actions' },
        { value: 'Result Upload', label: 'Result Upload' },
        { value: 'Student Added', label: 'Student Added' },
        { value: 'Student Updated', label: 'Student Updated' },
        { value: 'Bulk Import', label: 'Bulk Import' },
    ];

    const filteredHistory = mockHistory.filter((item) => {
        const statusMatch = filterStatus === 'all' || item.status === filterStatus;
        const actionMatch = filterAction === 'all' || item.action === filterAction;
        return statusMatch && actionMatch;
    });

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Activity History
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                        Complete log of all activities and changes
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        options={statusOptions}
                        className="flex-1 sm:flex-initial sm:w-48"
                    />

                    <Select
                        value={filterAction}
                        onChange={(e) => setFilterAction(e.target.value)}
                        options={actionOptions}
                        className="flex-1 sm:flex-initial sm:w-56"
                    />

                    <Button variant="outline" className="flex-1 sm:flex-initial">
                        <Download size={18} className="sm:mr-2" />
                        <span className="hidden sm:inline">Export Log</span>
                    </Button>
                </div>
            </div>

            <Card>
                <Card.Content className="p-3 sm:p-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Total Activities:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                            {filteredHistory.length}
                        </span>
                        {(filterStatus !== 'all' || filterAction !== 'all') && (
                            <>
                                <span>•</span>
                                <span>Filtered from {mockHistory.length} total</span>
                            </>
                        )}
                    </div>
                </Card.Content>
            </Card>

            <div className="space-y-3 sm:space-y-4">
                {filteredHistory.map((activity) => {
                    const Icon = activity.icon;
                    return (
                        <Card key={activity.id} hover>
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div
                                    className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${activity.status === 'success'
                                            ? 'bg-success-100 dark:bg-success-900/20'
                                            : 'bg-danger-100 dark:bg-danger-900/20'
                                        }`}
                                >
                                    <Icon
                                        size={20}
                                        className={
                                            activity.status === 'success' ? 'text-success-600' : 'text-danger-600'
                                        }
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                                                    {activity.action}
                                                </h3>
                                                <Badge variant={activity.status === 'success' ? 'success' : 'danger'}>
                                                    {activity.status}
                                                </Badge>
                                            </div>

                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {activity.description}
                                            </p>
                                        </div>

                                        <Badge variant="default" className="whitespace-nowrap">
                                            {activity.recordsAffected} records
                                        </Badge>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500 dark:text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{formatDateTime(activity.timestamp)}</span>
                                        </div>
                                        <span className="hidden sm:inline">•</span>
                                        <span>by {activity.user}</span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {filteredHistory.length === 0 && (
                <Card>
                    <div className="text-center py-8 sm:py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                            No activities found. Try adjusting your filters.
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default History;