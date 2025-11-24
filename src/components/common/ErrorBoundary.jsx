import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '@/components/ui/Button';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                    <div className="text-center">
                        <div className="text-danger-500 mb-4 flex justify-center">
                            <AlertTriangle size={64} />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Something went wrong
                        </h1>

                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            We're sorry for the inconvenience. Please try refreshing the page.
                        </p>

                        <Button onClick={() => window.location.reload()}>
                            Reload Page
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;