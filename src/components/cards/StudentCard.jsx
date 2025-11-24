import { Mail, Phone, Edit, Trash2, Eye } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Tooltip from '@/components/ui/Tooltip';
import { getInitials } from '@/utils/helpers';

const StudentCard = ({ student, onEdit, onDelete, onView }) => {
    return (
        <Card hover className="h-full">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <span className="text-xl sm:text-2xl font-bold text-primary-600">
                            {getInitials(student.name)}
                        </span>
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {student.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Roll No: {student.rollNumber}
                            </p>
                        </div>

                        <Badge variant="primary">
                            Class {student.class} - {student.section}
                        </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Mail size={16} className="flex-shrink-0" />
                            <span className="truncate">{student.email}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Phone size={16} className="flex-shrink-0" />
                            <span>{student.phone}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Tooltip content="View Details">
                            <Button size="sm" variant="outline" onClick={() => onView?.(student)}>
                                <Eye size={16} className="sm:mr-1" />
                                <span className="hidden sm:inline">View</span>
                            </Button>
                        </Tooltip>

                        <Tooltip content="Edit Student">
                            <Button size="sm" variant="outline" onClick={() => onEdit?.(student)}>
                                <Edit size={16} className="sm:mr-1" />
                                <span className="hidden sm:inline">Edit</span>
                            </Button>
                        </Tooltip>

                        <Tooltip content="Delete Student">
                            <Button size="sm" variant="danger" onClick={() => onDelete?.(student)}>
                                <Trash2 size={16} className="sm:mr-1" />
                                <span className="hidden sm:inline">Delete</span>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StudentCard;