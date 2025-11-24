import { useState } from 'react';
import { Download, FileDown } from 'lucide-react';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import ResultTable from '@/components/tables/ResultTable';
import { useToast } from '@/hooks/useToast';
import { generateResultPDF } from '@/utils/pdfGenerator';
import { exportToExcel } from '@/utils/excelParser';

const mockResults = [
    {
        id: 1,
        examName: 'Mid Term 2024',
        subject: 'Mathematics',
        date: '2024-01-15',
        obtainedMarks: 85,
        totalMarks: 100,
        studentName: 'Student Name',
        rollNumber: 'STD001',
        class: '10',
        section: 'A',
    },
    {
        id: 2,
        examName: 'Mid Term 2024',
        subject: 'Science',
        date: '2024-01-15',
        obtainedMarks: 78,
        totalMarks: 100,
        studentName: 'Student Name',
        rollNumber: 'STD001',
        class: '10',
        section: 'A',
    },
    {
        id: 3,
        examName: 'Mid Term 2024',
        subject: 'English',
        date: '2024-01-15',
        obtainedMarks: 92,
        totalMarks: 100,
        studentName: 'Student Name',
        rollNumber: 'STD001',
        class: '10',
        section: 'A',
    },
    {
        id: 4,
        examName: 'Final Term 2023',
        subject: 'Mathematics',
        date: '2023-12-10',
        obtainedMarks: 82,
        totalMarks: 100,
        studentName: 'Student Name',
        rollNumber: 'STD001',
        class: '10',
        section: 'A',
    },
    {
        id: 5,
        examName: 'Final Term 2023',
        subject: 'Science',
        date: '2023-12-10',
        obtainedMarks: 75,
        totalMarks: 100,
        studentName: 'Student Name',
        rollNumber: 'STD001',
        class: '10',
        section: 'A',
    },
];

const MyResults = () => {
    const toast = useToast();
    const [filterExam, setFilterExam] = useState('all');
    const [filterSubject, setFilterSubject] = useState('all');

    const examOptions = [
        { value: 'all', label: 'All Exams' },
        { value: 'Mid Term 2024', label: 'Mid Term 2024' },
        { value: 'Final Term 2023', label: 'Final Term 2023' },
    ];

    const subjectOptions = [
        { value: 'all', label: 'All Subjects' },
        { value: 'Mathematics', label: 'Mathematics' },
        { value: 'Science', label: 'Science' },
        { value: 'English', label: 'English' },
    ];

    const filteredResults = mockResults.filter((result) => {
        const examMatch = filterExam === 'all' || result.examName === filterExam;
        const subjectMatch = filterSubject === 'all' || result.subject === filterSubject;
        return examMatch && subjectMatch;
    });

    const handleDownload = (result) => {
        try {
            const fileName = generateResultPDF(result);
            toast.success(`PDF downloaded: ${fileName}`);
        } catch (error) {
            toast.error('Failed to generate PDF');
            console.error(error);
        }
    };

    const handleExportExcel = () => {
        try {
            const exportData = filteredResults.map((result) => ({
                'Exam Name': result.examName,
                'Subject': result.subject,
                'Date': result.date,
                'Obtained Marks': result.obtainedMarks,
                'Total Marks': result.totalMarks,
                'Percentage': ((result.obtainedMarks / result.totalMarks) * 100).toFixed(2) + '%',
            }));

            const fileName = exportToExcel(exportData, 'My_Results.xlsx', 'Results');
            toast.success(`Excel exported: ${fileName}`);
        } catch (error) {
            toast.error('Failed to export Excel');
            console.error(error);
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        My Results
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                        View and download all your exam results
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Select
                        value={filterExam}
                        onChange={(e) => setFilterExam(e.target.value)}
                        options={examOptions}
                        className="flex-1 sm:flex-initial sm:w-56"
                    />

                    <Select
                        value={filterSubject}
                        onChange={(e) => setFilterSubject(e.target.value)}
                        options={subjectOptions}
                        className="flex-1 sm:flex-initial sm:w-56"
                    />

                    <Button
                        variant="outline"
                        onClick={handleExportExcel}
                        className="flex-1 sm:flex-initial"
                    >
                        <FileDown size={18} className="sm:mr-2" />
                        <span className="hidden sm:inline">Export Excel</span>
                    </Button>
                </div>
            </div>

            <Card>
                <Card.Content className="p-3 sm:p-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Total Results:</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                            {filteredResults.length}
                        </span>
                        {(filterExam !== 'all' || filterSubject !== 'all') && (
                            <>
                                <span>•</span>
                                <span>Filtered from {mockResults.length} total</span>
                            </>
                        )}
                    </div>
                </Card.Content>
            </Card>

            <ResultTable
                results={filteredResults}
                onDownload={handleDownload}
            />
        </div>
    );
};

export default MyResults;