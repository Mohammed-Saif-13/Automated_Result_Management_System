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
import { firebaseAuthService } from '@/services/firebaseAuthService';
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
    const [googleLoading, setGoogleLoading] = useState(false);

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
            const result = await firebaseAuthService.signInWithEmail(data.email, data.password);

            if (result.success) {
                if (!result.user.emailVerified && data.role !== ROLES.ADMIN) {
                    toast.warning('Please verify your email first.');
                    setLoading(false);
                    return;
                }

                const userData = {
                    id: result.user.uid,
                    name: result.user.name || 'User',
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

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);

        try {
            const result = await firebaseAuthService.signInWithGoogle();

            if (result.success) {
                const userData = {
                    id: result.user.uid,
                    name: result.user.name,
                    email: result.user.email,
                    role: selectedRole,
                    emailVerified: result.user.emailVerified,
                    photo: result.user.photo,
                };

                login(userData, result.token);
                toast.success('Login successful!');

                setTimeout(() => {
                    if (selectedRole === ROLES.ADMIN) {
                        navigate(ROUTES.ADMIN.DASHBOARD);
                    } else if (selectedRole === ROLES.STUDENT) {
                        navigate(ROUTES.STUDENT.DASHBOARD);
                    } else {
                        navigate(ROUTES.PARENT.DASHBOARD);
                    }
                }, 500);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error('Google sign-in failed.');
        } finally {
            setGoogleLoading(false);
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

            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or</span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={handleGoogleSignIn}
                loading={googleLoading}
            >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Google
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
        </form>
    );
};

export default LoginForm;