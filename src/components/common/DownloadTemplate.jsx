import { FileDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { downloadTemplate } from '@/utils/excelParser';
import { useToast } from '@/hooks/useToast';

const DownloadTemplate = ({ type = 'students' }) => {
    const toast = useToast();

    const templates = {
        students: {
            title: 'Student Upload Template',
            description: 'Download Excel template for bulk student upload',
            columns: ['rollNumber', 'name', 'email', 'phone', 'class', 'section'],
        },
        results: {
            title: 'Result Upload Template',
            description: 'Download Excel template for result upload',
            columns: ['rollNumber', 'studentName', 'subject', 'marks', 'totalMarks', 'examName', 'examDate'],
        },
    };

    const template = templates[type];

    const handleDownload = () => {
        try {
            const fileName = downloadTemplate(type);
            toast.success(`Template downloaded: ${fileName}`);
        } catch (error) {
            toast.error('Failed to download template');
            console.error(error);
        }
    };

    return (
        <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {template.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {template.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {template.columns.map((col, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded"
                            >
                                {col}
                            </span>
                        ))}
                    </div>
                </div>

                <Button onClick={handleDownload} className="w-full sm:w-auto">
                    <FileDown size={18} className="mr-2" />
                    Download Template
                </Button>
            </div>
        </Card>
    );
};

export default DownloadTemplate;