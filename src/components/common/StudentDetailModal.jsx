import { Mail, Phone, User, BookOpen } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { getInitials } from '@/utils/helpers';

const StudentDetailModal = ({ isOpen, onClose, student }) => {
    if (!student) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Student Details"
            size="md"
        >
            <div className="space-y-4 max-h-[60vh] overflow-y-auto scrollbar-hide pr-1">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-600">
                            {getInitials(student.name)}
                        </span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                            {student.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-1 mt-1">
                            <Badge variant="primary" size="sm">
                                {student.rollNumber}
                            </Badge>
                            <Badge variant="primary" size="sm">
                                {student.class}-{student.section}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                            <Mail size={18} className="text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {student.email}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-success-100 dark:bg-success-900/20 rounded-lg flex items-center justify-center">
                            <Phone size={18} className="text-success-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {student.phone}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-warning-100 dark:bg-warning-900/20 rounded-lg flex items-center justify-center">
                                <BookOpen size={18} className="text-warning-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Class</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {student.class}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                                <User size={18} className="text-primary-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Section</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {student.section}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card className="border-primary-200 dark:border-primary-800">
                    <Card.Header>
                        <Card.Title className="text-base">Quick Stats</Card.Title>
                    </Card.Header>

                    <Card.Content>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Student ID</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    #{student.id}
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                                <Badge variant="success" size="sm">Active</Badge>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Exams</span>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    12
                                </span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Avg Score</span>
                                <Badge variant="success" size="sm">83.5%</Badge>
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Class Rank</span>
                                <Badge variant="warning" size="sm">#5</Badge>
                            </div>
                        </div>
                    </Card.Content>
                </Card>

                <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <p className="text-xs text-primary-900 dark:text-primary-300">
                        For detailed performance analysis, visit Analytics section.
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default StudentDetailModal;