import UploadExcelForm from '@/components/forms/UploadExcelForm';
import DownloadTemplate from '@/components/common/DownloadTemplate';
import { useToast } from '@/hooks/useToast';

const UploadResults = () => {
    const toast = useToast();

    const handleUploadSuccess = () => {
        toast.success('Results uploaded and processed successfully!');
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <DownloadTemplate type="results" />
            <UploadExcelForm onUploadSuccess={handleUploadSuccess} />
        </div>
    );
};

export default UploadResults;