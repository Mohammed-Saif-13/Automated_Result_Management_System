import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import Loader from './Loader';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, getRole, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(getRole())) {
        return <Navigate to={ROUTES.HOME} replace />;
    }

    return children;
};

export default ProtectedRoute;