import { useState } from 'react';
import { Download } from 'lucide-react';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import ResultTable from '@/components/tables/ResultTable';
import { useToast } from '@/hooks/useToast';

const mockResults = [
    {
        id: 1,
        examName: 'Mid Term 2024',
        subject: 'Mathematics',
        date: '2024-01-15',
        obtainedMarks: 85,
        totalMarks: 100,
    },
    {
        id: 2,
        examName: 'Mid Term 2024',
        subject: 'Science',
        date: '2024-01-15',
        obtainedMarks: 78,
        totalMarks: 100,
    },
    {
        id: 3,
        examName: 'Mid Term 2024',
        subject: 'English',
        date: '2024-01-15',
        obtainedMarks: 92,
        totalMarks: 100,
    },
    {
        id: 4,
        examName: 'Mid Term 2024',
        subject: 'Hindi',
        date: '2024-01-15',
        obtainedMarks: 88,
        totalMarks: 100,
    },
    {
        id: 5,
        examName: 'Mid Term 2024',
        subject: 'Social Science',
        date: '2024-01-15',
        obtainedMarks: 76,
        totalMarks: 100,
    },
    {
        id: 6,
        examName: 'Final Term 2023',
        subject: 'Mathematics',
        date: '2023-12-10',
        obtainedMarks: 82,
        totalMarks: 100,
    },
    {
        id: 7,
        examName: 'Final Term 2023',
        subject: 'Science',
        date: '2023-12-10',
        obtainedMarks: 75,
        totalMarks: 100,
    },
    {
        id: 8,
        examName: 'Final Term 2023',
        subject: 'English',
        date: '2023-12-10',
        obtainedMarks: 88,
        totalMarks: 100,
    },
];

const ChildResults = () => {
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
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Social Science', label: 'Social Science' },
    ];

    const filteredResults = mockResults.filter((result) => {
        const examMatch = filterExam === 'all' || result.examName === filterExam;
        const subjectMatch = filterSubject === 'all' || result.subject === filterSubject;
        return examMatch && subjectMatch;
    });

    const handleDownload = (result) => {
        toast.info('PDF download - Coming soon!');
    };

    const handleDownloadAll = () => {
        toast.info('Downloading all results - Coming soon!');
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Child Results
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                        View and download all exam results
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
                        onClick={handleDownloadAll}
                        className="flex-1 sm:flex-initial"
                    >
                        <Download size={18} className="sm:mr-2" />
                        <span className="hidden sm:inline">Download All</span>
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

            {filteredResults.length === 0 && (
                <Card>
                    <div className="text-center py-8 sm:py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                            No results found. Try adjusting your filters.
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default ChildResults;