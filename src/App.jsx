import { useEffect } from 'react';
import { useUIStore } from '@/stores/useUIStore';
import { ToastContainer } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AppRouter from '@/router/AppRouter';

function App() {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('ui-storage');
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme);
      if (parsed.state?.theme) {
        setTheme(parsed.state.theme);
      }
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ErrorBoundary>
      <AppRouter />
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;