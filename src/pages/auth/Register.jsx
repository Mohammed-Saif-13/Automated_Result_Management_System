import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import StudentRegistrationForm from '@/components/forms/StudentRegistrationForm';
import ParentRegistrationForm from '@/components/forms/ParentRegistrationForm';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';

const Register = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || ROLES.STUDENT;

    const titles = {
        [ROLES.STUDENT]: 'Student Registration',
        [ROLES.PARENT]: 'Parent Registration',
    };

    const descriptions = {
        [ROLES.STUDENT]: 'Create your account to access your results',
        [ROLES.PARENT]: 'Register to track your child\'s progress',
    };

    return (
        <div className="space-y-4">
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {titles[role]}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {descriptions[role]}
                </p>
            </div>

            {role === ROLES.STUDENT && <StudentRegistrationForm />}
            {role === ROLES.PARENT && <ParentRegistrationForm />}

            <div className="pt-2">
                <Link to={ROUTES.LOGIN}>
                    <Button variant="ghost" fullWidth>
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Login
                    </Button>
                </Link>
            </div>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign in here
                </Link>
            </p>
        </div>
    );
};

export default Register;