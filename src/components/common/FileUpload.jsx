import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { formatFileSize } from '@/utils/formatters';
import Button from '@/components/ui/Button';

const FileUpload = ({
    accept = {},
    maxSize = 5 * 1024 * 1024,
    onFileSelect,
    selectedFile = null,
    onRemove,
    error,
}) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]);
        }
    }, [onFileSelect]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        multiple: false,
    });

    return (
        <div>
            {!selectedFile ? (
                <div
                    {...getRootProps()}
                    className={cn(
                        'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                        isDragActive
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400',
                        error && 'border-danger-500'
                    )}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col items-center gap-2">
                        <Upload size={48} className="text-gray-400" />

                        <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {isDragActive ? 'Drop file here' : 'Drag & drop file here'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                or click to browse
                            </p>
                        </div>

                        <p className="text-xs text-gray-400 mt-2">
                            Max size: {formatFileSize(maxSize)}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded">
                                <File size={24} className="text-primary-600" />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatFileSize(selectedFile.size)}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onRemove}
                            className="text-gray-400 hover:text-danger-500 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-danger-500">{error}</p>
            )}
        </div>
    );
};

export default FileUpload;