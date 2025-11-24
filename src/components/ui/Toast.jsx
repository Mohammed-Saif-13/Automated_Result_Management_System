import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/helpers';
import { useUIStore } from '@/stores/useUIStore';

const Toast = ({ id, type = 'info', message, duration = 3000 }) => {
    const removeToast = useUIStore((state) => state.removeToast);

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, removeToast]);

    const icons = {
        success: <CheckCircle size={20} />,
        error: <AlertCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        info: <Info size={20} />,
    };

    const styles = {
        success: 'bg-success-50 text-success-800 border-success-200',
        error: 'bg-danger-50 text-danger-800 border-danger-200',
        warning: 'bg-warning-50 text-warning-800 border-warning-200',
        info: 'bg-primary-50 text-primary-800 border-primary-200',
    };

    return (
        <div
            className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg',
                'animate-slide-in',
                styles[type]
            )}
        >
            <div className="flex-shrink-0">
                {icons[type]}
            </div>

            <p className="flex-1 text-sm font-medium">{message}</p>

            <button
                onClick={() => removeToast(id)}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
                <X size={18} />
            </button>
        </div>
    );
};

const ToastContainer = () => {
    const toasts = useUIStore((state) => state.toasts);

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </div>
    );
};

export { Toast, ToastContainer };