import { useState } from 'react';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import FileUpload from '@/components/common/FileUpload';
import { excelService } from '@/services/excelService';
import { useToast } from '@/hooks/useToast';
import { APP_CONFIG } from '@/constants/config';

const UploadExcelForm = ({ onUploadSuccess }) => {
    const toast = useToast();
    const [selectedFile, setSelectedFile] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [validationErrors, setValidationErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const handleFileSelect = async (file) => {
        setSelectedFile(file);
        setLoading(true);

        try {
            const data = await excelService.parseFile(file);
            setParsedData(data);

            const validation = excelService.validateResultData(data);
            setValidationErrors(validation.errors);

            if (validation.isValid) {
                toast.success('File parsed successfully!');
                setStep(2);
            } else {
                toast.warning(`Found ${validation.errors.length} validation errors`);
                setStep(2);
            }
        } catch (error) {
            toast.error('Failed to parse file. Please check the format.');
            setSelectedFile(null);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = () => {
        setSelectedFile(null);
        setParsedData(null);
        setValidationErrors([]);
        setStep(1);
    };

    const handleUpload = async () => {
        setLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success('Results uploaded successfully!');
            onUploadSuccess?.();
            handleRemove();
        } catch (error) {
            toast.error('Upload failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        Upload Results
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Upload Excel file with student results
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            1
                        </div>
                        <span className="hidden sm:inline text-sm font-medium">Select</span>
                    </div>

                    <div className="w-8 sm:w-12 h-0.5 bg-gray-300"></div>

                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            2
                        </div>
                        <span className="hidden sm:inline text-sm font-medium">Preview</span>
                    </div>

                    <div className="w-8 sm:w-12 h-0.5 bg-gray-300"></div>

                    <div className={`flex items-center gap-2 ${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                            3
                        </div>
                        <span className="hidden sm:inline text-sm font-medium">Upload</span>
                    </div>
                </div>
            </div>

            {step === 1 && (
                <Card>
                    <Card.Header>
                        <Card.Title>Select Excel File</Card.Title>
                    </Card.Header>

                    <Card.Content>
                        <FileUpload
                            accept={{
                                'application/vnd.ms-excel': ['.xls'],
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                                'text/csv': ['.csv'],
                            }}
                            maxSize={APP_CONFIG.FILE_UPLOAD.MAX_SIZE}
                            onFileSelect={handleFileSelect}
                            selectedFile={selectedFile}
                            onRemove={handleRemove}
                        />

                        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                            <h4 className="text-sm font-semibold text-primary-900 dark:text-primary-300 mb-2">
                                File Requirements:
                            </h4>
                            <ul className="text-sm text-primary-800 dark:text-primary-400 space-y-1">
                                <li>• Excel file (.xls, .xlsx) or CSV</li>
                                <li>• Maximum size: 5MB</li>
                                <li>• Required columns: rollNumber, studentName, subject, marks, totalMarks</li>
                                <li>• All fields must be filled</li>
                            </ul>
                        </div>
                    </Card.Content>
                </Card>
            )}

            {step === 2 && parsedData && (
                <div className="space-y-4">
                    <Card>
                        <Card.Header>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <Card.Title>Preview Data</Card.Title>

                                <div className="flex items-center gap-2">
                                    {validationErrors.length === 0 ? (
                                        <Badge variant="success" className="flex items-center gap-1">
                                            <CheckCircle size={14} />
                                            Valid
                                        </Badge>
                                    ) : (
                                        <Badge variant="danger" className="flex items-center gap-1">
                                            <AlertCircle size={14} />
                                            {validationErrors.length} Errors
                                        </Badge>
                                    )}

                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {parsedData.length} Records
                                    </span>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Content>
                            <div className="overflow-x-auto -mx-4 sm:mx-0">
                                <div className="inline-block min-w-full align-middle">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-900">
                                            <tr>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                    Roll No
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                    Name
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                    Subject
                                                </th>
                                                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                                                    Marks
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                            {parsedData.slice(0, 5).map((row, index) => (
                                                <tr key={index}>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {row.rollNumber || '-'}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {row.studentName || '-'}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {row.subject || '-'}
                                                    </td>
                                                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {row.marks || '-'}/{row.totalMarks || '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {parsedData.length > 5 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                                    Showing 5 of {parsedData.length} records
                                </p>
                            )}
                        </Card.Content>
                    </Card>

                    {validationErrors.length > 0 && (
                        <Card>
                            <Card.Header>
                                <Card.Title className="text-danger-600">Validation Errors</Card.Title>
                            </Card.Header>

                            <Card.Content>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {validationErrors.slice(0, 10).map((error, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-2 p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg"
                                        >
                                            <AlertCircle size={16} className="text-danger-600 mt-0.5 flex-shrink-0" />
                                            <div className="text-sm">
                                                <span className="font-medium text-danger-900 dark:text-danger-300">
                                                    Row {error.row}:
                                                </span>
                                                <span className="text-danger-700 dark:text-danger-400 ml-1">
                                                    {error.message}
                                                </span>
                                            </div>
                                        </div>
                                    ))}

                                    {validationErrors.length > 10 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center pt-2">
                                            And {validationErrors.length - 10} more errors...
                                        </p>
                                    )}
                                </div>
                            </Card.Content>
                        </Card>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <Button variant="outline" onClick={handleRemove} className="w-full sm:w-auto">
                            Cancel
                        </Button>

                        <Button
                            onClick={handleUpload}
                            loading={loading}
                            disabled={validationErrors.length > 0}
                            className="w-full sm:w-auto"
                        >
                            <Upload size={18} className="mr-2" />
                            Upload Results
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadExcelForm;