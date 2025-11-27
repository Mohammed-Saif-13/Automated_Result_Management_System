import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { authService } from '@/services/authService';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum([ROLES.ADMIN, ROLES.STUDENT, ROLES.PARENT]),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            role: ROLES.STUDENT,
        },
    });

    const selectedRole = watch('role');

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const result = await authService.signInWithEmail(data.email, data.password, data.role);

            if (result.success) {
                const userData = {
                    id: result.user.uid,
                    name: result.user.name,
                    email: result.user.email,
                    role: data.role,
                    emailVerified: result.user.emailVerified,
                };

                login(userData, result.token);
                toast.success('Login successful!');

                setTimeout(() => {
                    if (data.role === ROLES.ADMIN) {
                        navigate(ROUTES.ADMIN.DASHBOARD);
                    } else if (data.role === ROLES.STUDENT) {
                        navigate(ROUTES.STUDENT.DASHBOARD);
                    } else {
                        navigate(ROUTES.PARENT.DASHBOARD);
                    }
                }, 500);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const roleOptions = [
        { value: ROLES.ADMIN, label: 'Admin' },
        { value: ROLES.STUDENT, label: 'Student' },
        { value: ROLES.PARENT, label: 'Parent' },
    ];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select
                label="Login As"
                {...register('role')}
                options={roleOptions}
                error={errors.role?.message}
                required
            />

            <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                {...register('email')}
                error={errors.email?.message}
                required
            />

            <div className="relative">
                <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    error={errors.password?.message}
                    required
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="flex items-center justify-end">
                <Link
                    to="/forgot-password"
                    className="text-xs text-primary-600 hover:text-primary-700"
                >
                    Forgot Password?
                </Link>
            </div>

            <Button type="submit" fullWidth loading={loading}>
                Sign In
            </Button>

            {selectedRole !== ROLES.ADMIN && (
                <p className="text-center text-xs text-gray-600 dark:text-gray-400 pt-2">
                    New here?{' '}
                    <Link
                        to={`/register?role=${selectedRole}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Register
                    </Link>
                </p>
            )}

            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Test Credentials:
                </p>
                <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                    <p>Admin: admin@test.com / 123456</p>
                    <p>Student: student@test.com / 123456</p>
                    <p>Parent: parent@test.com / 123456</p>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;