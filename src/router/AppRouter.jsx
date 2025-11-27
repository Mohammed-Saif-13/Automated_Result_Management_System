import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';

import ProtectedRoute from '@/components/common/ProtectedRoute';
import AuthLayout from '@/components/layout/AuthLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';

import AdminDashboard from '@/pages/admin/Dashboard';
import UploadResults from '@/pages/admin/UploadResults';
import StudentManagement from '@/pages/admin/StudentManagement';
import Analytics from '@/pages/admin/Analytics';
import History from '@/pages/admin/History';
import Settings from '@/pages/admin/Settings';

import StudentDashboard from '@/pages/student/Dashboard';
import MyResults from '@/pages/student/MyResults';
import Performance from '@/pages/student/Performance';

import ParentDashboard from '@/pages/parent/Dashboard';
import ChildResults from '@/pages/parent/ChildResults';
import Progress from '@/pages/parent/Progress';

const AppRouter = () => {
    const { isAuthenticated, getRole } = useAuth();

    const getDefaultRoute = () => {
        if (!isAuthenticated) return ROUTES.LOGIN;

        const role = getRole();
        if (role === ROLES.ADMIN) return ROUTES.ADMIN.DASHBOARD;
        if (role === ROLES.STUDENT) return ROUTES.STUDENT.DASHBOARD;
        if (role === ROLES.PARENT) return ROUTES.PARENT.DASHBOARD;

        return ROUTES.LOGIN;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.LOGIN} element={
                    isAuthenticated ? (
                        <Navigate to={getDefaultRoute()} replace />
                    ) : (
                        <AuthLayout>
                            <Login />
                        </AuthLayout>
                    )
                } />

                <Route path="/forgot-password" element={
                    isAuthenticated ? (
                        <Navigate to={getDefaultRoute()} replace />
                    ) : (
                        <AuthLayout>
                            <ForgotPassword />
                        </AuthLayout>
                    )
                } />

                <Route path="/register" element={
                    isAuthenticated ? (
                        <Navigate to={getDefaultRoute()} replace />
                    ) : (
                        <AuthLayout>
                            <Register />
                        </AuthLayout>
                    )
                } />


                <Route path={ROUTES.ADMIN.DASHBOARD} element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <DashboardLayout>
                            <AdminDashboard />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.ADMIN.UPLOAD_RESULTS} element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <DashboardLayout>
                            <UploadResults />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.ADMIN.STUDENT_MANAGEMENT} element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <DashboardLayout>
                            <StudentManagement />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.ADMIN.ANALYTICS} element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <DashboardLayout>
                            <Analytics />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.ADMIN.HISTORY} element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <DashboardLayout>
                            <History />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.ADMIN.SETTINGS} element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                        <DashboardLayout>
                            <Settings />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.STUDENT.DASHBOARD} element={
                    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                        <DashboardLayout>
                            <StudentDashboard />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.STUDENT.MY_RESULTS} element={
                    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                        <DashboardLayout>
                            <MyResults />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.STUDENT.PERFORMANCE} element={
                    <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                        <DashboardLayout>
                            <Performance />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.PARENT.DASHBOARD} element={
                    <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
                        <DashboardLayout>
                            <ParentDashboard />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.PARENT.CHILD_RESULTS} element={
                    <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
                        <DashboardLayout>
                            <ChildResults />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.PARENT.PROGRESS} element={
                    <ProtectedRoute allowedRoles={[ROLES.PARENT]}>
                        <DashboardLayout>
                            <Progress />
                        </DashboardLayout>
                    </ProtectedRoute>
                } />

                <Route path={ROUTES.HOME} element={<Navigate to={getDefaultRoute()} replace />} />

                <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;