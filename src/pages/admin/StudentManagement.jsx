import { useState } from 'react';
import { Plus, Grid, List, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import SearchBar from '@/components/common/SearchBar';
import StudentCard from '@/components/cards/StudentCard';
import StudentTable from '@/components/tables/StudentTable';
import StudentForm from '@/components/forms/StudentForm';
import StudentDetailModal from '@/components/common/StudentDetailModal';
import { useToast } from '@/hooks/useToast';
import { exportToExcel } from '@/utils/excelParser';

const initialStudents = [
    {
        id: 1,
        rollNumber: 'STD001',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@school.com',
        phone: '9876543210',
        class: '10',
        section: 'A',
    },
    {
        id: 2,
        rollNumber: 'STD002',
        name: 'Priya Patel',
        email: 'priya.patel@school.com',
        phone: '9876543211',
        class: '10',
        section: 'A',
    },
    {
        id: 3,
        rollNumber: 'STD003',
        name: 'Amit Kumar',
        email: 'amit.kumar@school.com',
        phone: '9876543212',
        class: '10',
        section: 'B',
    },
    {
        id: 4,
        rollNumber: 'STD004',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@school.com',
        phone: '9876543213',
        class: '9',
        section: 'A',
    },
    {
        id: 5,
        rollNumber: 'STD005',
        name: 'Vikram Singh',
        email: 'vikram.singh@school.com',
        phone: '9876543214',
        class: '9',
        section: 'B',
    },
];

const StudentManagement = () => {
    const toast = useToast();
    const [students, setStudents] = useState(initialStudents);
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const filteredStudents = students.filter((student) => {
        const query = searchQuery.toLowerCase();
        return (
            student.name.toLowerCase().includes(query) ||
            student.rollNumber.toLowerCase().includes(query) ||
            student.email.toLowerCase().includes(query)
        );
    });

    const handleAdd = (data) => {
        const newStudent = {
            id: students.length + 1,
            ...data,
        };
        setStudents([...students, newStudent]);
        setShowAddModal(false);
        toast.success('Student added successfully!');
    };

    const handleView = (student) => {
        setSelectedStudent(student);
        setShowViewModal(true);
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setShowEditModal(true);
    };

    const handleUpdate = (data) => {
        setStudents(
            students.map((s) => (s.id === selectedStudent.id ? { ...s, ...data } : s))
        );
        setShowEditModal(false);
        setSelectedStudent(null);
        toast.success('Student updated successfully!');
    };

    const handleDeleteClick = (student) => {
        setSelectedStudent(student);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        setStudents(students.filter((s) => s.id !== selectedStudent.id));
        setShowDeleteModal(false);
        setSelectedStudent(null);
        toast.success('Student deleted successfully!');
    };

    const handleExport = () => {
        try {
            const exportData = students.map((s) => ({
                'Roll Number': s.rollNumber,
                'Name': s.name,
                'Email': s.email,
                'Phone': s.phone,
                'Class': s.class,
                'Section': s.section,
            }));

            const fileName = exportToExcel(exportData, 'Students_Export.xlsx', 'Students');
            toast.success(`Students exported: ${fileName}`);
        } catch (error) {
            toast.error('Failed to export students');
            console.error(error);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Student Management
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                        Manage all students and their information
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                        <SearchBar
                            placeholder="Search by name, roll number, or email..."
                            onSearch={setSearchQuery}
                        />
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                        <div className="hidden sm:flex gap-2 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded transition-colors ${viewMode === 'grid'
                                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded transition-colors ${viewMode === 'list'
                                        ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <List size={18} />
                            </button>
                        </div>

                        <Button
                            variant="outline"
                            onClick={handleExport}
                            className="flex-1 sm:flex-initial"
                        >
                            <Download size={18} className="sm:mr-2" />
                            <span className="hidden sm:inline">Export</span>
                        </Button>

                        <Button
                            onClick={() => setShowAddModal(true)}
                            className="flex-1 sm:flex-initial"
                        >
                            <Plus size={18} className="sm:mr-2" />
                            <span className="hidden sm:inline">Add</span>
                        </Button>
                    </div>
                </div>
            </div>

            <Card>
                <Card.Content className="p-3 sm:p-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Total Students:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                            {filteredStudents.length}
                        </span>
                        {searchQuery && (
                            <>
                                <span>•</span>
                                <span>Filtered from {students.length} total</span>
                            </>
                        )}
                    </div>
                </Card.Content>
            </Card>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {filteredStudents.map((student) => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                        />
                    ))}
                </div>
            ) : (
                <StudentTable
                    students={filteredStudents}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                />
            )}

            {filteredStudents.length === 0 && (
                <Card>
                    <div className="text-center py-8 sm:py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                            No students found. Try adjusting your search.
                        </p>
                    </div>
                </Card>
            )}

            <StudentDetailModal
                isOpen={showViewModal}
                onClose={() => {
                    setShowViewModal(false);
                    setSelectedStudent(null);
                }}
                student={selectedStudent}
            />

            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Add New Student"
                size="lg"
            >
                <StudentForm
                    onSubmit={handleAdd}
                    onCancel={() => setShowAddModal(false)}
                />
            </Modal>

            <Modal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedStudent(null);
                }}
                title="Edit Student"
                size="lg"
            >
                {selectedStudent && (
                    <StudentForm
                        initialData={selectedStudent}
                        onSubmit={handleUpdate}
                        onCancel={() => {
                            setShowEditModal(false);
                            setSelectedStudent(null);
                        }}
                    />
                )}
            </Modal>

            <Modal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setSelectedStudent(null);
                }}
                title="Delete Student"
                size="sm"
            >
                <div className="space-y-4">
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {selectedStudent?.name}
                        </span>
                        ? This action cannot be undone.
                    </p>

                    <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setSelectedStudent(null);
                            }}
                            fullWidth
                            className="sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            fullWidth
                            className="sm:w-auto"
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default StudentManagement;